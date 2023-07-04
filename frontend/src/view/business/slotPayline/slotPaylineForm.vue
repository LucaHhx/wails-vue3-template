<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="编号:" prop="no">
          <el-input v-model.number="formData.no" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="尺寸规格:" prop="size">
          <el-input v-model="formData.size" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="线数:" prop="num">
          <el-input v-model.number="formData.num" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="划线坐标:" prop="position">
          <el-input v-model="formData.position" :clearable="true" placeholder="请输入" />
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
  name: 'SlotPayline'
}
</script>

<script setup>
import {
  createSlotPayline,
  updateSlotPayline,
  findSlotPayline
} from '@/api/slotPayline'

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
const route = useRoute()
const router = useRouter()

const type = ref('')
const formData = ref({
            no: 0,
            size: '',
            num: 0,
            position: '',
        })
// 验证规则
const rule = reactive({
               no : [{
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
      const res = await findSlotPayline({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.reslotPayline
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
               res = await createSlotPayline(formData.value)
               break
             case 'update':
               res = await updateSlotPayline(formData.value)
               break
             default:
               res = await createSlotPayline(formData.value)
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
