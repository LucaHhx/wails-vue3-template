<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="用户编号:" prop="userId">
          <el-input v-model.number="formData.userId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="用户金额:" prop="amount">
          <el-input v-model.number="formData.amount" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="押注:" prop="bet">
          <el-input v-model.number="formData.bet" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="机器id:" prop="slotId">
          <el-input v-model.number="formData.slotId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="结果数据:" prop="resultData">
          <el-input v-model="formData.resultData" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="百搭数据:" prop="wildData">
          <el-input v-model="formData.wildData" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="奖池编号:" prop="jackpotNo">
          <el-input v-model.number="formData.jackpotNo" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="赢钱组合编号:" prop="payTableNo">
          <el-input v-model.number="formData.payTableNo" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="赢钱金额:" prop="gain">
          <el-input v-model.number="formData.gain" :clearable="true" placeholder="请输入" />
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
  name: 'SlotRecord'
}
</script>

<script setup>
import {
  createSlotRecord,
  updateSlotRecord,
  findSlotRecord
} from '@/api/slotRecord'

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
const route = useRoute()
const router = useRouter()

const type = ref('')
const formData = ref({
            userId: 0,
            amount: 0,
            bet: 0,
            slotId: 0,
            resultData: '',
            wildData: '',
            jackpotNo: 0,
            payTableNo: 0,
            gain: 0,
        })
// 验证规则
const rule = reactive({
               userId : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               slotId : [{
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
      const res = await findSlotRecord({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.reRecord
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
               res = await createSlotRecord(formData.value)
               break
             case 'update':
               res = await updateSlotRecord(formData.value)
               break
             default:
               res = await createSlotRecord(formData.value)
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
