<template>
  <div>
    <div class="gva-search-box">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline" @keyup.enter="onSubmit">
        <el-form-item label="机器编号">
          <el-input v-model.number="searchInfo.slotId" placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="组">
          <el-input v-model.number="searchInfo.group" placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="列">
          <el-input v-model.number="searchInfo.which" placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="demo">
          <el-select v-model="searchInfo.demo" placeholder="请选择" clearable>
            <el-option label="是" value="1" />
            <el-option label="否" value="2" />
          </el-select>
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
        <el-form-item>
          <el-button size="small" type="primary" icon="search" @click="onSubmit">查询</el-button>
          <el-button size="small" icon="refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <!-- <el-button size="small" type="primary" icon="download" @click="exportExcel">导出</el-button> -->
        <el-button size="small" type="primary" icon="plus" @click="openDialog">新增</el-button>
        <el-popover v-model:visible="deleteVisible" placement="top" width="160">
          <p>确定要删除吗？</p>
          <div style="text-align: right; margin-top: 8px;">
            <el-button size="small" type="primary" link @click="deleteVisible = false">取消</el-button>
            <el-button size="small" type="primary" @click="onDelete">确定</el-button>
          </div>
          <template #reference>
            <el-button icon="delete" size="small" style="margin-left: 10px;" :disabled="!multipleSelection.length" @click="deleteVisible = true">删除</el-button>
          </template>
        </el-popover>
      </div>
      <el-table
        ref="multipleTable"
        style="width: 100%"
        tooltip-effect="dark"
        :data="tableData"
        row-key="ID"
        border
        @selection-change="handleSelectionChange"
        @sort-change="sortChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column align="left" label="ID" prop="ID" sortable="custom" width="90" />
        <el-table-column sortable="custom" align="left" label="机器编号" prop="slotId" width="120" />
        <el-table-column align="left" label="普通标签权重" prop="weightData" width="110">
          <template #default="scope">
            <el-popover placement="top" width="160" trigger="hover">
              <p>{{ scope.row.weightData }}</p>
              <template #reference>
                <div type="text" size="mini">
                  {{ scope.row.weightData ? scope.row.weightData.slice(0,10) + '...' : '' }}
                </div>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column align="left" label="普通标签排布" :prop="reelData" width="110">
          <template #default="scope">
            <el-popover placement="top" width="160" trigger="hover">
              <p>{{ scope.row.reelData }}</p>
              <template #reference>
                <div type="text" size="mini">
                  {{ scope.row.reelData ? scope.row.reelData.slice(0,10) + '...' : '' }}
                </div>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column align="left" label="免费转标签权重" prop="fsWeight" width="130">
          <template #default="scope">
            <el-popover placement="top" width="160" trigger="hover">
              <p>{{ scope.row.fsWeight }}</p>
              <template #reference>
                <div type="text" size="mini">
                  {{ scope.row.fsWeight ? scope.row.fsWeight.slice(0,10) + '...' : '' }}
                </div>
              </template>
            </el-popover></template></el-table-column>
        <el-table-column align="left" label="免费转标签排布" prop="fsReelData" width="130">
          <template #default="scope">
            <el-popover placement="top" width="160" trigger="hover">
              <p>{{ scope.row.fsReelData }}</p>
              <template #reference>
                <div type="text" size="mini">
                  {{ scope.row.fsReelData ? scope.row.fsReelData.slice(0,10) + '...' : '' }}
                </div>
              </template>
            </el-popover></template></el-table-column>
        <el-table-column sortable="custom" align="left" label="组" prop="group" width="65" />
        <el-table-column sortable="custom" align="left" label="列" prop="which" width="65" />
        <el-table-column align="left" label="demo" prop="demo" width="110">
          <template #default="scope">{{ scope.row.demo == 1 ? '是':'否' }}</template>
        </el-table-column>
        <el-table-column align="left" label="创建时间" width="180">
          <template #default="scope">{{ scope.row.CreatedAt }}</template>
        </el-table-column>
        <el-table-column align="left" label="更新时间" width="180">
          <template #default="scope">{{ scope.row.UpdatedAt }}</template>
        </el-table-column>
        <el-table-column align="left" label="按钮组">
          <template #default="scope">
            <el-button type="primary" link icon="edit" size="small" class="table-button" @click="updateSlotReelDataFunc(scope.row)">变更</el-button>
            <el-button type="primary" link icon="delete" size="small" @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
        <el-form-item label="机器编号:" prop="slotId">
          <el-input v-model.number="formData.slotId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="普通标签权重:" prop="weightData">
          <el-input v-model="formData.weightData" :rows="4" type="textarea" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="普通标签排布:" prop="reelData">
          <el-input v-model="formData.reelData" :rows="4" type="textarea" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="免费转标签权重:" prop="fsWeight">
          <el-input v-model="formData.fsWeight" :rows="4" type="textarea" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="免费转标签排布:" prop="fsReelData">
          <el-input v-model="formData.fsReelData" :rows="4" type="textarea" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="组:" prop="group">
          <el-input v-model.number="formData.group" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="列:" prop="which">
          <el-input v-model.number="formData.which" :clearable="true" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="small" @click="closeDialog">取 消</el-button>
          <el-button size="small" type="primary" @click="enterDialog">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SlotReelData',
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
  createSlotReelData,
  deleteSlotReelData,
  deleteSlotReelDataByIds,
  updateSlotReelData,
  findSlotReelData,
  getSlotReelDataList
} from '@/api/slotReelData'

// 全量引入格式化工具 请按需保留
import { getDictFunc, formatDate, formatBoolean, filterDict } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'
import { getShortcuts } from '@/utils/date'
import { toSQLLine } from '@/utils/stringFun'
import { exportFile } from '@/utils/excel'

// 自动化生成的字典（可能为空）以及字段
const formData = ref({
  slotId: 0,
  weightData: '',
  reelData: '',
  fsWeight: '',
  fsReelData: '',
  group: 0,
  which: 0,
})

// 验证规则
const rule = reactive({
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
    'ID': '',
    'slotId': '机器编号',
    'weightData': '普通标签权重',
    'reelData': '普通标签排布',
    'fsWeight': '免费转标签权重',
    'fsReelData': '免费转标签排布',
    'group': '组',
    'which': '列',
  }
  const table = await getSlotReelDataList({ page: 1, pageSize: 100000, ...searchInfo.value })
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
  const table = await getSlotReelDataList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
    deleteSlotReelDataFunc(row)
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
  const res = await deleteSlotReelDataByIds({ ids })
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
const updateSlotReelDataFunc = async(row) => {
  const res = await findSlotReelData({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data.reslotReelData
    dialogFormVisible.value = true
  }
}

// 删除行
const deleteSlotReelDataFunc = async(row) => {
  const res = await deleteSlotReelData({ ID: row.ID })
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
    slotId: 0,
    weightData: '',
    reelData: '',
    fsWeight: '',
    fsReelData: '',
    group: 0,
    which: 0,
  }
}
// 弹窗确定
const enterDialog = async() => {
     elFormRef.value?.validate(async(valid) => {
       if (!valid) return
       let res
       switch (type.value) {
         case 'create':
           res = await createSlotReelData(formData.value)
           break
         case 'update':
           res = await updateSlotReelData(formData.value)
           break
         default:
           res = await createSlotReelData(formData.value)
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
