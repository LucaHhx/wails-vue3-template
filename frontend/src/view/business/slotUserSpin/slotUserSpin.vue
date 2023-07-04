
<template>
  <div>
    <div class="gva-search-box">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline" @keyup.enter="onSubmit">
        <el-form-item label="用户id">
          <el-input v-model.number="searchInfo.userId" placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="机器id">
          <el-input v-model.number="searchInfo.slotId" placeholder="搜索条件" />
        </el-form-item>
        <br>
        <el-form-item label="剩余免费转次数">
          <el-input v-model.number="searchInfo.startFree" placeholder="搜索条件（起）" />
        </el-form-item>
        <el-form-item label="">
          <el-input v-model.number="searchInfo.endFree" placeholder="搜索条件（止）" />
        </el-form-item>
        <br>
        <el-form-item label="已玩游戏次数">
          <el-input v-model.number="searchInfo.startPlayNum" placeholder="搜索条件（起）" />
        </el-form-item>
        <el-form-item label="">
          <el-input v-model.number="searchInfo.endPlayNum" placeholder="搜索条件（止）" />
        </el-form-item>
        <br>
        <el-form-item label="已免费玩次数">
          <el-input v-model.number="searchInfo.startFreeNum" placeholder="搜索条件（起）" />
        </el-form-item>
        <el-form-item label="">
          <el-input v-model.number="searchInfo.endFreeNum" placeholder="搜索条件（止）" />
        </el-form-item>
        <br>
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
        <!-- <el-button size="small" type="primary" icon="plus" @click="openDialog">新增</el-button> -->
        <el-popover v-model:visible="deleteVisible" placement="top" width="160">
          <p>确定要删除吗？</p>
          <div style="text-align: right; margin-top: 8px;">
            <el-button size="small" type="primary" link @click="deleteVisible = false">取消</el-button>
            <el-button size="small" type="primary" @click="onDelete">确定</el-button>
          </div>
          <template #reference>
            <!-- <el-button icon="delete" size="small" style="margin-left: 10px;" :disabled="!multipleSelection.length" @click="deleteVisible = true">删除</el-button> -->
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
        <!-- <el-table-column type="selection" width="55" /> -->
        <el-table-column align="left" label="ID" prop="ID" sortable="custom" width="90" />
        <el-table-column sortable="custom" align="left" label="用户id" prop="userId" width="120" />
        <el-table-column sortable="custom" align="left" label="机器id" prop="slotId" width="120" />
        <el-table-column sortable="custom" align="left" label="剩余免费转次数" prop="free" width="150" />
        <el-table-column sortable="custom" align="left" label="已玩游戏次数" prop="playNum" width="140" />
        <el-table-column sortable="custom" align="left" label="已免费玩次数" prop="freeNum" width="140" />
        <el-table-column align="left" label="创建时间" width="180">
          <template #default="scope">{{ scope.row.CreatedAt }}</template>
        </el-table-column>
        <el-table-column align="left" label="更新时间" width="180">
          <template #default="scope">{{ scope.row.UpdatedAt }}</template>
        </el-table-column>
        <el-table-column align="left" label="按钮组">
          <template #default="scope">
            <el-button type="primary" link icon="edit" size="small" class="table-button" @click="updateSlotUserSpinFunc(scope.row)">变更</el-button>
            <!-- <el-button type="primary" link icon="delete" size="small" @click="deleteRow(scope.row)">删除</el-button> -->
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
        <el-form-item label="用户id:" prop="userId">
          <el-input v-model.number="formData.userId" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="机器id:" prop="slotId">
          <el-input v-model.number="formData.slotId" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="剩余免费转次数:" prop="free">
          <el-input v-model.number="formData.free" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="已玩游戏次数:" prop="playNum">
          <el-input v-model.number="formData.playNum" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="已免费玩次数:" prop="freeNum">
          <el-input v-model.number="formData.freeNum" disabled placeholder="请输入" />
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
  name: 'SlotUserSpin',
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
  createSlotUserSpin,
  deleteSlotUserSpin,
  deleteSlotUserSpinByIds,
  updateSlotUserSpin,
  findSlotUserSpin,
  getSlotUserSpinList
} from '@/api/slotUserSpin'

// 全量引入格式化工具 请按需保留
import { getDictFunc, formatDate, formatBoolean, filterDict } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'
import { getShortcuts } from '@/utils/date'
import { toSQLLine } from '@/utils/stringFun'
import { exportFile } from '@/utils/excel'

// 自动化生成的字典（可能为空）以及字段
const formData = ref({
  userId: 0,
  slotId: 0,
  free: 0,
  playNum: 0,
  freeNum: 0,
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
    'userId': '用户id',
    'slotId': '机器id',
    'free': '剩余免费转次数',
    'playNum': '已玩游戏次数',
    'freeNum': '已免费玩次数',
  }
  const table = await getSlotUserSpinList({ page: 1, pageSize: 100000, ...searchInfo.value })
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
  const table = await getSlotUserSpinList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
    deleteSlotUserSpinFunc(row)
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
  const res = await deleteSlotUserSpinByIds({ ids })
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
const updateSlotUserSpinFunc = async(row) => {
  const res = await findSlotUserSpin({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data.reslotUserSpin
    dialogFormVisible.value = true
  }
}

// 删除行
const deleteSlotUserSpinFunc = async(row) => {
  const res = await deleteSlotUserSpin({ ID: row.ID })
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
    userId: 0,
    slotId: 0,
    free: 0,
    playNum: 0,
    freeNum: 0,
  }
}
// 弹窗确定
const enterDialog = async() => {
     elFormRef.value?.validate(async(valid) => {
       if (!valid) return
       let res
       switch (type.value) {
         case 'create':
           res = await createSlotUserSpin(formData.value)
           break
         case 'update':
           res = await updateSlotUserSpin(formData.value)
           break
         default:
           res = await createSlotUserSpin(formData.value)
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

