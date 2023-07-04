<template>
  <div>
    <div class="gva-search-box">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline" @keyup.enter="onSubmit">
        <el-form-item label="Merchant ID">
          <el-input v-model.number="searchInfo.merchantId" placeholder="Search criteria" />
        </el-form-item>
        <!-- <el-form-item label="Agent">
          <el-input v-model="searchInfo.agent" placeholder="Search criteria" />
        </el-form-item> -->
        <el-form-item label="Url">
          <el-input v-model="searchInfo.url" placeholder="Search criteria" />
        </el-form-item>
        <el-form-item label="Method">
          <el-input v-model="searchInfo.method" placeholder="Search criteria" />
        </el-form-item>
        <br>
        <el-form-item label="Request">
          <el-input v-model="searchInfo.request" placeholder="Search criteria" />
        </el-form-item>
        <el-form-item label="Response">
          <el-input v-model="searchInfo.response" placeholder="Search criteria" />
        </el-form-item>
        <el-form-item label="Type">
          <el-select v-model="searchInfo.type" :clearable="true" filterable placeholder="Please select">
            <el-option v-for="v,k in typeOpts" :key="k" :label="v" :value="parseInt(k)" />
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="Status">
          <el-select v-model="searchInfo.status" :clearable="true" filterable placeholder="Please select">
            <el-option v-for="v,k in statusOpts" :key="k" :label="v" :value="parseInt(k)" />
          </el-select>
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="searchInfo.remark" placeholder="Search criteria" />
        </el-form-item>
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
        <br>
        <el-form-item>
          <el-button size="small" type="primary" icon="search" @click="onSubmit">Query</el-button>
          <el-button size="small" icon="refresh" @click="onReset">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <!-- <el-button size="small" type="primary" icon="download" @click="exportExcel">导出</el-button> -->
        <el-button size="small" type="primary" icon="plus" @click="openDialog">Create</el-button>
        <el-popover v-model:visible="deleteVisible" placement="top" width="160">
          <p>确定要Delete吗？</p>
          <div style="text-align: right; margin-top: 8px;">
            <el-button size="small" type="primary" link @click="deleteVisible = false">Cancel</el-button>
            <el-button size="small" type="primary" @click="onDelete">确定</el-button>
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
        <el-table-column align="left" label="Type" prop="type" width="90">
          <template #default="scope">
            <el-tag size="small" :type="statusTags[scope.row.type]" effect="dark">
              {{ typeOpts[scope.row.type] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label="Merchant ID" prop="merchantId" width="110" />
        <!-- <el-table-column align="left" label="Agent" prop="agent" width="110" /> -->
        <el-table-column align="left" label="Url" prop="url" width="160" />
        <el-table-column align="left" label="Method" prop="method" width="80" />
        <el-table-column align="left" label="Consume" prop="consume" width="100">
          <template #default="scope">
            {{ (scope.row.consume / 1000) + 'ms' }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="Request" prop="request" width="500" />
        <el-table-column align="left" label="Response" prop="response" width="500" />
        <el-table-column align="left" label="Status" prop="status" width="90">
          <template #default="scope">
            <el-tag size="small" :type="statusTags[scope.row.status]" effect="dark">
              {{ statusOpts[scope.row.status] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label="Remark" prop="remark" width="300" />
        <el-table-column align="left" label="Creation time" width="180">
          <template #default="scope">{{ scope.row.CreatedAt }}</template>
        </el-table-column>
        <el-table-column align="left" label="Update time" width="180">
          <template #default="scope">{{ scope.row.UpdatedAt }}</template>
        </el-table-column>
        <el-table-column align="left" label="Button group" width="160" fixed="right">
          <template #default="scope">
            <el-button type="primary" link icon="edit" size="small" class="table-button" @click="updateApiLogFunc(scope.row)">Change</el-button>
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
          <el-input v-model.number="formData.merchantId" disabled placeholder="Please enter" />
        </el-form-item>
        <el-form-item label="Url:" prop="url">
          <el-input v-model="formData.url" disabled placeholder="Please enter" />
        </el-form-item>
        <el-form-item label="Method:" prop="method">
          <el-input v-model="formData.method" disabled placeholder="Please enter" />
        </el-form-item>
        <el-form-item label="Request:" prop="request">
          <el-input v-model="formData.request" disabled placeholder="Please enter" />
        </el-form-item>
        <el-form-item label="Response:" prop="response">
          <el-input v-model="formData.response" disabled placeholder="Please enter" />
        </el-form-item>
        <el-form-item label="Status:" prop="status">
          <el-select v-model="formData.status" placeholder="请选择" style="width:100%" disabled>
            <el-option v-for="v,k in statusOpts" :key="k" :label="v" :value="parseInt(k)" />
          </el-select>
        </el-form-item>
        <el-form-item label="Remark:" prop="remark">
          <el-input v-model="formData.remark" :clearable="true" placeholder="Please enter" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="small" @click="closeDialog">Cancel</el-button>
          <el-button size="small" type="primary" @click="enterDialog">Enter</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ApiLog',
  data() {
    return {
      statusTags: { 0: 'warning', 1: 'success', 2: 'danger', 3: 'primary', 4: 'danger', 9: 'danger' },
      defaultStatus: { 1: '正常', 2: '关闭', 9: '异常' },
      statusOpts: { 1: 'success', 2: 'fail' },
      typeOpts: { 0: 'unknown', 1: 'request', 2: 'accept' },
    }
  }
}
</script>

<script setup>
import {
  createApiLog,
  deleteApiLog,
  deleteApiLogByIds,
  updateApiLog,
  findApiLog,
  getApiLogList
} from '@/api/apiLog'

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
  url: '',
  method: '',
  request: '',
  response: '',
  status: 1,
  remark: '',
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

// Reset
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
    'url': 'Url',
    'method': 'Method',
    'request': 'Request',
    'response': 'Response',
    'status': 'Status',
    'remark': 'Remark',
  }
  const table = await getApiLogList({ page: 1, pageSize: 100000, ...searchInfo.value })
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

// Query
const getTableData = async() => {
  const table = await getApiLogList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
  ElMessageBox.confirm('确定要Delete吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(() => {
    deleteApiLogFunc(row)
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
      message: '请选择要Delete的数据'
    })
    return
  }
  multipleSelection.value &&
        multipleSelection.value.map(item => {
          ids.push(item.ID)
        })
  const res = await deleteApiLogByIds({ ids })
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
const updateApiLogFunc = async(row) => {
  const res = await findApiLog({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data.reapiLog
    dialogFormVisible.value = true
  }
}

// Delete行
const deleteApiLogFunc = async(row) => {
  const res = await deleteApiLog({ ID: row.ID })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: 'Delete成功'
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
    url: '',
    method: '',
    request: '',
    response: '',
    status: 1,
    remark: '',
  }
}
// 弹窗确定
const enterDialog = async() => {
     elFormRef.value?.validate(async(valid) => {
       if (!valid) return
       let res
       switch (type.value) {
         case 'create':
           res = await createApiLog(formData.value)
           break
         case 'update':
           res = await updateApiLog(formData.value)
           break
         default:
           res = await createApiLog(formData.value)
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
