<template>
  <div>
    <div class="gva-search-box">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline" @keyup.enter="onSubmit">
        <el-form-item label="Name">
          <el-input v-model="searchInfo.name" placeholder="Search criteria" clearable />
        </el-form-item>
        <el-form-item label="Currency">
          <el-input v-model="searchInfo.currency" placeholder="Search criteria" clearable />
        </el-form-item>
        <el-form-item label="Agent">
          <el-input v-model="searchInfo.agent" placeholder="Search criteria" clearable />
        </el-form-item>
        <el-form-item label="Type">
          <el-select v-model="searchInfo.type" :clearable="true" filterable placeholder="Please select">
            <el-option v-for="v,k in typeOpts" :key="k" :label="v" :value="parseInt(k)" />
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="Api_url">
          <el-input v-model="searchInfo.apiUrl" placeholder="Search criteria" clearable />
        </el-form-item>
        <el-form-item label="AppKey">
          <el-input v-model="searchInfo.appkey" placeholder="Search criteria" clearable />
        </el-form-item>
        <el-form-item label="Secret">
          <el-input v-model="searchInfo.secret" placeholder="Search criteria" clearable />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="searchInfo.status" :clearable="true" filterable placeholder="Please select">
            <el-option v-for="v,k in statusOpts" :key="k" :label="v" :value="parseInt(k)" />
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="Creation time:" prop="betweenTime">
          <el-date-picker
            v-model="searchInfo.betweenTime"
            type="datetimerange"
            :shortcuts="shortcuts"
            range-separator="To"
            start-placeholder="Start time"
            end-placeholder="End time"
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
        <!-- <el-button size="small" type="primary" icon="download" @click="exportExcel">导出</el-button> -->
        <el-button size="small" type="primary" icon="plus" @click="openDialog">Create</el-button>
        <el-popover v-model:visible="deleteVisible" placement="top" width="160">
          <p>Are you sure you want to delete？</p>
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
        <el-table-column align="left" label="Name" prop="name" width="120" />
        <el-table-column align="left" label="Currency" prop="currency" width="100" />
        <el-table-column align="left" label="Agent" prop="agent" width="100" />
        <el-table-column align="left" label="Type" prop="type" width="100">
          <template #default="scope">
            <el-tag size="small" :type="statusTags[scope.row.type]" effect="dark">
              {{ typeOpts[scope.row.type] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label="Api Url" prop="apiUrl" width="160">
          <template #default="scope">
            <el-popover placement="top" width="160" trigger="hover">
              <p>{{ scope.row.apiUrl }}</p>
              <template #reference>
                <div type="text" size="mini">
                  {{ scope.row.apiUrl ? scope.row.apiUrl.slice(0,18) + '...' : '' }}
                </div>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column align="left" label="AppKey" prop="appkey" width="150" />
        <el-table-column align="left" label="Secret" prop="secret" width="120">
          <template #default="scope">
            <el-popover placement="top" width="160" trigger="hover">
              <p>{{ scope.row.secret }}</p>
              <template #reference>
                <div type="text" size="mini">
                  {{ scope.row.secret ? scope.row.secret.slice(0,8) + '...' : '' }}
                </div>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column align="left" label="ProviderId" prop="providerId" width="150" />
        <el-table-column align="left" label="Status" prop="status" width="120">
          <template #default="scope">
            <el-tag size="small" :type="statusTags[scope.row.status]" effect="dark">
              {{ statusOpts[scope.row.status] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label="Creation time" width="180">
          <template #default="scope">{{ scope.row.CreatedAt }}</template>
        </el-table-column>
        <el-table-column align="left" label="Update time" width="180">
          <template #default="scope">{{ scope.row.UpdatedAt }}</template>
        </el-table-column>
        <el-table-column align="left" label="Button group" fixed="right" width="160">
          <template #default="scope">
            <el-button type="primary" link icon="edit" size="small" class="table-button" @click="updateMerchantFunc(scope.row)">Change</el-button>
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
        <el-form-item label="Name:" prop="name">
          <el-input v-model="formData.name" :clearable="true" placeholder="Please enter" />
        </el-form-item>
        <el-form-item label="Currency:" prop="currency">
          <el-input v-model="formData.currency" :clearable="true" placeholder="Please enter" />
        </el-form-item>
        <el-form-item label="Agent:" prop="currency">
          <el-input v-model="formData.agent" :clearable="true" placeholder="Please enter" />
        </el-form-item>
        <el-form-item label="Type:" prop="type">
          <el-select v-model="formData.type" placeholder="Please select" style="width:100%" :clearable="true">
            <el-option v-for="v,k in typeOpts" :key="k" :label="v" :value="parseInt(k)" />
          </el-select>
        </el-form-item>
        <el-form-item label="ApiUrl:" prop="apiUrl">
          <el-input v-model="formData.apiUrl" :clearable="true" placeholder="Please enter" />
        </el-form-item>
        <el-form-item label="AppKey:" prop="appkey">
          <el-input v-model="formData.appkey" :disabled="formData.ID" :clearable="true" placeholder="Please enter">
            <template #prepend>
              <el-button :disabled="formData.ID" @click="formData.appkey=randomString(16)">Generate</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="Secret:" prop="secret">
          <el-input v-model="formData.secret" :disabled="formData.ID" :clearable="true" placeholder="Please enter">
            <template #prepend>
              <el-button :disabled="formData.ID" @click="formData.secret=randomString(32)">Generate</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="ProviderId:" prop="providerId">
          <el-input v-model="formData.providerId" :clearable="true" placeholder="Please enter" />
        </el-form-item>
        <el-form-item label="Status:" prop="status">
          <el-select v-model="formData.status" placeholder="Please select" style="width:100%" :clearable="true">
            <el-option v-for="v,k in statusOpts" :key="k" :label="v" :value="parseInt(k)" />
          </el-select>
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
  name: 'Merchant',
  data() {
    return {
      statusTags: { 0: 'warning', 1: 'success', 2: 'danger', 3: 'primary', 4: 'danger', 9: 'danger' },
      defaultStatus: { 1: '正常', 2: '关闭', 9: '异常' },
      typeOpts: { 1: 'Normal', 2: 'Other' },
      statusOpts: { 1: 'Normal', 2: 'Close' },
    }
  }
}
</script>

<script setup>
import {
  createMerchant,
  deleteMerchant,
  deleteMerchantByIds,
  updateMerchant,
  findMerchant,
  getMerchantList
} from '@/api/merchant'

// 全量引入格式化工具 请按需保留
import { getDictFunc, formatDate, formatBoolean, filterDict } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'
import { getShortcuts } from '@/utils/date'
import { randomString, toSQLLine } from '@/utils/stringFun'
import { exportFile } from '@/utils/excel'

// 自动化生成的字典（可能为空）以及字段
const formData = ref({
  name: '',
  currency: '',
  type: 1,
  apiUrl: '',
  appkey: '',
  secret: '',
  status: 1,
  agent: '',
})

// 验证规则
const rule = reactive({
  name: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
  currency: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
  type: [{
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
    'name': 'name',
    'currency': 'currency',
    'type': 'type',
    'apiUrl': 'api_url',
    'appkey': 'appKey',
    'secret': 'secret',
    'status': 'status',
  }
  const table = await getMerchantList({ page: 1, pageSize: 100000, ...searchInfo.value })
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
  const table = await getMerchantList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
  ElMessageBox.confirm('Are you sure you want to delete?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(() => {
    deleteMerchantFunc(row)
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
      message: 'Please select要Delete的数据'
    })
    return
  }
  multipleSelection.value &&
        multipleSelection.value.map(item => {
          ids.push(item.ID)
        })
  const res = await deleteMerchantByIds({ ids })
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
const updateMerchantFunc = async(row) => {
  const res = await findMerchant({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data.remerchant
    dialogFormVisible.value = true
  }
}

// Delete行
const deleteMerchantFunc = async(row) => {
  const res = await deleteMerchant({ ID: row.ID })
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
    name: '',
    currency: '',
    type: 1,
    apiUrl: '',
    appkey: '',
    secret: '',
    status: 1,
    agent: '',
  }
}
// 弹窗确定
const enterDialog = async() => {
     elFormRef.value?.validate(async(valid) => {
       if (!valid) return
       let res
       switch (type.value) {
         case 'create':
           res = await createMerchant(formData.value)
           break
         case 'update':
           res = await updateMerchant(formData.value)
           break
         default:
           res = await createMerchant(formData.value)
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
