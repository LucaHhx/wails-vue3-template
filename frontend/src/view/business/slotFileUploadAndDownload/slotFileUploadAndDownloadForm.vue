<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="文件名:" prop="name">
          <el-input v-model="formData.name" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="文件地址:" prop="url">
          <el-input v-model="formData.url" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="文件标签:" prop="tag">
          <el-input v-model="formData.tag" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="文件编号:" prop="key">
          <el-input v-model="formData.key" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="图片类型:" prop="type">
          <el-input v-model.number="formData.type" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="机器id:" prop="slotId">
          <el-input v-model.number="formData.slotId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="规格:" prop="specification">
          <el-input v-model.number="formData.specification" :clearable="true" placeholder="请输入" />
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
  name: 'SlotFileUploadAndDownload'
}
</script>

<script setup>
import {
  createSlotFileUploadAndDownload,
  updateSlotFileUploadAndDownload,
  findSlotFileUploadAndDownload
} from '@/api/slotFileUploadAndDownload'

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
const route = useRoute()
const router = useRouter()

const type = ref('')
const formData = ref({
            name: '',
            url: '',
            tag: '',
            key: '',
            type: 0,
            slotId: 0,
            specification: 0,
        })
// 验证规则
const rule = reactive({
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findSlotFileUploadAndDownload({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.reSlotFileUpAndDown
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
               res = await createSlotFileUploadAndDownload(formData.value)
               break
             case 'update':
               res = await updateSlotFileUploadAndDownload(formData.value)
               break
             default:
               res = await createSlotFileUploadAndDownload(formData.value)
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
