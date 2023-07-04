<template>
  <div>
    <div class="gva-form-box">
      <el-form ref="elFormRef" class="demo-input-size" :model="formData" label-position="right" :rules="rule" label-width="120px">
        <el-col :span="4">
          <el-form-item label="Name:" prop="name" :span="4">
            <el-input v-model="formData.name" :clearable="true" placeholder="Please enter" disabled />
          </el-form-item>
        </el-col>
        <el-form-item label="Currency:" prop="currency">
          <el-input v-model="formData.currency" :clearable="true" placeholder="Please enter" disabled />
        </el-form-item>
        <el-form-item label="Type:" prop="type">
          <el-tag :type="statusTags[formData.type]" effect="dark">
            {{ statusOpts[formData.type] }}
          </el-tag>
        </el-form-item>
        <el-form-item label="Api Url:" prop="apiUrl">
          <el-input v-model="formData.apiUrl" :clearable="true" placeholder="Please enter" disabled />
        </el-form-item>
        <el-form-item label="AppKey:" prop="appkey">
          <el-input v-model="formData.appkey" :clearable="true" placeholder="Please enter" disabled />
        </el-form-item>
        <el-form-item label="Secret:" prop="secret">
          <el-input v-model="formData.secret" :clearable="true" placeholder="Please enter" disabled />
        </el-form-item>
        <el-form-item label="Status:" prop="status">
          <el-tag :type="statusTags[formData.status]" effect="dark">
            {{ statusOpts[formData.status] }}
          </el-tag>
        </el-form-item>
        <el-form-item>
          <!-- <el-button size="small" type="primary" @click="save">Save</el-button> -->
          <!-- <el-button size="small" type="primary" @click="back">返回</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Merchant',
  data() {
    return {
      statusTags: { 0: 'warning', 1: 'success', 2: 'info', 3: 'primary', 4: 'danger', 9: 'danger' },
      defaultStatus: { 1: 'Normal', 2: 'Close', 9: 'Abnormal' },
      typeOpts: { 1: 'Normal', 2: 'Close' },
      statusOpts: { 1: 'Normal', 2: 'Close' },
    }
  }
}
</script>

<script setup>
import {
  createMerchant,
  updateMerchant,
  findMerchant
} from '@/api/merchant'

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
import { useUserStore } from '@/pinia/modules/user'
const route = useRoute()
const router = useRouter()

const type = ref('')
const formData = ref({
  name: '',
  currency: '',
  apiUrl: '',
  appkey: '',
  secret: '',
})
// 验证规则
const rule = reactive({
  name: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
  currency: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
  type: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
})

const elFormRef = ref()
const userStore = useUserStore()
console.log(userStore.userInfo)

// 初始化方法
const init = async() => {
  // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
  // if (route.query.id) {
  const res = await findMerchant({ ID: userStore.userInfo.merchantId })
  if (res.code === 0) {
    formData.value = res.data.remerchant
    type.value = 'update'
  }
  // } else {
  //   type.value = 'create'
  // }
}

init()
// 保存按钮
const save = async() => {
      elFormRef.value?.validate(async(valid) => {
        if (!valid) return
        let res
        switch (type.value) {
          case 'create':
            res = await createMerchant(formData.value)
            break
          case 'update':
            res = await updateMerchant(formData.value)
            break
          default:
            res = await createMerchant(formData.value)
            break
        }
        if (res.code === 0) {
          ElMessage({
            type: 'success',
            message: 'Change successfully'
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
