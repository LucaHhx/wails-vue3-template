<template>
  <div>
    <el-table ref="multipleTable" :data="tableData" style="width: 100%" tooltip-effect="dark" row-key="ID">
      <el-table-column type="selection" width="55" />
      <el-table-column align="left" label="名称" prop="metadata.name">
        <template #default="scope">
          <span>{{ scope.row.metadata.name }}</span>
          <el-tooltip placement="top">
            <template #content>
              <div v-for="(v,k, i) in scope.row.metadata.labels" slot="content" :key="i">
                <span> {{ k }}: {{ v }}</span>
              </div>
            </template>
            <el-button size="small" type="primary" link icon="PriceTag" />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="Internal IP" prop="metadata.name" max-width="30px">
        <template #default="scope">
          <div v-for="(address,index) in scope.row.status.addresses" :key="index">
            <span v-if="address.type === 'InternalIP'">{{ address.address }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="labels"
        label="标签"
        type="scope"
      >
        <template #default="scope">
          <div v-show="scope.row.spec.taints">
            <span v-for="(k, index) in scope.row.spec.taints" :key="index" class="span-color-tag">
              <span type="info" @click="handleUpdate(scope.row)"> {{ k.key }}: {{ k.value }} effect: {{ k.effect }}
              </span>
            </span>
          </div>
          <div v-show="!scope.row.spec.taints">
            <el-button size="small" type="primary" link icon="plus" @click="handleUpdate(scope.row)">添加</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'TableBlock',
  emits: {
  }
}
</script>
<script setup>
const emit = defineEmits(['update', 'delete'])
defineProps({
  tableData: {
    default: function() {
      return []
    },
    type: Array
  },
})

// 更新
const handleUpdate = (data) => {
  emit('update', data)
}
</script>
<style scoped>
.span-color-tag {
  padding: 5px 20px 5px 5px;
  border-radius: 15px 15px 15px 15px;
  background: #f1f1f1;
  position: relative;
  margin: 2px;
  color: var(--el-color-primary);
  cursor: pointer;
}
.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tooltip-base-box .center {
  justify-content: center;
}
.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
.operate-span-primary {
  color: var(--el-color-primary);
  cursor: pointer;
  font-weight:bold;
}
</style>
