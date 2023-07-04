<template>
  <div>
    <div class="gva-form-box">
      <el-form ref="elFormRef" :model="formData" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="机台编号:" prop="slotId">
          <el-input v-model.number="formData.slotId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="游戏类型:" prop="palyType" />
        <el-form-item label="对象类型:" prop="debugType" />
        <el-form-item label="结果数据:" prop="resultData">
          <el-input v-model="formData.resultData" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="是否启用:" prop="start">
          <el-switch
            v-model="formData.start"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="save">保存</el-button>
          <el-button size="small" type="primary" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DebugConfig',
}
</script>

<script setup>
import {
  createDebugConfig,
  updateDebugConfig,
  findDebugConfig,
} from '@/api/debugConfig'

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'

const route = useRoute()
const router = useRouter()

const type = ref('')
const formData = ref({
  slotId: 0,
  resultData: '',
  start: false,
})
// 验证规则
const rule = reactive({
  slotId: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
  palyType: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
  debugType: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
  start: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
})

const elFormRef = ref()

// 初始化方法
const init = async() => {
  // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
  if (route.query.id) {
    const res = await findDebugConfig({ ID: route.query.id })
    if (res.code === 0) {
      formData.value = res.data.redebugConfig
      type.value = 'update'
    }
  } else {
    type.value = 'create'
  }
}

init()
// 保存按钮
const save = async() => {
  elFormRef.value?.validate(async(valid) => {
    if (!valid) return
    let res
    switch (type.value) {
      case 'create':
        res = await createDebugConfig(formData.value)
        break
      case 'update':
        res = await updateDebugConfig(formData.value)
        break
      default:
        res = await createDebugConfig(formData.value)
        break
    }
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: '创建/更改成功',
      })
    }
  })
}

// 返回按钮
const back = () => {
  router.go(-1)
}

</script>

<style>
</style>
