<template>
  <div>
    <div class="gva-search-box">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline" @keyup.enter="onSubmit">
        <el-form-item label="机台编号">

          <el-input v-model.number="searchInfo.slotId" placeholder="搜索条件"/>
        </el-form-item>
        <el-form-item label="游戏类型">
          <el-select v-model="searchInfo.palyType" :clearable="true" filterable placeholder="请选择">
            <el-option v-for="v,k in palyTypeOpts" :key="k" :label="v" :value="parseInt(k)"/>
          </el-select>
        </el-form-item>
        <el-form-item label="对象类型">
          <el-select v-model="searchInfo.debugType" :clearable="true" filterable placeholder="请选择">
            <el-option v-for="v,k in debugTypeOpts" :key="k" :label="v" :value="parseInt(k)"/>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用" prop="start">
          <el-select v-model="searchInfo.start" clearable placeholder="请选择">
            <el-option
                key="true"
                label="是"
                value="1"
            />
            <el-option
                key="false"
                label="否"
                value="2"
            />
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
        <el-button size="small" type="primary" icon="delete" @click="clearFunc">刷新游戏缓存</el-button>
        <!-- <el-button size="small" type="primary" icon="download" @click="exportExcel">导出</el-button> -->
        <el-button size="small" type="primary" icon="plus" @click="openDialog">新增</el-button>
        <el-popover v-model:visible="deleteVisible" placement="top" width="160">
          <p>确定要删除吗？</p>
          <div style="text-align: right; margin-top: 8px;">
            <el-button size="small" type="primary" link @click="deleteVisible = false">取消</el-button>
            <el-button size="small" type="primary" @click="onDelete">确定</el-button>
          </div>
          <template #reference>
            <el-button
                icon="delete"
                size="small"
                style="margin-left: 10px;"
                :disabled="!multipleSelection.length"
                @click="deleteVisible = true"
            >删除
            </el-button>
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
        <el-table-column type="selection" width="55"/>
        <el-table-column align="left" label="ID" prop="ID" sortable="custom" width="90"/>
        <el-table-column align="left" label="机台编号" prop="slotId" width="120"/>
        <el-table-column align="left" label="游戏类型" prop="palyType" width="120">
          <template #default="scope">
            <el-tag size="small" :type="statusTags[scope.row.palyType]" effect="dark">
              {{ palyTypeOpts[scope.row.palyType] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label="对象类型" prop="debugType" width="120">
          <template #default="scope">
            <el-tag size="small" :type="statusTags[scope.row.debugType]" effect="dark">
              {{ debugTypeOpts[scope.row.debugType] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label="结果数据" width="320">
          <template #default="scope">
            {{ JSON.stringify(scope.row.resultData).slice(0, 30) + ' ... ' }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="是否启用" prop="start" width="100" fixed="right">
          <template #default="scope">
            <el-tag size="small" :type="statusTags[scope.row.start]" effect="dark">
              {{ openOpts[scope.row.start] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label="创建时间" width="180">
          <template #default="scope">{{ scope.row.CreatedAt }}</template>
        </el-table-column>
        <el-table-column align="left" label="更新时间" width="180">
          <template #default="scope">{{ scope.row.UpdatedAt }}</template>
        </el-table-column>
        <el-table-column align="left" label="按钮组" fixed="right">
          <template #default="scope">
            <el-button
                type="primary"
                link
                icon="edit"
                size="small"
                class="table-button"
                @click="updateDebugConfigFunc(scope.row)"
            >变更
            </el-button>
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
      <el-form ref="elFormRef" inline="true" :model="formData" label-position="right" :rules="rule" label-width="120px">
        <el-form-item label="机台编号:" prop="slotId" style="width: 45%;">
          <el-select v-model="formData.slotId" placeholder="请选择" style="width:100%" @change="input()">
            <el-option v-for="v,k in slotIdOpts" :key="k" :label="v" :value="v"/>
          </el-select>
        </el-form-item>
        <el-form-item label="是否开启" prop="start" style="width: 45%;">
          <el-select v-model="formData.start" placeholder="请选择" style="width:100%">
            <el-option v-for="v,k in openOpts" :key="k" :label="v" :value="parseInt(k)"/>
          </el-select>
        </el-form-item>
        <el-form-item label="游戏类型:" prop="palyType" style="width: 45%;">
          <el-select v-model="formData.palyType" placeholder="请选择" style="width:100%">
            <el-option v-for="v,k in palyTypeOpts" :key="k" :label="v" :value="parseInt(k)"/>
          </el-select>
        </el-form-item>
        <el-form-item label="对象类型:" prop="debugType" style="width: 45%;">
          <el-select v-model="formData.debugType" placeholder="请选择" style="width:100%">
            <el-option v-for="v,k in debugTypeOpts" :key="k" :label="v" :value="parseInt(k)"/>
          </el-select>
        </el-form-item>
        <el-form-item
            v-for="row,rindex in formData.resultData"
            :key="rindex"
            label=""
            prop=""
            style="width: 90%; margin-left: 100px;"
        >
          <el-col v-for="col,cindex in row" :key="cindex" :span="4">
            <el-select v-model="formData.resultData[rindex][cindex]" style="width:100%" :clearable="true">
              <el-option v-for="v,k in SlotTags" :key="k" :label="v.name" :value="v.name"/>
            </el-select>
          </el-col>
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
  name: 'DebugConfig',
  data() {
    return {
      statusTags: { 0: 'warning', 1: 'success', 2: 'info', 3: 'primary', 4: 'danger', 9: 'danger' },
      defaultStatus: { 1: '正常', 2: '关闭', 9: '异常' },
      palyTypeOpts: { 1: '普通', 2: 'ReSpin', 3: 'FreeSpin', 4: 'FreeReSpin' },
      debugTypeOpts: { 1: '前端', 2: '后端' },
      slotIdOpts: [1, 2, 3, 4, 5,6],
      openOpts: { 1: '开启', 2: '关闭' },
    }
  },
}
</script>

<script setup>
import {
  createDebugConfig,
  deleteDebugConfig,
  deleteDebugConfigByIds,
  updateDebugConfig,
  findDebugConfig,
  getDebugConfigList,
  getSlotTags,
} from '@/api/debugConfig'
import {
  backendOperate,
} from '@/api/slot'
// 全量引入格式化工具 请按需保留
import { getDictFunc, formatDate, formatBoolean, filterDict } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'
import { getShortcuts } from '@/utils/date'
import { toSQLLine } from '@/utils/stringFun'
import { exportFile } from '@/utils/excel'

const clearFunc = () => {
  ElMessageBox.confirm(
      '该操作将请求刷新游戏服务器所有机器内存配置，请确认',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      },
  ).then(async() => {
    backendOperateFunc(1, [])
  })
}
const backendOperateFunc = async(type, data) => {
  const res = await backendOperate({ type: type, data: data })
  if (res.code === 0) {
    ElMessageBox.alert(res.msg, '成功', {
      confirmButtonText: 'OK',
    })
  } else {
    ElMessageBox.alert(res.msg, '失败', {
      confirmButtonText: 'OK',
    })
  }
}

const reels = ref(['1', '2', '3'])
// 表格数据10*10的二维数组内容都是""
const SlotTags = ref()
const isinster = ref(false)
const input = async() => {
  console.log(formData.value.slotId)
  await getSlotTags({ slot_id: formData.value.slotId }).then(res => {
    console.log(res)
    if (res.data.slot_id === 0) {
      formData.value.resultData = []
      return
    }
    if (isinster.value) {
      formData.value.resultData = initTable(res.data.row, res.data.col)
    }

    SlotTags.value = res.data.slot_symbols
  })
}
const initTable = (row, col) => {
  const arr = []
  for (let index = 0; index < row; index++) {
    const row = []
    for (let index = 0; index < col; index++) {
      row.push('')
    }
    arr.push(row)
  }
  return arr
}

// 自动化生成的字典（可能为空）以及字段
const formData = ref({
  slotId: 0,
  palyType: 1,
  debugType: 1,
  resultData: '',
  start: 2,
})
// 验证规则
const rule = reactive({
  slotId: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
  palyType: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
  debugType: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
  start: [{
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
  if (searchInfo.value.start === '') {
    searchInfo.value.start = null
  }
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
    'slotId': '机台编号',
    'palyType': '游戏类型',
    'debugType': '对象类型',
    'resultData': '结果数据',
    'start': '是否启用',
  }
  const table = await getDebugConfigList({ page: 1, pageSize: 100000, ...searchInfo.value })
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
  data.forEach(v => {
    v.resultData = JSON.parse(v.resultData)
    v.CreatedAt = formatDate(v.CreatedAt)
    v.UpdatedAt = formatDate(v.UpdatedAt)
  })
  return data
}

// 查询
const getTableData = async() => {
  const table = await getDebugConfigList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
    type: 'warning',
  }).then(() => {
    deleteDebugConfigFunc(row)
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
      message: '请选择要删除的数据',
    })
    return
  }
  multipleSelection.value &&
  multipleSelection.value.map(item => {
    ids.push(item.ID)
  })
  const res = await deleteDebugConfigByIds({ ids })
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
const updateDebugConfigFunc = async(row) => {
  isinster.value = false
  const res = await findDebugConfig({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    res.data.redebugConfig.resultData = JSON.parse(res.data.redebugConfig.resultData)

    formData.value = res.data.redebugConfig
    dialogFormVisible.value = true
  }
  input()
}

// 删除行
const deleteDebugConfigFunc = async(row) => {
  const res = await deleteDebugConfig({ ID: row.ID })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '删除成功',
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
  isinster.value = true
  type.value = 'create'
  dialogFormVisible.value = true
}

// 关闭弹窗
const closeDialog = () => {
  dialogFormVisible.value = false
  formData.value = {
    slotId: 0,
    palyType: 1,
    debugType: 1,
    resultData: [],
    start: 2,
  }
}
// 弹窗确定
const enterDialog = async() => {
  console.log(formData.value.resultData)
  var str = JSON.stringify(formData.value.resultData)
  console.log(formData.value.resultData)
  var data = Object.assign({}, formData.value)
  data.resultData = str
  console.log(formData.value.resultData)
  elFormRef.value?.validate(async(valid) => {
    if (!valid) return
    let res
    switch (type.value) {
      case 'create':
        res = await createDebugConfig(data)
        break
      case 'update':
        console.log(formData.value.resultData)
        res = await updateDebugConfig(data)
        break
      default:
        res = await createDebugConfig(data)
        break
    }
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: '创建/更改成功',
      })
      console.log(formData.value.resultData)
      closeDialog()
      getTableData()
    }
  })
}
</script>

<style>
</style>
