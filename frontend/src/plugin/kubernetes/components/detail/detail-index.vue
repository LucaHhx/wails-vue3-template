<template>
  <div>
    <el-row :gutter="20" class="row-box">
      <el-col :span="24">
        <el-card class="el-card">
          <detail-basic :form="detailData" />
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane name="pods" label="容器组">
            <detail-pods :data="detailData" :selectors="Selectors" />
          </el-tab-pane>
          <el-tab-pane v-if="detailData.type !== 'broadcastjob'" name="services" label="服务">
            <detail-services :data="detailData" :selectors="Selectors" />
          </el-tab-pane>
          <el-tab-pane v-if="detailData.type !== 'broadcastjob'" name="ingress" label="路由">
            <detail-ingress :data="detailData" />
          </el-tab-pane>
          <el-tab-pane name="conditions" label="运行时信息">
            <detail-conditions :conditions="detailData.status.conditions" />
          </el-tab-pane>
          <el-tab-pane v-if="detailData.type && detailData.type === 'deployment'" name="strategy" label="部署策略">
            <detail-update :data="detailData" @update="WorkloadsUpdate" />
          </el-tab-pane>
          <el-tab-pane v-if="detailData.type && detailData.type === 'advancedscloneset'" name="cloneset-update" label="部署策略">
            <open-kruise-cloneset-update :data="detailData" @update="WorkloadsUpdate" />
          </el-tab-pane>
          <el-tab-pane v-if="detailData.type && detailData.type === 'advanceddaemonset'" name="daemon-update" label="部署策略">
            <open-kruise-advanced-daemon-set-update :data="detailData" @update="WorkloadsUpdate" />
          </el-tab-pane>
          <el-tab-pane v-if="detailData.type && detailData.type === 'advancedstatefulset'" name="advancedstatefulset-update" label="部署策略">
            <open-kruise-advanced-statefulset-update :data="detailData" @update="WorkloadsUpdate" />
          </el-tab-pane>
          <el-tab-pane v-if="detailData.type && detailData.type === 'advancedscloneset'" name="cloneset-scaleStrategy" label="指定Pod缩容">
            <open-kruise-clone-set-scale-strategy :data="detailData" :selectors="Selectors" @update="WorkloadsUpdate" />
          </el-tab-pane>
          <el-tab-pane v-if="detailData.type && detailData.type === 'advancedscloneset'" name="cloneset-update-pause" label="暂停">
            <open-kruise-cloneset-update-pause :data="detailData" @update="WorkloadsUpdate" />
          </el-tab-pane>
          <el-tab-pane v-if="detailData.type && detailData.type === 'advancedstatefulset'" name="advancedstatefulset-update-pause" label="暂停">
            <open-kruise-advanced-statefulset-update-pause :data="detailData" @update="WorkloadsUpdate" />
          </el-tab-pane>
          <el-tab-pane v-if="detailData.type && detailData.type === 'advancedstatefulset'" name="statefulsetreserve-ordinal" label="序号保留（跳过）">
            <open-kruise-advanced-statefulsetreserve-ordinal :data="detailData" @update="WorkloadsUpdate" />
          </el-tab-pane>
          <el-tab-pane v-if="detailData.type && detailData.type === 'deployment' || detailData.type === 'advancedscloneset' || detailData.type === 'advancedstatefulset' " name="replicas" label="副本数">
            <detail-replicas :data="detailData" @update="WorkloadsUpdate" />
          </el-tab-pane>
          <el-tab-pane v-if="detailData.type && detailData.type === 'deployment' || detailData.type === 'advancedscloneset' || detailData.type === 'advancedstatefulset' || detailData.type === 'advanceddaemonset'" name="image" label="容器镜像">
            <detail-image :data="detailData" @update="WorkloadsUpdate" />
          </el-tab-pane>
          <el-tab-pane v-if="detailData.type && detailData.type === 'deployment' " name="pause" label="暂停">
            <detail-pause :data="detailData" @update="WorkloadsUpdate" />
          </el-tab-pane>
          <el-tab-pane v-if="detailData.type && detailData.type === 'deployment'" name="history" label="历史版本">
            <detail-replicasets :data="detailData" :selectors="Selectors" @update="WorkloadsUpdate" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'DetailBlock',
}
</script>

<script setup>
import DetailBasic from '@/plugin/kubernetes/components/detail/detail-basic.vue'
import DetailPods from '@/plugin/kubernetes/components/detail/detail-pods.vue'
import DetailServices from '@/plugin/kubernetes/components/detail/detail-services.vue'
import DetailIngress from '@/plugin/kubernetes/components/detail/detail-ingress.vue'
import DetailConditions from '@/plugin/kubernetes/components/detail/detail-conditions.vue'
import DetailUpdate from '@/plugin/kubernetes/components/detail/detail-update.vue'
import OpenKruiseClonesetUpdate from '@/plugin/kubernetes/components/openkruise/detail-cloneset-update.vue'
import OpenKruiseAdvancedStatefulsetUpdate from '@/plugin/kubernetes/components/openkruise/detail-statefulset-update.vue'
import OpenKruiseAdvancedDaemonSetUpdate from '@/plugin/kubernetes/components/openkruise/detail-daemonset-update.vue'
import OpenKruiseCloneSetScaleStrategy from '@/plugin/kubernetes/components/openkruise/detail-cloneset-scalestrategy.vue'
import OpenKruiseClonesetUpdatePause from '@/plugin/kubernetes/components/openkruise/detail-cloneset-update-pause.vue'
import OpenKruiseAdvancedStatefulsetUpdatePause from '@/plugin/kubernetes/components/openkruise/detail-statefulset-update-pause.vue'
import OpenKruiseAdvancedStatefulsetreserveOrdinal from '@/plugin/kubernetes/components/openkruise/detail-statefulset-reserveordinals.vue'
import DetailReplicas from '@/plugin/kubernetes/components/detail/detail-replicas.vue'
import DetailImage from '@/plugin/kubernetes/components/detail/detail-image.vue'
import DetailPause from '@/plugin/kubernetes/components/detail/detail-pause.vue'
import DetailReplicasets from '@/plugin/kubernetes/components/detail/detail-replicasets.vue'
import { ref } from 'vue'
import { DeploymentsUpdate } from '@/plugin/kubernetes/api/deployments'
import { ElMessage } from 'element-plus'
import { CloneSetsUpdate } from '@/plugin/kubernetes/api/openkruise/clonesets'
import { StatefulsetsUpdate } from '@/plugin/kubernetes/api/openkruise/statefulsets'
import { DaemonsetsUpdate } from '@/plugin/kubernetes/api/openkruise/daemonsets'
const props = defineProps({
  data: {
    default: function() {
      return {}
    },
    type: Object
  },
})

// 标签选择器
const Selectors = ref('')
const SelectormatchLabel = async() => {
  if (detailData.value.spec.selector) {
    if (detailData.value.spec.selector.matchLabels) {
      for (const key in detailData.value.spec.selector.matchLabels) {
        if (Object.prototype.hasOwnProperty.call(detailData.value.spec.selector.matchLabels, key)) {
          Selectors.value += key + '=' + detailData.value.spec.selector.matchLabels[key] + ','
        }
      }
      Selectors.value = Selectors.value.length !== 0 ? Selectors.value.substring(0, Selectors.value.length - 1) : ''
    }
  }

  if (detailData.value.type === 'broadcastjob') {
    Selectors.value = 'broadcastjob-name' + '=' + detailData.value.metadata.name
  }
}

// 数据初始化
const activeName = ref('')
const detailData = ref({})
const detailInitData = () => {
  activeName.value = 'pods'
  detailData.value = props.data
  SelectormatchLabel()
}

detailInitData()

// 更新
const WorkloadsUpdate = async(value) => {
  if (value.type) {
    let res
    switch (value.type) {
      case 'deployment':
        res = await DeploymentsUpdate(value.cluster_id, value.metadata.namespace, value.metadata.name, value)
        break
      case 'advancedscloneset':
        res = await CloneSetsUpdate(value.cluster_id, value.metadata.namespace, value.metadata.name, value)
        break
      case 'advancedstatefulset':
        res = await StatefulsetsUpdate(value.cluster_id, value.metadata.namespace, value.metadata.name, value)
      case 'advanceddaemonset':
        res = await DaemonsetsUpdate(value.cluster_id, value.metadata.namespace, value.metadata.name, value)
      default:
        break
    }
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: '更新成功'
      })
    }
  }
}
</script>
<style scoped>

</style>
