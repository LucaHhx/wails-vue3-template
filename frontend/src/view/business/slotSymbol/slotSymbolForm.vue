<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="机器id:" prop="slotId">
          <el-input v-model.number="formData.slotId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="标签名:" prop="name">
          <el-input v-model="formData.name" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="标签尺寸:" prop="size">
          <el-input v-model="formData.size" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="标签层级:" prop="hierarchy">
          <el-input v-model.number="formData.hierarchy" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="标签层级:" prop="isWild">
        </el-form-item>
        <el-form-item label="替代标签:" prop="sub">
          <el-input v-model="formData.sub" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="翻倍:" prop="multiple">
          <el-input v-model.number="formData.multiple" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="单出是否赢钱:" prop="isSingleWin">
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
  name: 'SlotSymbol'
}
</script>

<script setup>
import {
  createSlotSymbol,
  updateSlotSymbol,
  findSlotSymbol
} from '@/api/slotSymbol'

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
            name: '',
            size: '',
            hierarchy: 0,
            sub: '',
            multiple: 0,
        })
// 验证规则
const rule = reactive({
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
      const res = await findSlotSymbol({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.reslotSymbol
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
               res = await createSlotSymbol(formData.value)
               break
             case 'update':
               res = await updateSlotSymbol(formData.value)
               break
             default:
               res = await createSlotSymbol(formData.value)
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
