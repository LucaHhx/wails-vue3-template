<template>
  <div>
    <div class="gva-form-box">
      <el-form
        ref="elFormRef"
        :model="formData"
        label-position="right"
        :rules="rule"
        label-width="80px"
      >
        <el-form-item label="创建时间:" prop="date">
          <el-input
            v-model="formData.date"
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="用户编号:" prop="userId">
          <el-input
            v-model.number="formData.userId"
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="操作类型:" prop="action">
          <el-input
            v-model.number="formData.action"
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="子类型:" prop="actionType">
          <el-input
            v-model.number="formData.actionType"
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="初始金币:" prop="coinInitial">
          <el-input
            v-model.number="formData.coinInitial"
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="金币变化:" prop="coinChange">
          <el-input
            v-model.number="formData.coinChange"
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="金币结果:" prop="coinResult">
          <el-input
            v-model.number="formData.coinResult"
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="游戏编号:" prop="gameId">
          <el-input
            v-model.number="formData.gameId"
            :clearable="true"
            placeholder="请输入"
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
  name: 'MoneyLog',
}
</script>

<script setup>
import { createMoneyLog, updateMoneyLog, findMoneyLog } from '@/api/moneyLog'

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
  action: 0,
  actionType: 0,
  coinInitial: 0,
  coinChange: 0,
  coinResult: 0,
  gameId: 0,
})
// 验证规则
const rule = reactive({
  date: [
    {
      required: true,
      message: '',
      trigger: ['input', 'blur'],
    },
  ],
  userId: [
    {
      required: true,
      message: '',
      trigger: ['input', 'blur'],
    },
  ],
  action: [
    {
      required: true,
      message: '',
      trigger: ['input', 'blur'],
    },
  ],
})

const elFormRef = ref()

// 初始化方法
const init = async() => {
  // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
  if (route.query.id) {
    const res = await findMoneyLog({ ID: route.query.id })
    if (res.code === 0) {
      formData.value = res.data.remoneyLog
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
        res = await createMoneyLog(formData.value)
        break
      case 'update':
        res = await updateMoneyLog(formData.value)
        break
      default:
        res = await createMoneyLog(formData.value)
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

<style></style>
