<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="机器id:" prop="slotId">
          <el-input v-model.number="formData.slotId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="类型:" prop="type">
        </el-form-item>
        <el-form-item label="组合1:" prop="combine1">
          <el-input v-model="formData.combine1" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="组合1数量:" prop="combineNum1">
          <el-input v-model.number="formData.combineNum1" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="组合2:" prop="combine2">
          <el-input v-model="formData.combine2" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="组合2数量:" prop="combineNum2">
          <el-input v-model.number="formData.combineNum2" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="赢钱倍数:" prop="winMultiple">
          <el-input v-model.number="formData.winMultiple" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="状态:" prop="status">
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
  name: 'SlotPayTable'
}
</script>

<script setup>
import {
  createSlotPayTable,
  updateSlotPayTable,
  findSlotPayTable
} from '@/api/slotPayTable'

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
const route = useRoute()
const router = useRouter()

const type = ref('')
const formData = ref({
            slotId: 0,
            combine1: '',
            combineNum1: 0,
            combine2: '',
            combineNum2: 0,
            winMultiple: 0,
        })
// 验证规则
const rule = reactive({
               slotId : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               type : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findSlotPayTable({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.reslotPayTable
        type.value = 'update'
      }
    } else {
      type.value = 'create'
    }
}

init()
// 保存按钮
const save = async() => {
      elFormRef.value?.validate( async (valid) => {
         if (!valid) return
            let res
           switch (type.value) {
             case 'create':
               res = await createSlotPayTable(formData.value)
               break
             case 'update':
               res = await updateSlotPayTable(formData.value)
               break
             default:
               res = await createSlotPayTable(formData.value)
               break
           }
           if (res.code === 0) {
             ElMessage({
               type: 'success',
               message: '创建/更改成功'
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
