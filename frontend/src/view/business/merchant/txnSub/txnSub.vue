<template>
  <div>
    <div class="gva-search-box">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline" @keyup.enter="onSubmit">
        <el-form-item label="Merchant ID">

          <el-input v-model.number="searchInfo.merchantId" placeholder="Search criteria" />
        </el-form-item>
        <el-form-item label="PID">

          <el-input v-model.number="searchInfo.pid" placeholder="Search criteria" />
        </el-form-item>
        <el-form-item label="Type">
          <el-select v-model="searchInfo.type" :clearable="true" filterable placeholder="Please select">
            <el-option v-for="v,k in typeOpts" :key="k" :label="v" :value="parseInt(k)" />
          </el-select>
        </el-form-item>
        <el-form-item label="Bet">
          <el-input v-model.number="searchInfo.startBet" placeholder="start" />
        </el-form-item>
        <el-form-item label="">
          <el-input v-model.number="searchInfo.endBet" placeholder="end" />
        </el-form-item>
        <br>
        <el-form-item label="Raise">
          <el-input v-model.number="searchInfo.startRaise" placeholder="Search criteria（start）" />
        </el-form-item>
        <el-form-item label="">
          <el-input v-model.number="searchInfo.endRaise" placeholder="Search criteria（end）" />
        </el-form-item>
        <el-form-item label="Win">
          <el-input v-model.number="searchInfo.startWin" placeholder="Search criteria（start）" />
        </el-form-item>
        <el-form-item label="">
          <el-input v-model.number="searchInfo.endWin" placeholder="Search criteria（end）" />
        </el-form-item>
        <br>
        <el-form-item label="Creation time:" prop="betweenTime">
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
          <el-button size="small" type="primary" icon="search" @click="onSubmit">Query</el-button>
          <el-button size="small" icon="refresh" @click="onReset">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <!-- <el-button size="small" type="primary" icon="download" @click="exportExcel">Export</el-button> -->
        <el-button size="small" type="primary" icon="plus" @click="openDialog">Create</el-button>
        <el-popover v-model:visible="deleteVisible" placement="top" width="160">
          <p>Are you sure you want to delete？</p>
          <div style="text-align: right; margin-top: 8px;">
            <el-button size="small" type="primary" link @click="deleteVisible = false">Cancel</el-button>
            <el-button size="small" type="primary" @click="onDelete">Confirm</el-button>
          </div>
          <template #reference>
            <el-button icon="delete" size="small" style="margin-left: 10px;" :disabled="!multipleSelection.length" @click="deleteVisible = true">Delete</el-button>
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
        <el-table-column align="left" label="Merchant ID" prop="merchantId" width="120" />
        <el-table-column align="left" label="PID" prop="pid" width="120" />
        <el-table-column align="left" label="Type" prop="type" width="120">
          <template #default="scope">
            <el-tag size="small" :type="statusTags[scope.row.type]" effect="dark">
              {{ typeOpts[scope.row.type] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label="Bet" prop="bet" width="120" />
        <el-table-column align="left" label="Raise" prop="raise" width="120" />
        <el-table-column align="left" label="Win" prop="win" width="120" />
        <el-table-column align="left" label="Before Bal" prop="beforeBal" width="120" />
        <el-table-column align="left" label="Change Bal" prop="changeBal" width="120" />
        <el-table-column align="left" label="After Bal" prop="afterBal" width="120" />
        <el-table-column align="left" label="Creation time" width="180">
          <template #default="scope">{{ scope.row.CreatedAt }}</template>
        </el-table-column>
        <el-table-column align="left" label="Update time" width="180">
          <template #default="scope">{{ scope.row.UpdatedAt }}</template>
        </el-table-column>
        <el-table-column align="left" label="Button group">
          <template #default="scope">
            <el-button type="primary" link icon="edit" size="small" class="table-button" @click="updateTxnSubFunc(scope.row)">Change</el-button>
            <el-button type="primary" link icon="delete" size="small" @click="deleteRow(scope.row)">Delete</el-button>
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
    <el-dialog v-model="dialogFormVisible" :before-close="closeDialog" title="Pop-up operation">
      <el-form ref="elFormRef" :model="formData" label-position="right" :rules="rule" label-width="120px">
        <el-form-item label="Merchant ID:" prop="merchantId">
          <el-input v-model.number="formData.merchantId" :clearable="true" placeholder="Please enter" />
        </el-form-item>
        <el-form-item label="PID:" prop="pid">
          <el-input v-model.number="formData.pid" :clearable="true" placeholder="Please enter" />
        </el-form-item>
        <el-form-item label="Type:" prop="type">
          <el-select v-model="formData.type" placeholder="Please select" style="width:100%" :clearable="true">
            <el-option v-for="v,k in typeOpts" :key="k" :label="v" :value="parseInt(k)" />
          </el-select>
        </el-form-item>
        <el-form-item label="Bet:" prop="bet">
          <el-input-number v-model="formData.bet" style="width:100%" :precision="2" :clearable="true" />
        </el-form-item>
        <el-form-item label="Raise:" prop="raise">
          <el-input-number v-model="formData.raise" style="width:100%" :precision="2" :clearable="true" />
        </el-form-item>
        <el-form-item label="Win:" prop="win">
          <el-input-number v-model="formData.win" style="width:100%" :precision="2" :clearable="true" />
        </el-form-item>
        <el-form-item label="Before Bal:" prop="beforeBal">
          <el-input-number v-model="formData.beforeBal" style="width:100%" :precision="2" :clearable="true" />
        </el-form-item>
        <el-form-item label="Change Bal:" prop="changeBal">
          <el-input-number v-model="formData.changeBal" style="width:100%" :precision="2" :clearable="true" />
        </el-form-item>
        <el-form-item label="After Bal:" prop="afterBal">
          <el-input-number v-model="formData.afterBal" style="width:100%" :precision="2" :clearable="true" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="small" @click="closeDialog">Cancel</el-button>
          <el-button size="small" type="primary" @click="enterDialog">Confirm</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TxnSub',
  data() {
    return {
      statusTags: { 0: 'warning', 1: 'success', 2: 'info', 3: 'primary', 4: 'danger', 9: 'danger' },
      defaultStatus: { 1: 'Normal', 2: 'Close', 9: 'Abnormal' },
      typeTags: { 1: 'info', 2: 'success', 3: 'warning', 4: 'primary', 5: 'danger' },
      typeOpts: { 1: '普通', 2: '免费', 3: 'respin' }
    }
  }
}
</script>

<script setup>
import {
  createTxnSub,
  deleteTxnSub,
  deleteTxnSubByIds,
  updateTxnSub,
  findTxnSub,
  getTxnSubList
} from '@/api/txnSub'

// 全量引入格式化工具 请按需保留
import { getDictFunc, formatDate, formatBoolean, filterDict } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'
import { getShortcuts } from '@/utils/date'
import { toSQLLine } from '@/utils/stringFun'
import { exportFile } from '@/utils/excel'

// 自动化生成的字典（可能为空）以及字段
const formData = ref({
  merchantId: 0,
  pid: 0,
  type: 1,
  bet: 0,
  raise: 0,
  win: 0,
  beforeBal: 0,
  changeBal: 0,
  afterBal: 0,
})

// 验证规则
const rule = reactive({
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
    'merchantId': 'Merchant ID',
    'pid': 'PID',
    'type': 'Type',
    'bet': 'Bet',
    'raise': 'Raise',
    'win': 'Win',
    'beforeBal': 'Before Bal',
    'changeBal': 'Change Bal',
    'afterBal': 'After Bal',
  }
  const table = await getTxnSubList({ page: 1, pageSize: 100000, ...searchInfo.value })
  if (table.code === 0) {
    const data = formatData(table.data.list)
    const params = {
      sheetData: data,
      headMap: map,
      fileName: 'DataExport'
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

// Query
const getTableData = async() => {
  const table = await getTxnSubList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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

// Delete行
const deleteRow = (row) => {
  ElMessageBox.confirm('Are you sure you want to delete?', 'Prompt', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(() => {
    deleteTxnSubFunc(row)
  })
}

// 批量Delete控制标记
const deleteVisible = ref(false)

// 多选Delete
const onDelete = async() => {
  const ids = []
  if (multipleSelection.value.length === 0) {
    ElMessage({
      type: 'warning',
      message: 'Please select the data to delete'
    })
    return
  }
  multipleSelection.value &&
        multipleSelection.value.map(item => {
          ids.push(item.ID)
        })
  const res = await deleteTxnSubByIds({ ids })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: 'Delete成功'
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
const updateTxnSubFunc = async(row) => {
  const res = await findTxnSub({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data.retxnSub
    dialogFormVisible.value = true
  }
}

// Delete行
const deleteTxnSubFunc = async(row) => {
  const res = await deleteTxnSub({ ID: row.ID })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: 'Deleted successfully'
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
    merchantId: 0,
    pid: 0,
    type: 1,
    bet: 0,
    raise: 0,
    win: 0,
    beforeBal: 0,
    changeBal: 0,
    afterBal: 0,
  }
}
// 弹窗Confirm
const enterDialog = async() => {
     elFormRef.value?.validate(async(valid) => {
       if (!valid) return
       let res
       switch (type.value) {
         case 'create':
           res = await createTxnSub(formData.value)
           break
         case 'update':
           res = await updateTxnSub(formData.value)
           break
         default:
           res = await createTxnSub(formData.value)
           break
       }
       if (res.code === 0) {
         ElMessage({
           type: 'success',
           message: 'Saved successfully'
         })
         closeDialog()
         getTableData()
       }
     })
}
</script>

<style>
</style>
