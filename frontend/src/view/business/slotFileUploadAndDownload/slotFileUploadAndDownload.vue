<template>
  <div>
    <div class="gva-search-box">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline" @keyup.enter="onSubmit">

        <el-form-item label="文件名">
          <el-input v-model="searchInfo.name" placeholder="Search criteria" />
        </el-form-item>

        <el-form-item label="文件目录">
          <el-input v-model="searchInfo.file_dir" placeholder="Search criteria" />
        </el-form-item>

        <el-form-item label="图片类型">

          <el-input v-model.number="searchInfo.type" placeholder="Search criteria" />
        </el-form-item>
        <el-form-item label="机器id">

          <el-input v-model.number="searchInfo.slotId" placeholder="Search criteria" />
        </el-form-item>
        <el-form-item label="规格">

          <el-input v-model="searchInfo.specification" placeholder="Search criteria" />
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
        <el-form-item>
          <el-button size="small" type="primary" icon="search" @click="onSubmit">Query</el-button>
          <el-button size="small" icon="refresh" @click="onReset">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <!-- <el-button size="small" type="primary" icon="download" @click="exportExcel">Export</el-button> -->

        <!-- ///// -->
        <!-- <upload-common
          v-model:imageCommon="imageCommon"
          class="upload-btn"
          style="text-align: right;margin-right: 8px;"
          @on-success="getTableData"
        /> -->

        <upload-batch
          v-model:imageCommon="imageCommon"
          class="upload-btn"
          style="text-align: right;margin-right: 0px;"
          @on-success="getTableData"
        />
        <!-- <el-button size="small" type="primary" icon="plus" @click="openDialog">Create</el-button> -->
        <el-popover v-model:visible="deleteVisible" placement="top" width="160">
          <p>Are you sure you want to delete？</p>
          <div style="text-align: right; margin-top: 8px;">
            <el-button size="small" type="primary" link @click="deleteVisible = false">Cancel</el-button>
            <el-button size="small" type="primary" @click="onDelete">Confirm</el-button>
          </div>
          <template #reference>
            <el-button
              icon="delete"
              size="small"
              style="margin-left: 10px;"
              :disabled="!multipleSelection.length"
              @click="deleteVisible = true"
            >Delete</el-button>
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
        <el-table-column align="left" label="文件名" prop="name" width="120" />
        <el-table-column align="left" label="文件目录" prop="file_dir" width="120" />
        <el-table-column align="left" label="预览" width="100">
          <template #default="scope">
            <CustomPic pic-type="file" :pic-src="scope.row.url" />
          </template>
        </el-table-column>

        <el-table-column align="left" label="文件地址" prop="url" width="120" />
        <el-table-column align="left" label="文件标签" prop="tag" width="120" />
        <el-table-column align="left" label="文件编号" prop="key" width="120" />
        <el-table-column align="left" label="图片类型" prop="type" width="120" />
        <el-table-column align="left" label="机器id" prop="slotId" width="120" />
        <el-table-column align="left" label="规格" prop="specification" width="120" />
        <el-table-column align="left" label="操作人id" prop="userId" width="120" />
        <el-table-column align="left" label="Creation time" width="180">
          <template #default="scope">{{ scope.row.CreatedAt }}</template>
        </el-table-column>
        <el-table-column align="left" label="Update time" width="180">
          <template #default="scope">{{ scope.row.UpdatedAt }}</template>
        </el-table-column>
        <el-table-column align="left" label="Button group">
          <template #default="scope">
            <el-button
              type="primary"
              link
              icon="edit"
              size="small"
              class="table-button"
              @click="updateSlotFileUploadAndDownloadFunc(scope.row)"
            >Change</el-button>
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
        <el-form-item label="文件名:" prop="name">
          <el-input v-model="formData.name" :clearable="true" placeholder="Please enter" />
        </el-form-item>
        <el-form-item label="文件地址:" prop="url">
          <el-input v-model="formData.url" :clearable="true" placeholder="Please enter" />
        </el-form-item>
        <el-form-item label="文件标签:" prop="tag">
          <el-input v-model="formData.tag" :clearable="true" placeholder="Please enter" />
        </el-form-item>
        <el-form-item label="文件编号:" prop="key">
          <el-input v-model="formData.key" :clearable="true" placeholder="Please enter" />
        </el-form-item>
        <el-form-item label="图片类型:" prop="type">
          <el-input v-model.number="formData.type" :clearable="true" placeholder="Please enter" />
        </el-form-item>
        <el-form-item label="机器id:" prop="slotId">
          <el-input v-model.number="formData.slotId" :clearable="true" placeholder="Please enter" />
        </el-form-item>
        <el-form-item label="规格:" prop="specification">
          <el-input v-model="formData.specification" :clearable="true" placeholder="Please enter" />
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
  name: 'SlotFileUploadAndDownload',
  data() {
    return {
      statusTags: { 0: 'warning', 1: 'success', 2: 'info', 3: 'primary', 4: 'danger', 9: 'danger' },
      defaultStatus: { 1: 'Normal', 2: 'Close', 9: 'Abnormal' },
    }
  }
}
</script>

<script setup>
import {
  createSlotFileUploadAndDownload,
  deleteSlotFileUploadAndDownload,
  deleteSlotFileUploadAndDownloadByIds,
  updateSlotFileUploadAndDownload,
  findSlotFileUploadAndDownload,
  getSlotFileUploadAndDownloadList
} from '@/api/slotFileUploadAndDownload'

// 全量引入格式化工具 请按需保留
import { getDictFunc, formatDate, formatBoolean, filterDict } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'
import { getShortcuts } from '@/utils/date'
import { toSQLLine } from '@/utils/stringFun'
import { exportFile } from '@/utils/excel'
import UploadCommon from '@/components/upload/slotFile.vue'
import CustomPic from '@/components/customPic/index.vue'
import UploadBatch from '@/components/upload/slotFileBatch.vue'

// 自动化生成的字典（可能为空）以及字段
const formData = ref({
  name: '',
  url: '',
  tag: '',
  key: '',
  type: 0,
  slotId: 0,
  specification: '',
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

const imageCommon = ref('')

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
    'name': '文件名',
    'url': '文件地址',
    'tag': '文件标签',
    'key': '文件编号',
    'type': '图片类型',
    'slotId': '机器id',
    'specification': '规格',
  }
  const table = await getSlotFileUploadAndDownloadList({ page: 1, pageSize: 100000, ...searchInfo.value })
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
  const table = await getSlotFileUploadAndDownloadList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
    deleteSlotFileUploadAndDownloadFunc(row)
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
  const res = await deleteSlotFileUploadAndDownloadByIds({ ids })
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
const updateSlotFileUploadAndDownloadFunc = async(row) => {
  const res = await findSlotFileUploadAndDownload({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data.reSlotFileUpAndDown
    dialogFormVisible.value = true
  }
  // getTableData()
}

// Delete行
const deleteSlotFileUploadAndDownloadFunc = async(row) => {
  const res = await deleteSlotFileUploadAndDownload({ ID: row.ID })
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
    name: '',
    url: '',
    tag: '',
    key: '',
    type: 0,
    slotId: 0,
    specification: '',
  }
}
// 弹窗Confirm
const enterDialog = async() => {
  elFormRef.value?.validate(async(valid) => {
    if (!valid) return
    let res
    switch (type.value) {
      case 'create':
        res = await createSlotFileUploadAndDownload(formData.value)
        break
      case 'update':
        res = await updateSlotFileUploadAndDownload(formData.value)
        break
      default:
        res = await createSlotFileUploadAndDownload(formData.value)
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

<style></style>
