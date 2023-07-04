<template>
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
      <el-form-item v-show="namespaceStatus" label="命名空间">
        <el-select v-model="searchInfo.namespace" filterable placeholder="请选择命名空间" @change="NamespaceChange">
          <el-option
            v-for="item in namespace_list"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ClusterNamespace',
}
</script>

<script setup>
import { ref } from 'vue'
import { getClustersList } from '@/plugin/kubernetes/api/clusters'
import { NamespaceList } from '@/plugin/kubernetes/api/namespaces'
import { dispatchClusterIDEventStrage, dispatchNamespaceEventStrage } from '@/plugin/kubernetes/utils/watchLocalStorage'

const props = defineProps({
  namespace: {
    default: function() {
      return true
    },
    type: Boolean
  },
})

// 切换命名空间
const NamespaceChange = async(value) => {
  searchInfo.value['namespace'] = value
  dispatchNamespaceEventStrage(searchInfo.value.namespace)
}

// 集群选择
const ClusterChange = async(value) => {
  dispatchClusterIDEventStrage(value)
  await getNamespaceData(searchInfo.value.cluster_id)
  searchInfo.value['cluster_id'] = value
}

const defaultNamespace = ref({})
const getNamespaceData = async(cluster_id) => {
  defaultNamespace.value = { 'id': 0, 'name': 'All Namespaces' }
  const nstable = await NamespaceList(cluster_id, '', '', '')
  if (nstable.code === 0) {
    namespace_list.value = []
    for (const ns of nstable.data.items) {
      const item = {
        id: Math.random(),
        name: ns.metadata.name,
      }
      namespace_list.value.push(item)
    }
    namespace_list.value.push(defaultNamespace.value)
    searchInfo.value['namespace'] = namespace_list.value[0].name
    dispatchNamespaceEventStrage(searchInfo.value.namespace)
  }
}

const cluster_list = ref([])
const getClusterData = async() => {
  const table = await getClustersList({ page: 1, pageSize: 10000 })
  if (table.code === 0) {
    cluster_list.value = table.data.list
    searchInfo.value.cluster_id = cluster_list.value[0].id
    dispatchClusterIDEventStrage(searchInfo.value.cluster_id)
    await getNamespaceData(searchInfo.value.cluster_id)
  }
}

getClusterData()

// 数据初始化
const searchInfo = ref({})
const namespace_list = ref([])
const namespaceStatus = ref(true)
const FormInitData = () => {
  namespaceStatus.value = props.namespace
}

FormInitData()
</script>
<style scoped>

</style>
