<template>
  <div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-form ref="searchForm" :inline="true" :model="searchInfo">
          <el-form-item label="名称">
            <el-input v-model="searchInfo.keywords" placeholder="名称" />
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" icon="search" @click="onSubmit">查询</el-button>
            <el-button size="small" icon="refresh" @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button size="small" type="primary" icon="plus" @click="openDialog('addApi')">新增</el-button>
      </div>
      <div v-if="tableData">
        <TableBlock :table-data="tableData" @update="handleUpdate" @detail="handleDetail" @delete="handleDelete" />
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
    <div v-if="dialogYamlVisible">
      <el-dialog v-model="dialogYamlVisible" width="60%" :title="title">
        <template #default>
          <div class="dialog-footer">
            <YamlBlock :data="form" @close="closeDialog" @enter="enterDialog" />
          </div>
        </template>
      </el-dialog>
    </div>
    <div v-if="dialogDetailVisible">
      <el-dialog v-model="dialogDetailVisible" width="70%" :title="title">
        <template #default>
          <div class="dialog-footer">
            <DetailBlock :data="form" @close="closeDialog" @enter="enterDialog" />
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Daemonsets',
}
</script>

<script setup>
import {
  DaemonsetsList,
  DaemonsetsGet,
  DaemonsetsUpdate,
  DaemonsetsCreate,
  DaemonsetsDelete,
} from '@/plugin/kubernetes/api/openkruise/daemonsets'
import { getK8sObject } from '@/plugin/kubernetes/utils/k8s'
import YamlBlock from '@/plugin/kubernetes/components/yaml/index.vue'
import TableBlock from './table.vue'
import DetailBlock from '@/plugin/kubernetes/components/detail/detail-index.vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
const form = ref({})
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const title = ref('')
const searchInfo = ref({ 'keywords': '', 'namespace': '' })

// 搜索重置
const onReset = () => {
  searchInfo.value.keywords = ''
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
const getTableData = async() => {
  const table = await DaemonsetsList(searchInfo.value.cluster_id, page.value, pageSize.value, searchInfo.value.namespace, searchInfo.value.keywords, '')
  if (table.code === 0) {
    tableData.value = table.data.items
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

// 更新数据模态框
const dialogYamlVisible = ref(false)
const type = ref('')
const handleUpdate = async(row) => {
  type.value = 'update'
  title.value = '编辑'
  const res = await DaemonsetsGet(searchInfo.value.cluster_id, row.metadata.namespace, row.metadata.name)
  if (res.code === 0) {
    form.value = res.data.items
    dialogYamlVisible.value = true
  }
}

// 关闭模态框
const closeDialog = () => {
  dialogYamlVisible.value = false
  form.value = {}
}

// 删除数据
const handleDelete = async(row) => {
  row.visible = false
  const res = await DaemonsetsDelete(searchInfo.value.cluster_id, row.metadata.namespace, row.metadata.name)
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
      res = await DaemonsetsCreate(searchInfo.value.cluster_id, row.metadata.namespace, row)
      break
    case 'update':
      res = await DaemonsetsUpdate(searchInfo.value.cluster_id, row.metadata.namespace, row.metadata.name, row)
      break
    default:
      res = await DaemonsetsCreate(searchInfo.value.cluster_id, row)
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
  form.value = getK8sObject('advanceddaemonset', searchInfo.value.namespace, '')
  dialogYamlVisible.value = true
}

// 详情
const dialogDetailVisible = ref(false)
const handleDetail = async(row) => {
  const res = await DaemonsetsGet(searchInfo.value.cluster_id, row.metadata.namespace, row.metadata.name)
  if (res.code === 0) {
    title.value = '详情'
    form.value = res.data.items
    form.value['cluster_id'] = searchInfo.value.cluster_id
    form.value['type'] = 'advanceddaemonset'
    dialogDetailVisible.value = true
  }
}

window.addEventListener('setItemCluster', (e) => {
  searchInfo.value.cluster_id = parseInt(localStorage.getItem('cluster_id'))
})

window.addEventListener('setItemNamespace', (e) => {
  searchInfo.value.namespace = localStorage.getItem('namespace')
  getTableData()
})
</script>
<style></style>
