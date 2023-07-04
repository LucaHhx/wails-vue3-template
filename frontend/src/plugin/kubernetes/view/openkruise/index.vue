<template>
  <div class="container">
    <warning-bar title="注：请在Kubernetes集群内安装OpenKruise控制器以便于使用该功能，建议OpenKruise版本 >= v1.2 。" />
    <ClusterNamespace />
    <el-tabs style="width:100%;">
      <el-tab-pane label="CloneSet">
        <!--子组件-->
        <CloneSets />
      </el-tab-pane>
      <el-tab-pane label="Advanced StatefulSet">
        <!--子组件-->
        <AdvancedStatefulSet />
      </el-tab-pane>
      <el-tab-pane label="Advanced DaemonSet">
        <!--子组件-->
        <AdvancedDaemonSet />
      </el-tab-pane>
      <el-tab-pane label="BroadcastJob">
        <!--子组件-->
        <BroadcastJob />
      </el-tab-pane>
      <el-tab-pane label="AdvancedCronJob">
        <!--子组件-->
        <AdvancedCronJob />
      </el-tab-pane>
      <el-tab-pane label="SidecarSet">
        <!--子组件-->
        <SidecarSet />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>

import CloneSets from './clonesets/index.vue'
import AdvancedStatefulSet from './statefulsets/index.vue'
import AdvancedDaemonSet from './daemonsets/index.vue'
import BroadcastJob from './broadcastjobs/index.vue'
import AdvancedCronJob from './cronjobs/index.vue'
import SidecarSet from './sidecarsets/index.vue'
import WarningBar from '@/components/warningBar/warningBar.vue'
import ClusterNamespace from '@/plugin/kubernetes/components/select/index.vue'
export default {
  name: 'OpenKruise',
  components: {
    CloneSets,
    WarningBar,
    AdvancedStatefulSet,
    AdvancedDaemonSet,
    BroadcastJob,
    AdvancedCronJob,
    SidecarSet,
    ClusterNamespace
  },
}
</script>
