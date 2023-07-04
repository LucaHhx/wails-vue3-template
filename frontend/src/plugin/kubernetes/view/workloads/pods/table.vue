<template>
  <div>
    <el-table ref="multipleTable" :data="tableData" style="width: 100%" tooltip-effect="dark" row-key="ID">
      <el-table-column type="selection" width="55" />
      <el-table-column align="left" label="名称" prop="metadata.name">
        <template #default="scope">
          <img style="width:14px;margin-right:2px" src="//g.alicdn.com/aliyun/cos/1.38.27/images/icon_docker.png">
          <span class="operate-span-primary" @click="handleDetail(scope.row)">{{ scope.row.metadata.name }}</span>
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
      <el-table-column label="容器" prop="container" type="scope">
        <template #default="scope">
          <div v-for="(p, index) in scope.row.status.containerStatuses" :key="index" class="gridChart">
            <div v-if="p.ready">
              <el-tooltip placement="top">
                <template #content>
                  <div slot="content">
                    {{ p.name }}（running, ready）
                  </div>
                </template>
                <el-tag class="ml-2" type="success" effect="dark" />
              </el-tooltip>
            </div>
            <div v-else-if="!p.ready && p.state.waiting">
              <el-tooltip placement="top">
                <template #content>
                  <div slot="content">
                    {{ p.name }} 报错信息: {{ p.state.waiting.reason }}
                  </div>
                </template>
                <el-tag class="ml-2" type="danger" effect="dark" />
              </el-tooltip>
            </div>
            <div v-else-if="!p.ready && p.state.terminated">
              <el-tooltip placement="top">
                <template #content>
                  <div slot="content">
                    {{ p.name }} {{ p.state.terminated.reason }}
                  </div>
                </template>
                <el-tag class="ml-2" type="info" effect="dark" />
              </el-tooltip>
            </div>
            <div v-else>
              <el-tooltip placement="top">
                <template #content>
                  <div slot="content">
                    {{ p.name }}
                  </div>
                </template>
                <el-tag class="ml-2" type="info" effect="dark" />
              </el-tooltip>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        prop="status"
        type="scope"
      >
        <template #default="scope">
          <el-tag v-if="scope.row.status.phase ==='Running'" type="success">Running</el-tag>
          <el-tag v-else-if="scope.row.status.phase ==='Succeeded'" type="info">Completed</el-tag>
          <el-tag v-else type="danger">{{ scope.row.status.phase }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="重启次数"
        prop="restarts"
        type="scope"
      >
        <template #default="scope">
          <span>{{ RestartCounts(scope.row.status.containerStatuses) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="命名空间"
        prop="namespace"
        type="scope"
      >
        <template #default="scope">
          <span>{{ scope.row.metadata.namespace }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Pod IP"
        prop="Pod_IP"
        type="scope"
      >
        <template #default="scope">
          <span>{{ scope.row.status.podIP }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="调度节点"
        prop="hostIP"
        type="scope"
      >
        <template #default="scope">
          <span class="operate-span">{{ scope.row.status.hostIP }}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" label="存活时间" prop="metadata.creationTimestamp" width="180">
        <template #default="scope">
          <span>{{ AgeFormat(scope.row.metadata.creationTimestamp) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" label="操作">
        <template #default="scope">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-button size="small" type="primary" link icon="edit" @click="handleUpdate(scope.row)">编辑</el-button>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" link icon="Monitor" @click="handleMonitor(scope.row)">监控</el-button>
            </el-form-item>
            <el-form-item>
              <el-popover v-model="scope.row.visible" placement="top">
                <p>确定要删除吗？</p>
                <div style="text-align: right; margin-top: 8px;">
                  <el-button size="small" type="primary" link @click="scope.row.visible = false">取消</el-button>
                  <el-button type="primary" size="small" @click="handleDelete(scope.row)">确定</el-button>
                </div>
                <template #reference>
                  <el-button type="primary" link icon="delete" size="small" @click="scope.row.visible = true">删除</el-button>
                </template>
              </el-popover>
            </el-form-item>
            <el-form-item>
              <el-dropdown>
                <el-button type="primary" link icon="MoreFilled" size="small">更多</el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click.native="handleDetail(scope.row)">详情</el-dropdown-item>
                    <div v-for="(item,index) in scope.row.spec.containers" :key="index">
                      <el-dropdown-item @click.native="handleTerminal(scope.row, item.name)">
                        {{ item.name }} 终端
                      </el-dropdown-item>
                    </div>
                    <div v-for="(item,index) in scope.row.spec.containers" :key="index">
                      <el-dropdown-item @click.native="handleTerminalLogs(scope.row, item.name)">
                        {{ item.name }} 终端日志
                      </el-dropdown-item>
                    </div>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'TableBlock',
  emits: {
    update: () => {
      return true
    },
    search: () => {
      return true
    },
    detail: () => {
      return true
    },
    terminal: () => {
      return true
    },
    terminallog: () => {
      return true
    },
    delete: (value) => {
      if (value.length === 1) {
        return true
      } else {
        return false
      }
    },
  }
}
</script>
<script setup>
import { AgeFormat } from '@/plugin/kubernetes/utils/age'
import { RestartCounts } from '@/plugin/kubernetes/utils/restart'
const emit = defineEmits(['update', 'delete', 'search', 'detail', 'terminal', 'terminallog'])
defineProps({
  tableData: {
    default: function() {
      return []
    },
    type: Array
  },
})

// 更新
const handleUpdate = (value) => {
  emit('update', value)
}

// 删除
const handleDelete = (value) => {
  emit('delete', value)
}

// 详情
const handleDetail = (value) => {
  emit('detail', value)
}

// 终端
const handleTerminal = (value, name) => {
  emit('terminal', value, name)
}

// 终端日志
const handleTerminalLogs = (value, name) => {
  emit('terminallog', value, name)
}

// Monitor
const handleMonitor = (value) => {
  emit('monitor', value)
}
</script>
<style scoped>
  .operate-span-primary {
    color: var(--el-color-primary);
    cursor: pointer;
    font-weight:bold;
  }
</style>
