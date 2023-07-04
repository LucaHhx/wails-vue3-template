<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="Merchant ID:" prop="merchantId">
          <el-input v-model.number="formData.merchantId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="User ID:" prop="userId">
          <el-input v-model="formData.userId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="Game ID:" prop="gameId">
          <el-input v-model.number="formData.gameId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="Txn ID:" prop="txnId">
          <el-input v-model="formData.txnId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="Platform Txn ID:" prop="platformTxnId">
          <el-input v-model="formData.platformTxnId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="Currency:" prop="currency">
          <el-input v-model="formData.currency" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="Amount:" prop="amount">
          <el-input-number v-model="formData.amount" :precision="2" :clearable="true"></el-input-number>
        </el-form-item>
        <el-form-item label="Before Bal:" prop="beforeBal">
          <el-input-number v-model="formData.beforeBal" :precision="2" :clearable="true"></el-input-number>
        </el-form-item>
        <el-form-item label="After Bal:" prop="afterBal">
          <el-input-number v-model="formData.afterBal" :precision="2" :clearable="true"></el-input-number>
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
  name: 'Txn'
}
</script>

<script setup>
import {
  createTxn,
  updateTxn,
  findTxn
} from '@/api/txn'

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
const route = useRoute()
const router = useRouter()

const type = ref('')
const formData = ref({
            merchantId: 0,
            userId: '',
            gameId: 0,
            txnId: '',
            platformTxnId: '',
            currency: '',
            amount: 0,
            beforeBal: 0,
            afterBal: 0,
        })
// 验证规则
const rule = reactive({
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findTxn({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.retxn
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
               res = await createTxn(formData.value)
               break
             case 'update':
               res = await updateTxn(formData.value)
               break
             default:
               res = await createTxn(formData.value)
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
