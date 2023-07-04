<template>
  <div>
    <div class="gva-form-box">
      <el-form ref="elFormRef" :model="formData" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="时间:" prop="date">
          <el-input v-model="formData.date" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="玩家ID:" prop="userId">
          <el-input v-model.number="formData.userId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="玩家名称:" prop="userName">
          <el-input v-model="formData.userName" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="注册时间:" prop="regTime">
          <el-date-picker v-model="formData.regTime" type="date" placeholder="选择日期" :clearable="true" />
        </el-form-item>
        <el-form-item label="用户金额:" prop="amount">
          <el-input v-model.number="formData.amount" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="当天Spin次数:" prop="spinDay">
          <el-input v-model.number="formData.spinDay" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="常用押注金额:" prop="betCommon">
          <el-input v-model.number="formData.betCommon" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="押注消耗:" prop="betAmount">
          <el-input v-model.number="formData.betAmount" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="赢钱金额:" prop="gainAmount">
          <el-input v-model.number="formData.gainAmount" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="最后游玩机台:" prop="lastStand">
          <el-input v-model.number="formData.lastStand" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="最后游玩时间:" prop="lastPalyTime">
          <el-date-picker v-model="formData.lastPalyTime" type="date" placeholder="选择日期" :clearable="true" />
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
  name: 'MoneyUser'
}
</script>

<script setup>
import {
  createMoneyUser,
  updateMoneyUser,
  findMoneyUser
} from '@/api/moneyUser'

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
  userName: '',
  regTime: new Date(),
  amount: 0,
  spinDay: 0,
  betCommon: 0,
  betAmount: 0,
  gainAmount: 0,
  lastStand: 0,
  lastPalyTime: new Date(),
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
  userName: [{
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
    const res = await findMoneyUser({ ID: route.query.id })
    if (res.code === 0) {
      formData.value = res.data.reMoneyUser
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
            res = await createMoneyUser(formData.value)
            break
          case 'update':
            res = await updateMoneyUser(formData.value)
            break
          default:
            res = await createMoneyUser(formData.value)
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
