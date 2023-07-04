<template>
  <div>
    <div class="gva-search-box">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline" @keyup.enter="onSubmit">
        <el-form-item label="用户名">
          <el-input v-model="searchInfo.username" clearable placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="searchInfo.nickName" clearable placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="searchInfo.phone" clearable placeholder="搜索条件" />
        </el-form-item>
        <br>
        <el-form-item label="邮箱">
          <el-input v-model="searchInfo.email" clearable placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="商户id">
          <el-input v-model="searchInfo.merchantId" clearable placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchInfo.status" :clearable="true" filterable placeholder="请选择">
            <el-option v-for="v,k in statusOpts" :key="k" :label="v" :value="parseInt(k)" />
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="在线">
          <el-select v-model="searchInfo.online" :clearable="true" filterable placeholder="请选择">
            <el-option v-for="v,k in onlineOpts" :key="k" :label="v" :value="parseInt(k)" />
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
            <!-- <el-button icon="delete" size="small" style="margin-left: 10px;" :disabled="!multipleSelection.length" @click="deleteVisible = true">删除</el-button> -->
          </template>
        </el-popover>
      </div>
      <el-table
        ref="multipleTable"
        border
        style="width: 100%"
        tooltip-effect="dark"
        :data="tableData"
        row-key="ID"
        @selection-change="handleSelectionChange"
        @sort-change="sortChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column align="left" label="ID" prop="ID" sortable="custom" width="90" />
        <el-table-column align="left" label="头像" min-width="75" width="75">
          <template #default="scope">
            <CustomPic style="margin-top:8px" :pic-src="scope.row.headerImg" />
          </template>
        </el-table-column>
        <el-table-column align="left" label="在线" prop="online" width="60">
          <template #default="scope">
            <el-tag size="small" :type="statusTags[scope.row.online]" effect="dark">
              {{ onlineOpts[scope.row.online] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label="用户名" prop="username" width="120" />
        <!-- <el-table-column align="left" label="用户登录密码" prop="password" width="120" /> -->
        <!-- <el-table-column align="left" label="UUID" prop="uuid" width="170" /> -->
        <el-table-column align="left" label="商户id" prop="merchantId" width="120" />
        <el-table-column align="left" label="昵称" prop="nickName" width="120" />
        <el-table-column align="left" label="余额" sortable="amount" prop="amount" width="120" />
        <el-table-column align="left" label="手机号" prop="phone" width="120" />
        <el-table-column align="left" label="IP" prop="ip" width="120" />
        <el-table-column align="left" label="最后登录IP" prop="lastIp" width="120" />
        <!-- <el-table-column align="left" label="邮箱" prop="email" width="180" /> -->
        <el-table-column align="left" label="状态" prop="status" width="120">
          <template #default="scope">
            <el-tag size="small" :type="statusTags[scope.row.status]" effect="dark">
              {{ statusOpts[scope.row.status] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label="创建时间" width="180">
          <template #default="scope">{{ scope.row.CreatedAt }}</template>
        </el-table-column>
        <el-table-column align="left" label="更新时间" width="180">
          <template #default="scope">{{ scope.row.UpdatedAt }}</template>
        </el-table-column>
        <el-table-column align="left" fixed="right" label="按钮组" width="240">
          <template #default="scope">
            <el-button type="primary" link icon="edit" size="small" class="table-button" @click="updateUserFunc(scope.row)">变更</el-button>
            <!-- <el-button type="primary" link icon="delete" size="small" @click="deleteRow(scope.row)">删除</el-button> -->
            <el-button type="primary" link icon="magic-stick" size="small" @click="changePasswordFunc(scope.row)">修改密码</el-button>
            <el-button type="primary" link icon="magic-stick" size="small" @click="changeAmountFunc(scope.row)">变更余额</el-button>
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
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="formData.username" :disabled="type !== 'create'" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="formData.password" :disabled="type !== 'create'" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="UUID:" prop="uuid">
          <el-input v-model="formData.uuid" disabled :clearable="true" placeholder="自动生成" />
        </el-form-item>
        <el-form-item label="昵称:" prop="nickName">
          <el-input v-model="formData.nickName" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="商户id:" prop="merchantId">
          <el-input v-model="formData.merchantId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="手机号:" prop="phone">
          <el-input v-model="formData.phone" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="formData.email" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-select v-model="formData.status" placeholder="请选择" style="width:100%">
            <el-option v-for="v,k in statusOpts" :key="k" :label="v" :value="parseInt(k)" />
          </el-select>
        </el-form-item>
        <el-form-item label="头像:">
          <div style="display:inline-block" @click="openHeaderChange">
            <img v-if="formData.headerImg" class="header-img-box" :src="(formData.headerImg && formData.headerImg.slice(0, 4) !== 'http')?path+formData.headerImg:formData.headerImg">
            <div v-else class="header-img-box">从媒体库选择</div>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="small" @click="closeDialog">取 消</el-button>
          <el-button size="small" type="primary" @click="enterDialog">确 定</el-button>
        </div>
      </template>
    </el-dialog>
    <ChooseImg ref="chooseImg" :target="formData" :target-key="`headerImg`" />
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      statusTags: { 0: 'warning', 1: 'success', 2: 'info', 3: 'primary', 4: 'danger', 9: 'danger' },
      defaultStatus: { 1: '正常', 2: '关闭', 9: '异常' },
      statusOpts: { 1: '正常', 2: '冻结' },
      onlineOpts: { 1: '是', 2: '否' },
    }
  }
}
</script>

<script setup>
import {
  createUser,
  deleteUser,
  deleteUserByIds,
  updateUser,
  findUser,
  getUserList,
  changeUserPassword,
  changeAmount
} from '@/api/b_user'

// 全量引入格式化工具 请按需保留
import { formatDate } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'
import { getShortcuts } from '@/utils/date'
import { toSQLLine } from '@/utils/stringFun'
import { exportFile } from '@/utils/excel'
import CustomPic from '@/components/customPic/index.vue'
import ChooseImg from '@/components/chooseImg/index.vue'

// 自动化生成的字典（可能为空）以及字段
const formData = ref({
  username: '',
  password: '',
  uuid: '',
  nickName: '',
  phone: '',
  email: '',
  headerImg: '',
  status: 1,
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

const chooseImg = ref(null)
const openHeaderChange = () => {
  chooseImg.value.open()
}

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
    'username': '用户名',
    'password': '用户登录密码',
    'uuid': 'UUID',
    'nickName': '昵称',
    'phone': '手机号',
    'email': '邮箱',
    'headerImg': '头像',
    'statusStr': '状态',
  }
  const table = await getUserList({ page: 1, pageSize: 100000, ...searchInfo.value })
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
    v.statusStr = v.status === 1 ? '正常' : '冻结'
    v.CreatedAt = formatDate(v.CreatedAt)
    v.UpdatedAt = formatDate(v.UpdatedAt)
  })
  return data
}

// 查询
const getTableData = async() => {
  const table = await getUserList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
    deleteUserFunc(row)
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
  const res = await deleteUserByIds({ ids })
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
const updateUserFunc = async(row) => {
  const res = await findUser({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data.reuser
    dialogFormVisible.value = true
  }
}

const changePasswordFunc = (row) => {
  ElMessageBox.prompt(
    '该操作无法恢复，请确认是否修改此用户密码?',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      inputPlaceholder: '请输入密码'
    }
  ).then(async(value) => {
    const res = await changeUserPassword({
      ID: row.ID,
      password: value.value
    })
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: res.msg,
      })
    } else {
      ElMessage({
        type: 'error',
        message: res.msg,
      })
    }
  })
}

const changeAmountFunc = (row) => {
  ElMessageBox.prompt(
    '请输入增量变更的金额',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      inputPlaceholder: '请输入整数'
    }
  ).then(async(value) => {
    const res = await changeAmount({
      ID: row.ID,
      amount: parseInt(value.value)
    })
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: res.msg,
      })
    } else {
      ElMessage({
        type: 'error',
        message: res.msg,
      })
    }
    getTableData()
  })
}

// 删除行
const deleteUserFunc = async(row) => {
  const res = await deleteUser({ ID: row.ID })
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
    username: '',
    password: '',
    uuid: '',
    nickName: '',
    phone: '',
    email: '',
    headerImg: '',
    status: 1,
  }
}
// 弹窗确定
const enterDialog = async() => {
     elFormRef.value?.validate(async(valid) => {
       if (!valid) return
       let res
       switch (type.value) {
         case 'create':
           res = await createUser(formData.value)
           break
         case 'update':
           res = await updateUser(formData.value)
           break
         default:
           res = await createUser(formData.value)
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
