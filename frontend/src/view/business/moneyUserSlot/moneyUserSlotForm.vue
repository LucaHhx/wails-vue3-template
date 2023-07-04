<template>
  <div>
    <div class="gva-form-box">
      <el-form ref="elFormRef" :model="formData" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="日期:" prop="date">
          <el-input v-model="formData.date" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="用户编号:" prop="userId">
          <el-input v-model.number="formData.userId" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="机器编号:" prop="slotId">
          <el-input v-model.number="formData.slotId" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="押注合计:" prop="sumBet">
          <el-input v-model.number="formData.sumBet" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="赢钱合计:" prop="sumGain">
          <el-input v-model.number="formData.sumGain" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="押注次数:" prop="countBet">
          <el-input v-model.number="formData.countBet" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="赢钱次数:" prop="countGain">
          <el-input v-model.number="formData.countGain" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="破产次数:" prop="countBk">
          <el-input v-model.number="formData.countBk" disabled :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <!-- <el-button size="small" type="primary" @click="save">保存</el-button> -->
          <el-button size="small" type="primary" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MoneyUserSlot'
}
</script>

<script setup>
import {
  createMoneyUserSlot,
  updateMoneyUserSlot,
  findMoneyUserSlot
} from '@/api/moneyUserSlot'

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
const route = useRoute()
const router = useRouter()

const type = ref('')
const formData = ref({
  date: '',
  userId: 0,
  slotId: 0,
  sumBet: 0,
  sumGain: 0,
  countBet: 0,
  countGain: 0,
  countBk: 0,
})
// 验证规则
const rule = reactive({
  date: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
  userId: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
  slotId: [{
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
    const res = await findMoneyUserSlot({ ID: route.query.id })
    if (res.code === 0) {
      formData.value = res.data.remoneyUserSlot
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
            res = await createMoneyUserSlot(formData.value)
            break
          case 'update':
            res = await updateMoneyUserSlot(formData.value)
            break
          default:
            res = await createMoneyUserSlot(formData.value)
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
