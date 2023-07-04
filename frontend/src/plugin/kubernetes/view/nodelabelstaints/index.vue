<template>
  <div class="container">
    <ClusterNamespace :namespace="false" />
    <el-tabs style="width:100%;">
      <el-tab-pane label="标签">
        <!--子组件-->
        <Labels />
      </el-tab-pane>
      <el-tab-pane label="污点">
        <!--子组件-->
        <Taint />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Labels from './labels/index.vue'
import Taint from './taint/index.vue'
import ClusterNamespace from '@/plugin/kubernetes/components/select/index.vue'

export default {
  name: 'Nodelabelstaint',
  components: {
    Labels,
    Taint,
    ClusterNamespace
  }
}
</script>
