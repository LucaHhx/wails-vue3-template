<template>
  <div>
    <div class="gva-search-box">
      <el-form ref="searchForm" :inline="true" :model="searchInfo">
        <el-form-item label="集群">
          <el-select v-model="searchInfo.cluster_id" placeholder="请选择集群" @change="ClusterChange">
            <el-option
              v-for="item in cluster_list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="searchInfo.keywords" placeholder="名称" />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" icon="search" @click="onSubmit">查询</el-button>
          <el-button size="small" icon="refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button size="small" type="primary" icon="plus" @click="openDialog('addApi')">新增</el-button>
      </div>
      <div v-if="tableData">
        <TableBlock :table-data="tableData" @update="handleUpdate" @delete="handleDelete" />
      </div>
    </div>
    <div class="gva-pagination">
      <el-pagination
        :current-page="page"
        :page-size="pageSize"
        :page-sizes="[10, 30, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
    <div v-if="dialogFormVisible">
      <el-dialog
        v-model="dialogFormVisible"
        width="40%"
        :title="title"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
      >
        <FormBlock :form="form" :optype="type" @close="closeDialog" @enter="enterDialog" />
      </el-dialog>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Index',
}
</script>

<script setup>
import {
  getClustersList,
} from '@/plugin/kubernetes/api/clusters'
import {
  NamespaceList,
  NamespaceCreate,
  NamespaceUpdate,
  NamespaceDelete,
} from '@/plugin/kubernetes/api/namespaces'
import FormBlock from './form.vue'
import TableBlock from './table.vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
const form = ref({
  apiVersion: 'v1',
  kind: 'Namespace',
  metadata: {
    name: '',
    annotations: {},
    labels: {},
  },
})
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const title = ref('')
const searchInfo = ref({ 'keywords': '' })
const cluster_list = ref([])

// 搜素
const onReset = () => {
  searchInfo.value = {}
}

// 提交搜索
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

const handleCurrentChange = (val) => {
  page.value = val
  getTableData()
}

// 查询
const getClusterData = async() => {
  const table = await getClustersList({ page: 1, pageSize: 10000 })
  if (table.code === 0) {
    cluster_list.value = table.data.list
    searchInfo.value.cluster_id = cluster_list.value[0].id
  }
}

// 查询
const getTableData = async(status) => {
  if (status) {
    await getClusterData()
  }
  const table = await NamespaceList(searchInfo.value.cluster_id, page.value, pageSize.value, searchInfo.value.keywords)
  if (table.code === 0) {
    tableData.value = table.data.items
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

getTableData(true)

// 更新数据模态框
const dialogFormVisible = ref(false)
const type = ref('')
const handleUpdate = async(row) => {
  type.value = 'update'
  title.value = '更新'
  form.value = row
  dialogFormVisible.value = true
}

// 关闭模态框
const closeDialog = () => {
  dialogFormVisible.value = false
  form.value = {
    apiVersion: 'v1',
    kind: 'Namespace',
    metadata: {
      name: '',
      annotations: {},
      labels: {},
    },
  }
}

// 删除数据
const handleDelete = async(row) => {
  const res = await NamespaceDelete(searchInfo.value.cluster_id, row.metadata.name)
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getTableData()
  }
}

// 提交数据提示信息
const handleOptions = async(res) => {
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: res.msg
    })
    getTableData()
  }
}

// 提交数据
const enterDialog = async(row) => {
  let res
  switch (type.value) {
    case 'create':
      res = await NamespaceCreate(searchInfo.value.cluster_id, row)
      break
    case 'update':
      res = await NamespaceUpdate(searchInfo.value.cluster_id, row.metadata.name, row)
      break
    default:
      res = await NamespaceCreate(searchInfo.value.cluster_id, row)
      break
  }

  if (res.code === 0) {
    closeDialog()
    handleOptions(res)
  }
}

// 创建
const openDialog = () => {
  type.value = 'create'
  title.value = '创建'
  dialogFormVisible.value = true
}

// 集群选择
const ClusterChange = async() => {
  getTableData()
}
</script>
<style></style>
