<template>
  <div>
    <div class="gva-search-box">
      <el-form
        :inline="true"
        :model="searchInfo"
        class="demo-form-inline"
        @keyup.enter="onSubmit"
      >
        <el-form-item label="日期">
          <el-date-picker
            v-model="searchInfo.dateChoice"
            value-format="YYYYMMDD"
            placeholder="搜索条件"
          />
        </el-form-item>
        <el-form-item label="创建时间:" prop="betweenTime">
          <el-date-picker
            v-model="searchInfo.betweenTime"
            type="datetimerange"
            :shortcuts="shortcuts"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            format="YYYY-MM-DD HH:mm"
            value-format="YYYYMMDDHHmmss"
          />
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="searchInfo.no" clearable placeholder="搜索条件" />
        </el-form-item>
        <br>
        <el-form-item label="ID">
          <el-input v-model.number="searchInfo.ID" clearable placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="用户id">
          <el-input v-model.number="searchInfo.userId" clearable placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="机器id">
          <el-input v-model.number="searchInfo.slotId" clearable placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="进度">
          <el-input v-model.number="searchInfo.rank" clearable placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="游戏类型">
          <el-select v-model="searchInfo.playType" :clearable="true" filterable placeholder="请选择">
            <el-option v-for="v,k in typeOpts" :key="k" :label="v" :value="parseInt(k)" />
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="奖池id">
          <el-input v-model.number="searchInfo.jackpotId" placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="交易id">
          <el-input v-model.number="searchInfo.txnId" placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="交易编号">
          <el-input v-model.number="searchInfo.txnNo" placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchInfo.status" :clearable="true" filterable placeholder="请选择">
            <el-option v-for="v,k in defaultStatus" :key="k" :label="v" :value="parseInt(k)" />
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="赢钱金额">
          <el-input
            v-model.number="searchInfo.startGain"
            placeholder="金额整数（起）"
          />
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model.number="searchInfo.endGain"
            placeholder="金额整数（止）"
          />
        </el-form-item>
        <br>
        <el-form-item>
          <el-button
            size="small"
            type="primary"
            icon="search"
            @click="onSubmit"
          >查询</el-button>
          <el-button
            size="small"
            icon="refresh"
            @click="onReset"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button
          size="small"
          type="primary"
          icon="download"
          @click="exportExcel"
        >导出</el-button>
        <!-- <el-button size="small" type="primary" icon="plus" @click="openDialog">新增</el-button> -->
        <el-popover v-model:visible="deleteVisible" placement="top" width="160">
          <p>确定要删除吗？</p>
          <div style="text-align: right; margin-top: 8px">
            <el-button
              size="small"
              type="primary"
              link
              @click="deleteVisible = false"
            >取消</el-button>
            <el-button
              size="small"
              type="primary"
              @click="onDelete"
            >确定</el-button>
          </div>
          <template #reference>
            <!-- <el-button icon="delete" size="small" style="margin-left: 10px;" :disabled="!multipleSelection.length" @click="deleteVisible = true">删除</el-button> -->
          </template>
        </el-popover>
      </div>
      <div style="height: 55vh">
        <el-table
          ref="multipleTable"
          style="width: 100%"
          tooltip-effect="dark"
          :data="tableData"
          row-key="ID"
          height="100%"
          border
          @selection-change="handleSelectionChange"
          @sort-change="sortChange"
        >
          <!-- <el-table-column type="selection" width="55" /> -->
          <el-table-column align="left" label="ID" prop="ID" sortable="custom" width="90" />
          <el-table-column align="left" label="日期" width="90" prop="date" visibility="true" sortable="custom" />
          <el-table-column align="left" label="编号" prop="no" width="120" />
          <el-table-column align="left" label="用户id" prop="userId" width="80" />
          <el-table-column align="left" label="机器id" prop="slotId" width="80" />
          <!-- <el-table-column align="left" label="游戏类型" prop="playType" width="90">
            <template #default="scope">
              <el-tag size="small" :type="typeTags[scope.row.playType]" effect="dark">
                {{ typeOpts[scope.row.playType] }}
              </el-tag>
            </template>
          </el-table-column> -->
          <!-- <el-table-column align="left" label="用户金额" prop="amount" width="120" /> -->
          <el-table-column align="left" label="押注" prop="bet" width="90" />
          <el-table-column align="left" label="加注" prop="raise" width="90" />
          <el-table-column align="left" label="奖池id" prop="jackpotId" width="90" />
          <!-- <el-table-column align="left" label="赢钱组合id" prop="payTableId" width="150" /> -->
          <el-table-column align="left" label="赢钱金额" prop="gain" width="120" />
          <el-table-column align="left" label="交易id" prop="txnId" width="100" />
          <!-- <el-table-column align="left" label="状态" prop="status" width="70">
            <template #default="scope">
              <el-tag size="small" :type="statusTags[scope.row.status]" effect="dark">
                {{ defaultStatus[scope.row.status] }}
              </el-tag>
            </template>
          </el-table-column> -->
          <el-table-column align="left" label="备注" prop="remark" width="180">
            <template #default="scope">
              <el-popover placement="top" width="160" trigger="hover">
                <p>{{ scope.row.remark }}</p>
                <template #reference>
                  <div type="text" size="mini">
                    {{ scope.row.remark.length > 15 ? scope.row.remark.slice(0,15) + '...' : scope.row.remark }}
                  </div>
                </template>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column align="left" label="创建时间" width="180">
            <template #default="scope">{{ scope.row.CreatedAt }}</template>
          </el-table-column>
          <!-- <el-table-column align="left" label="更新时间" width="180">
          <template #default="scope">{{ scope.row.UpdatedAt }}</template>
        </el-table-column> -->
          <el-table-column
            align="left"
            label="按钮组"
            fixed="right"
            width="130"
          >
            <template #default="scope">
              <el-button
                type="primary"
                link
                icon="edit"
                size="small"
                class="table-button"
                @click="updateSlotRecordFunc(scope.row)"
              >查看</el-button>
              <!-- <el-button type="primary" link icon="delete" size="small" @click="deleteRow(scope.row)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="gva-pagination">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="page"
          :page-size="pageSize"
          :page-sizes="[10, 30, 50, 100]"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
    <el-dialog
      v-model="dialogFormVisible"
      :before-close="closeDialog"
      title="弹窗操作"
    >
      <el-form
        ref="elFormRef"
        :model="formData"
        label-position="right"
        :rules="rule"
        label-width="120px"
      >
        <el-form-item label="用户id:" prop="userId">
          <el-input
            v-model.number="formData.userId"
            disabled
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <!-- <el-form-item label="用户金额:" prop="amount">
          <el-input v-model.number="formData.amount" disabled :clearable="true" placeholder="请输入" />
        </el-form-item> -->
        <el-form-item label="押注:" prop="bet">
          <el-input
            v-model.number="formData.bet"
            disabled
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="机器id:" prop="slotId">
          <el-input
            v-model.number="formData.slotId"
            disabled
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <!-- <br> -->
        <!-- <el-form-item
          v-for="(vv, kk) in formData.resultData"
          :key="kk"
          label=""
          prop=""
        >
          <el-col v-for="(v, k) in vv" :key="k" :span="3">
            <CustomPic
              style="margin-top:8px"
              :pic-src="'uploads/file/' +getTagSetting(v).name+ '.png'"
              default-src="uploads/file/low_1.png"
            />
            <el-tag
              class="ml-2"
              :type="getTagSetting(v).color"
            >{{ getTagSetting(v).name }}
            </el-tag>
          </el-col>
        </el-form-item> -->
        <el-form-item label="奖池id:" prop="jackpotId">
          <el-input
            v-model.number="formData.jackpotId"
            disabled
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="赢钱金额:" prop="gain">
          <el-input
            v-model.number="formData.gain"
            disabled
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input
            v-model="formData.remark"
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="ackStr:" prop="ackStr">
          <el-input
            v-model="formData.ackStr"
            disabled
            type="textarea"
            rows="20"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="small" @click="closeDialog">返 回</el-button>
          <el-button size="small" type="primary" @click="enterDialog">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SlotRecord',
  data() {
    return {
      statusTags: {
        0: 'warning',
        1: 'success',
        2: 'info',
        3: 'primary',
        4: 'danger',
        9: 'danger',
        10: 'success',
      },
      defaultStatus: { 2: '处理中', 9: '异常', 10: '完成' },
      typeTags: { 1: 'info', 2: 'success', 3: 'warning', 4: 'primary', 5: 'danger' },
      typeOpts: { 1: '普通', 2: '免费', 3: 'respin' }
    }
  },
}
</script>

<script setup>
import {
  createSlotRecord,
  // createSlotRecord,
  // deleteSlotRecord,
  deleteSlotRecordByIds,
  // updateSlotRecord,
  findSlotRecord,
  getSlotRecordList,
  updateSlotRecord,
} from '@/api/slotRecord'

// 全量引入格式化工具 请按需保留
import { formatDate } from '@/utils/format'
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
import { getShortcuts } from '@/utils/date'
import { toSQLLine } from '@/utils/stringFun'
import { exportFile } from '@/utils/excel'
import { getTagSetting } from '@/utils/getTag'
import CustomPic from '@/components/customPic/index.vue'

// 自动化生成的字典（可能为空）以及字段
const formData = ref({
  date: '',
  userId: 0,
  pyteType: 0,
  amount: 0,
  bet: 0,
  slotId: 0,
  resultData: '',
  jackpotId: 0,
  payTableId: 0,
  gain: 0,
})
// 验证规则
const rule = reactive({
  userId: [
    {
      required: true,
      message: '',
      trigger: ['input', 'blur'],
    },
  ],
  slotId: [
    {
      required: true,
      message: '',
      trigger: ['input', 'blur'],
    },
  ],
})

const elFormRef = ref()

// =========== 表格控制部分 ===========
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const searchInfo = ref({})

const shortcuts = getShortcuts()

// 排序
const sortChange = ({ prop, order }) => {
  if (prop) {
    searchInfo.value.sort = toSQLLine(prop)
    searchInfo.value.order = order
    getTableData()
  }
}

// 重置
const onReset = () => {
  searchInfo.value = {}
  getTableData()
}

// 搜索
const onSubmit = () => {
  page.value = 1
  pageSize.value = 10
  getTableData()
}

// 分页
const handleSizeChange = (val) => {
  pageSize.value = val
  getTableData()
}

// 修改页面容量
const handleCurrentChange = (val) => {
  page.value = val
  getTableData()
}

// 数据导出
const exportExcel = async() => {
  const map = {
    date: '日期',
    ID: '',
    userId: '用户id',
    amount: '用户金额',
    bet: '押注',
    slotId: '机器id',
    resultData: '结果数据',
    wildData: '百搭数据',
    jackpotId: '奖池id',
    payTableId: '赢钱组合id',
    gain: '赢钱金额',
  }
  const table = await getSlotRecordList({
    page: 1,
    pageSize: 100000,
    ...searchInfo.value,
  })
  if (table.code === 0) {
    const data = formatData(table.data.list)
    const params = {
      sheetData: data,
      headMap: map,
      fileName: '数据导出',
    }
    exportFile(params)
  } else {
    ElMessage.error(table.msg)
  }
}

// 格式化数据
const formatData = (data) => {
  console.log(data)
  data.forEach((v) => {
    // v.resultData = resultDataFormat(v.resultData)
    v.CreatedAt = formatDate(v.CreatedAt)
    v.UpdatedAt = formatDate(v.UpdatedAt)
  })
  return data
}

const resultDataFormat = (data) => {
  const arr = []
  data.split(';').forEach((v, i) => {
    console.log(v.split(','))
    arr.push(v.split(','))
  })
  console.log(arr)
  return arr
}

// 查询
const getTableData = async() => {
  const table = await getSlotRecordList({
    page: page.value,
    pageSize: pageSize.value,
    ...searchInfo.value,
  })
  if (table.code === 0) {
    tableData.value = formatData(table.data.list)
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

getTableData()

// ============== 表格控制部分结束 ===============

// 获取需要的字典 可能为空 按需保留
const setOptions = async() => {}

// 获取需要的字典 可能为空 按需保留
setOptions()

// 多选数据
const multipleSelection = ref([])
// 多选
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

// // 删除行
// const deleteRow = (row) => {
//   ElMessageBox.confirm('确定要删除吗?', '提示', {
//     confirmButtonText: '确定',
//     cancelButtonText: '取消',
//     type: 'warning'
//   }).then(() => {
//     deleteSlotRecordFunc(row)
//   })
// }

// 批量删除控制标记
const deleteVisible = ref(false)

// 多选删除
const onDelete = async() => {
  const ids = []
  if (multipleSelection.value.length === 0) {
    ElMessage({
      type: 'warning',
      message: '请选择要删除的数据',
    })
    return
  }
  multipleSelection.value &&
    multipleSelection.value.map((item) => {
      ids.push(item.ID)
    })
  const res = await deleteSlotRecordByIds({ ids })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    if (tableData.value.length === ids.length && page.value > 1) {
      page.value--
    }
    deleteVisible.value = false
    getTableData()
  }
}

// 行为控制标记（弹窗内部需要增还是改）
const type = ref('')

// 更新行
const updateSlotRecordFunc = async(row) => {
  const res = await findSlotRecord({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data.reRecord
    dialogFormVisible.value = true
    formData.value.resultData = resultDataFormat(formData.value.resultData)
  }
}

// 删除行
// const deleteSlotRecordFunc = async(row) => {
//   const res = await deleteSlotRecord({ ID: row.ID })
//   if (res.code === 0) {
//     ElMessage({
//       type: 'success',
//       message: '删除成功'
//     })
//     if (tableData.value.length === 1 && page.value > 1) {
//       page.value--
//     }
//     getTableData()
//   }
// }

// 弹窗控制标记
const dialogFormVisible = ref(false)

// // 打开弹窗
// const openDialog = () => {
//   type.value = 'create'
//   dialogFormVisible.value = true
// }

// 关闭弹窗
const closeDialog = () => {
  dialogFormVisible.value = false
  formData.value = {
    userId: 0,
    amount: 0,
    bet: 0,
    slotId: 0,
    resultData: '',
    wildData: '',
    jackpotId: 0,
    payTableId: 0,
    gain: 0,
  }
}
// 弹窗确定
const enterDialog = async() => {
     elFormRef.value?.validate(async(valid) => {
       if (!valid) return
       let res
       switch (type.value) {
         case 'create':
           res = await createSlotRecord(formData.value)
           break
         case 'update':
           res = await updateSlotRecord(formData.value)
           break
         default:
           res = await createSlotRecord(formData.value)
           break
       }
       if (res.code === 0) {
         ElMessage({
           type: 'success',
           message: '创建/更改成功'
         })
         closeDialog()
         getTableData()
       }
     })
}
</script>

<style></style>
