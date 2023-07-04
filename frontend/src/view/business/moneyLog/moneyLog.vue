<template>
  <div>
    <div class="gva-search-box">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline" @keyup.enter="onSubmit">
        <el-form-item label="日期">
          <el-date-picker v-model="searchInfo.date" value-format="YYYYMMDD" placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="用户编号">

          <el-input v-model.number="searchInfo.userId" placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="操作类型">

          <el-input v-model.number="searchInfo.action" placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="子类型">

          <el-input v-model.number="searchInfo.actionType" placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="游戏编号">

          <el-input v-model.number="searchInfo.gameId" placeholder="搜索条件" />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" icon="search" @click="onSubmit">查询</el-button>
          <el-button size="small" icon="refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button size="small" type="primary" icon="download" @click="exportExcel">导出</el-button>
      </div>
      <div style="height: 65vh;">
        <el-table
          ref="multipleTable"
          style="width: 100%"
          tooltip-effect="dark"
          :data="tableData"
          height="100%"
          row-key="ID"
          border
          @selection-change="handleSelectionChange"
          @sort-change="sortChange"
        >
          <!-- <el-table-column type="selection" width="55" /> -->
          <el-table-column align="left" label="ID" prop="ID" sortable="custom" width="90" />
          <el-table-column sortable="custom" align="left" label="日期" prop="date" width="120" />
          <el-table-column sortable="custom" align="left" label="用户编号" prop="userId" width="120" />
          <el-table-column sortable="custom" align="left" label="操作类型" prop="action" width="120" />
          <el-table-column align="left" label="子类型" prop="actionType" width="120" />
          <el-table-column sortable="custom" align="left" label="初始金币" prop="coinInitial" width="120" />
          <el-table-column sortable="custom" align="left" label="金币变化" prop="coinChange" width="120" />
          <el-table-column align="left" label="金币结果" prop="coinResult" width="120" />
          <el-table-column sortable="custom" align="left" label="游戏编号" prop="gameId" width="120" />
          <el-table-column align="left" label="创建时间" width="180">
            <template #default="scope">{{ scope.row.CreatedAt }}</template>
          </el-table-column>
          <el-table-column align="left" label="更新时间" width="180">
            <template #default="scope">{{ scope.row.UpdatedAt }}</template>
          </el-table-column>
          <el-table-column align="left" fixed="right" label="按钮组">
            <template #default="scope">
              <el-button type="primary" link icon="edit" size="small" class="table-button" @click="updateMoneyLogFunc(scope.row)">查看</el-button>
              <el-button type="primary" link icon="tickets" :disabled="doClick(scope.row)" size="small" class="table-button" @click="viewGameInformationFunc(scope.row)">游戏信息</el-button>
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
        <el-form-item label="用户编号:" prop="userId">
          <el-input v-model.number="formData.userId" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="操作类型:" prop="action">
          <el-input v-model.number="formData.action" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="子类型:" prop="actionType">
          <el-input v-model.number="formData.actionType" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="初始金币:" prop="coinInitial">
          <el-input v-model.number="formData.coinInitial" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="金币变化:" prop="coinChange">
          <el-input v-model.number="formData.coinChange" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="金币结果:" prop="coinResult">
          <el-input v-model.number="formData.coinResult" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="游戏编号:" prop="gameId">
          <el-input v-model.number="formData.gameId" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="small" @click="closeDialog">返 回</el-button>
          <!-- <el-button size="small" type="primary" @click="enterDialog">确 定</el-button> -->
        </div>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogFormVisible1" :before-close="closeDialog" title="游戏记录">
      <el-form ref="elFormRef" :model="palydata" label-position="right" :rules="rule" label-width="120px">
        <el-form-item label="用户编号:" prop="userId">
          <el-input v-model.number="palydata.userId" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="押注:" prop="bet">
          <el-input v-model.number="palydata.bet" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="机器编号:" prop="slotNo">
          <el-input v-model.number="palydata.slotNo" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item v-if="true" style="height: 15px;">
          <el-col v-for="v,k in color" :key="k" :span="3">
            <el-tag class="ml-2" size="mini" :type="v" effect="dark"> {{ k }}</el-tag>
          </el-col>
        </el-form-item>
        <br>
        <el-form-item v-for="vv,kk in palydata.resultData" :key="kk" label="" prop="">
          <el-col v-for="v,k in vv" :key="k" :span="3">
            <el-tag class="ml-2" :type="getTagSetting(v).color">{{ getTagSetting(v).name }} </el-tag>
          </el-col>
        </el-form-item>
        <el-form-item label="奖池编号:" prop="jackpotNo">
          <el-input v-model.number="palydata.jackpotNo" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="赢钱组合编号:" prop="payTableNo">
          <el-input v-model.number="palydata.payTableNo" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="赢钱金额:" prop="gain">
          <el-input v-model.number="palydata.gain" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="small" @click="closeDialog">返 回</el-button>
        </div>
      </template>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'MoneyLog',
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
  createMoneyLog,
  deleteMoneyLog,
  deleteMoneyLogByIds,
  updateMoneyLog,
  findMoneyLog,
  getMoneyLogList
} from '@/api/moneyLog'
import {
  findSlotRecord,
} from '@/api/slotRecord'
// 全量引入格式化工具 请按需保留
import { getDictFunc, formatDate, formatBoolean, filterDict } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'
import { getShortcuts } from '@/utils/date'
import { toSQLLine } from '@/utils/stringFun'
import { exportFile } from '@/utils/excel'
import { getTagSetting } from '@/utils/getTag'
const color = {
  'Line': 'success',
  'PayTable': 'warning',
  'Wild': 'danger',
  'Single': 'primary',
  'Jackpot': 'primary'

}

// 自动化生成的字典（可能为空）以及字段
const formData = ref({
  date: '',
  userId: 0,
  action: 0,
  actionType: 0,
  coinInitial: 0,
  coinChange: 0,
  coinResult: 0,
  gameId: 0,
})
const palydata = ref({
  userId: 0,
  amount: 0,
  bet: 0,
  slotNo: 0,
  resultData: '',
  jackpotNo: 0,
  payTableNo: 0,
  gain: 0,
})

// 验证规则
const rule = reactive({
  date: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
  userId: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
  action: [{
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
    'date': '日期',
    'userId': '用户编号',
    'action': '操作类型',
    'actionType': '子类型',
    'coinInitial': '初始金币',
    'coinChange': '金币变化',
    'coinResult': '金币结果',
    'gameId': '游戏编号',
  }
  const table = await getMoneyLogList({ page: 1, pageSize: 100000, ...searchInfo.value })
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
  const table = await getMoneyLogList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
    deleteMoneyLogFunc(row)
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
  const res = await deleteMoneyLogByIds({ ids })
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
const updateMoneyLogFunc = async(row) => {
  const res = await findMoneyLog({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data.remoneyLog
    dialogFormVisible.value = true
  }
}

const doClick = (row) => {
  if (row.gameId === 0) {
    return true
  } else {
    return false
  }
}

// 查看游戏信息
const viewGameInformationFunc = async(row) => {
  const res = await findSlotRecord({ ID: row.gameId })
  type.value = 'update'
  if (res.code === 0) {
    palydata.value = res.data.reRecord
    dialogFormVisible1.value = true
    palydata.value.resultData = resultDataFormat(palydata.value.resultData)
  }
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

// 删除行
const deleteMoneyLogFunc = async(row) => {
  const res = await deleteMoneyLog({ ID: row.ID })
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
const dialogFormVisible1 = ref(false)

// 打开弹窗
const openDialog = () => {
  type.value = 'create'
  dialogFormVisible.value = true
}

// 关闭弹窗
const closeDialog = () => {
  dialogFormVisible.value = false
  dialogFormVisible1.value = false
  formData.value = {
    date: '',
    userId: 0,
    action: 0,
    actionType: 0,
    coinInitial: 0,
    coinChange: 0,
    coinResult: 0,
    gameId: 0,
  }
  palydata.value = {
    userId: 0,
    amount: 0,
    bet: 0,
    slotNo: 0,
    resultData: '',
    wildData: '',
    jackpotNo: 0,
    payTableNo: 0,
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
           res = await createMoneyLog(formData.value)
           break
         case 'update':
           res = await updateMoneyLog(formData.value)
           break
         default:
           res = await createMoneyLog(formData.value)
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
