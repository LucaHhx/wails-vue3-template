<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="日期:" prop="date">
          <el-input v-model="formData.date" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="机器编号:" prop="slotId">
          <el-input v-model.number="formData.slotId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="消耗金币:" prop="coinReduce">
          <el-input v-model.number="formData.coinReduce" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="产出金币:" prop="coinIncrease">
          <el-input v-model.number="formData.coinIncrease" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="返还比:" prop="rtpRatio">
          <el-input-number v-model="formData.rtpRatio" :precision="2" :clearable="true"></el-input-number>
        </el-form-item>
        <el-form-item label="游玩人数:" prop="recentPlayers">
          <el-input v-model.number="formData.recentPlayers" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="Spin次数:" prop="recentSpins">
          <el-input v-model.number="formData.recentSpins" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="平均Spin次数:" prop="avgSpins">
          <el-input v-model.number="formData.avgSpins" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="破产人数:" prop="bkrpPeoples">
          <el-input v-model.number="formData.bkrpPeoples" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="破产次数:" prop="bkrpTimes">
          <el-input v-model.number="formData.bkrpTimes" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="破产充值次数:" prop="bkrpAddTimes">
          <el-input v-model.number="formData.bkrpAddTimes" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="破产充值金额:" prop="bkrpAddAmount">
          <el-input v-model.number="formData.bkrpAddAmount" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="充值人数:" prop="topUpPeoples">
          <el-input v-model.number="formData.topUpPeoples" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="充值次数:" prop="topUpTimes">
          <el-input v-model.number="formData.topUpTimes" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="充值金额:" prop="topUpAmount">
          <el-input v-model.number="formData.topUpAmount" :clearable="true" placeholder="请输入" />
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
  name: 'MoneySlot'
}
</script>

<script setup>
import {
  createMoneySlot,
  updateMoneySlot,
  findMoneySlot
} from '@/api/moneySlot'

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
const route = useRoute()
const router = useRouter()

const type = ref('')
const formData = ref({
            date: '',
            slotId: 0,
            coinReduce: 0,
            coinIncrease: 0,
            rtpRatio: 0,
            recentPlayers: 0,
            recentSpins: 0,
            avgSpins: 0,
            bkrpPeoples: 0,
            bkrpTimes: 0,
            bkrpAddTimes: 0,
            bkrpAddAmount: 0,
            topUpPeoples: 0,
            topUpTimes: 0,
            topUpAmount: 0,
        })
// 验证规则
const rule = reactive({
               date : [{
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
      const res = await findMoneySlot({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.remoneySlot
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
               res = await createMoneySlot(formData.value)
               break
             case 'update':
               res = await updateMoneySlot(formData.value)
               break
             default:
               res = await createMoneySlot(formData.value)
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
