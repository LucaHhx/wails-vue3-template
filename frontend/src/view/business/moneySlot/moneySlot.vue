<template>
  <div>
    <div class="gva-search-box">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline" @keyup.enter="onSubmit">
        <el-form-item label="日期">
          <el-date-picker
            v-model="searchInfo.date"
            type="data"
            size="normal"
            value-format="YYYYMMDD"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item label="机器编号">
          <el-input v-model.number="searchInfo.slotId" placeholder="搜索条件" />
        </el-form-item>
        <br>
        <el-form-item label="Spin次数">
          <el-input v-model.number="searchInfo.startRecentSpins" placeholder="搜索条件（起）" />
        </el-form-item>
        <el-form-item label="">
          <el-input v-model.number="searchInfo.endRecentSpins" placeholder="搜索条件（止）" />
        </el-form-item>
        <br>
        <el-form-item label="平均Spin次数">
          <el-input v-model.number="searchInfo.startAvgSpins" placeholder="搜索条件（起）" />
        </el-form-item>
        <el-form-item label="">
          <el-input v-model.number="searchInfo.endAvgSpins" placeholder="搜索条件（止）" />
        </el-form-item>
        <!-- <el-form-item label="创建时间:" prop="betweenTime">
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
        </el-form-item> -->
        <el-form-item>
          <el-button size="small" type="primary" icon="search" @click="onSubmit">查询</el-button>
          <el-button size="small" icon="refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button size="small" type="primary" icon="download" @click="exportExcel">导出</el-button>
        <el-date-picker
          v-model="dateCal"
          type="date"
          placeholder="选择日期"
          format="YYYY-MM-DD"
          :shortcuts="shortcuts"
          value-format="YYYYMMDD"
          :disabled-date="disabledDate"
          style="width: 150px; margin: 0px 5px 0px 15px;"
        />
        <el-button :disabled="calculating" size="small" type="primary" @click="recalculate">重新计算</el-button>
      </div>
      <div style="height: 65vh;">
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
          <el-table-column sortable="custom" align="left" label="日期" prop="date" width="120" />
          <el-table-column sortable="custom" align="left" label="机器编号" prop="slotId" width="120" />
          <el-table-column sortable="custom" align="left" label="消耗金币" prop="coinReduce" width="120" />
          <el-table-column sortable="custom" align="left" label="产出金币" prop="coinIncrease" width="120" />
          <el-table-column sortable="custom" align="left" label="返还比" prop="rtpRatio" width="120" />
          <el-table-column sortable="custom" align="left" label="游玩人数" prop="recentPlayers" width="120" />
          <el-table-column sortable="custom" align="left" label="Spin次数" prop="recentSpins" width="120" />
          <el-table-column sortable="custom" align="left" label="平均Spin次数" prop="avgSpins" width="120" />
          <el-table-column sortable="custom" align="left" label="破产人数" prop="bkrpPeoples" width="120" />
          <el-table-column sortable="custom" align="left" label="破产次数" prop="bkrpTimes" width="120" />
          <el-table-column sortable="custom" align="left" label="破产充值次数" prop="bkrpAddTimes" width="120" />
          <el-table-column sortable="custom" align="left" label="破产充值金额" prop="bkrpAddAmount" width="120" />
          <el-table-column sortable="custom" align="left" label="充值人数" prop="topUpPeoples" width="120" />
          <el-table-column sortable="custom" align="left" label="充值次数" prop="topUpTimes" width="120" />
          <el-table-column sortable="custom" align="left" label="充值金额" prop="topUpAmount" width="120" />
          <el-table-column align="left" label="创建时间" width="180">
            <template #default="scope">{{ scope.row.CreatedAt }}</template>
          </el-table-column>
          <el-table-column align="left" label="更新时间" width="180">
            <template #default="scope">{{ scope.row.UpdatedAt }}</template>
          </el-table-column>
          <el-table-column align="left" label="按钮组">
            <template #default="scope">
              <el-button type="primary" link icon="edit" size="small" class="table-button" @click="updateMoneySlotFunc(scope.row)">查看</el-button>
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
    <el-dialog v-model="dialogFormVisible" :before-close="closeDialog" title="弹窗操作">
      <el-form ref="elFormRef" :model="formData" label-position="right" :rules="rule" label-width="120px">
        <el-form-item label="日期:" prop="date">
          <el-input v-model="formData.date" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="机器编号:" prop="slotId">
          <el-input v-model.number="formData.slotId" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="消耗金币:" prop="coinReduce">
          <el-input v-model.number="formData.coinReduce" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="产出金币:" prop="coinIncrease">
          <el-input v-model.number="formData.coinIncrease" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="返还比:" prop="rtpRatio">
          <el-input-number v-model="formData.rtpRatio" disabled style="width:100%" :precision="2" :clearable="true" />
        </el-form-item>
        <el-form-item label="游玩人数:" prop="recentPlayers">
          <el-input v-model.number="formData.recentPlayers" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="Spin次数:" prop="recentSpins">
          <el-input v-model.number="formData.recentSpins" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="平均Spin次数:" prop="avgSpins">
          <el-input v-model.number="formData.avgSpins" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="破产人数:" prop="bkrpPeoples">
          <el-input v-model.number="formData.bkrpPeoples" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="破产次数:" prop="bkrpTimes">
          <el-input v-model.number="formData.bkrpTimes" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="破产充值次数:" prop="bkrpAddTimes">
          <el-input v-model.number="formData.bkrpAddTimes" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="破产充值金额:" prop="bkrpAddAmount">
          <el-input v-model.number="formData.bkrpAddAmount" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="充值人数:" prop="topUpPeoples">
          <el-input v-model.number="formData.topUpPeoples" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="充值次数:" prop="topUpTimes">
          <el-input v-model.number="formData.topUpTimes" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="充值金额:" prop="topUpAmount">
          <el-input v-model.number="formData.topUpAmount" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="small" @click="closeDialog">返 回</el-button>
          <!-- <el-button size="small" type="primary" @click="enterDialog">确 定</el-button> -->
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MoneySlot',
  data() {
    return {
      statusTags: { 0: 'warning', 1: 'success', 2: 'info', 3: 'primary', 4: 'danger', 9: 'danger' },
      defaultStatus: { 1: '正常', 2: '关闭', 9: '异常' },
    }
  }
}
</script>

<script setup>
import {
  createMoneySlot,
  deleteMoneySlot,
  deleteMoneySlotByIds,
  updateMoneySlot,
  findMoneySlot,
  getMoneySlotList,
  goRecalculate
} from '@/api/moneySlot'

// 全量引入格式化工具 请按需保留
import { getDictFunc, formatDate, formatBoolean, filterDict } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'
import { getRecent } from '@/utils/date'
import { toSQLLine } from '@/utils/stringFun'
import { exportFile } from '@/utils/excel'

const dateCal = ref('')
const shortcuts = getRecent()
const disabledDate = (time) => {
  return time.getTime() > Date.now()
}
const calculating = ref(false)
const recalculate = async() => {
  calculating.value = true
  if (dateCal.value === '') {
    ElMessage({
      type: 'warning',
      message: '请选择日期'
    })
    calculating.value = false
    return
  }
  console.log(dateCal.value)
  const a = await goRecalculate({ date: dateCal.value })
  console.log(a)
  if (a.code === 0) {
    ElMessage({
      type: 'success',
      message: a.msg
    })
    getTableData()
  }
  calculating.value = false
}
// 自动化生成的字典（可能为空）以及字段
const formData = ref({
  date: '',
  slotId: 0,
  coinReduce: 0,
  coinIncrease: 0,
  rtpRatio: 0,
  recentPlayers: 0,
  recentSpins: 0,
  avgSpins: 0,
  bkrpPeoples: 0,
  bkrpTimes: 0,
  bkrpAddTimes: 0,
  bkrpAddAmount: 0,
  topUpPeoples: 0,
  topUpTimes: 0,
  topUpAmount: 0,
})

// 验证规则
const rule = reactive({
  date: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
  slotId: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
})

const elFormRef = ref()

// =========== 表格控制部分 ===========
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const searchInfo = ref({})

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
    'ID': '',
    'date': '日期',
    'slotId': '机器编号',
    'coinReduce': '消耗金币',
    'coinIncrease': '产出金币',
    'rtpRatio': '返还比',
    'recentPlayers': '游玩人数',
    'recentSpins': 'Spin次数',
    'avgSpins': '平均Spin次数',
    'bkrpPeoples': '破产人数',
    'bkrpTimes': '破产次数',
    'bkrpAddTimes': '破产充值次数',
    'bkrpAddAmount': '破产充值金额',
    'topUpPeoples': '充值人数',
    'topUpTimes': '充值次数',
    'topUpAmount': '充值金额',
  }
  const table = await getMoneySlotList({ page: 1, pageSize: 100000, ...searchInfo.value })
  if (table.code === 0) {
    const data = formatData(table.data.list)
    const params = {
      sheetData: data,
      headMap: map,
      fileName: '数据导出'
    }
    exportFile(params)
  } else {
    ElMessage.error(table.msg)
  }
}

// 格式化数据
const formatData = (data) => {
  data.forEach(v => {
    v.CreatedAt = formatDate(v.CreatedAt)
    v.UpdatedAt = formatDate(v.UpdatedAt)
  })
  return data
}

// 查询
const getTableData = async() => {
  const table = await getMoneySlotList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
const setOptions = async() => {
}

// 获取需要的字典 可能为空 按需保留
setOptions()

// 多选数据
const multipleSelection = ref([])
// 多选
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

// 删除行
const deleteRow = (row) => {
  ElMessageBox.confirm('确定要删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteMoneySlotFunc(row)
  })
}

// 批量删除控制标记
const deleteVisible = ref(false)

// 多选删除
const onDelete = async() => {
  const ids = []
  if (multipleSelection.value.length === 0) {
    ElMessage({
      type: 'warning',
      message: '请选择要删除的数据'
    })
    return
  }
  multipleSelection.value &&
        multipleSelection.value.map(item => {
          ids.push(item.ID)
        })
  const res = await deleteMoneySlotByIds({ ids })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '删除成功'
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
const updateMoneySlotFunc = async(row) => {
  const res = await findMoneySlot({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data.remoneySlot
    dialogFormVisible.value = true
  }
}

// 删除行
const deleteMoneySlotFunc = async(row) => {
  const res = await deleteMoneySlot({ ID: row.ID })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    if (tableData.value.length === 1 && page.value > 1) {
      page.value--
    }
    getTableData()
  }
}

// 弹窗控制标记
const dialogFormVisible = ref(false)

// 打开弹窗
const openDialog = () => {
  type.value = 'create'
  dialogFormVisible.value = true
}

// 关闭弹窗
const closeDialog = () => {
  dialogFormVisible.value = false
  formData.value = {
    date: '',
    slotId: 0,
    coinReduce: 0,
    coinIncrease: 0,
    rtpRatio: 0,
    recentPlayers: 0,
    recentSpins: 0,
    avgSpins: 0,
    bkrpPeoples: 0,
    bkrpTimes: 0,
    bkrpAddTimes: 0,
    bkrpAddAmount: 0,
    topUpPeoples: 0,
    topUpTimes: 0,
    topUpAmount: 0,
  }
}
// 弹窗确定
const enterDialog = async() => {
     elFormRef.value?.validate(async(valid) => {
       if (!valid) return
       let res
       switch (type.value) {
         case 'create':
           res = await createMoneySlot(formData.value)
           break
         case 'update':
           res = await updateMoneySlot(formData.value)
           break
         default:
           res = await createMoneySlot(formData.value)
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

<style>
</style>
