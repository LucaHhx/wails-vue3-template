<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="名称:" prop="name">
          <el-input v-model="formData.name" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="使用的标签图集:" prop="icon">
          <el-input v-model="formData.icon" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="使用的模糊标签图集:" prop="iconShadow">
          <el-input v-model="formData.iconShadow" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="线数编号:" prop="paylineNo">
          <el-input v-model.number="formData.paylineNo" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="赢钱最大区间:" prop="bigWin">
          <el-input v-model="formData.bigWin" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="机器押注:" prop="betNum">
          <el-input v-model="formData.betNum" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="是否划所有线:" prop="isDrawAllPayline">
        </el-form-item>
        <el-form-item label="划所有线时间:" prop="drawAllPaylineTime">
          <el-input v-model.number="formData.drawAllPaylineTime" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="划所有线间隔:" prop="drawAllPaylineTimeInterval">
          <el-input v-model.number="formData.drawAllPaylineTimeInterval" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="划所有线循环几次:" prop="drawAllPaylineCircle">
          <el-input v-model.number="formData.drawAllPaylineCircle" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="是否划单条线:" prop="isDrawSinglePayline">
        </el-form-item>
        <el-form-item label="每条线划线时间:" prop="drawSinglePaylineTime">
          <el-input v-model.number="formData.drawSinglePaylineTime" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="每条线划线间隔:" prop="drawSinglePaylineTimeInterval">
          <el-input v-model.number="formData.drawSinglePaylineTimeInterval" :clearable="true" placeholder="请输入" />
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
  name: 'Slot'
}
</script>

<script setup>
import {
  createSlot,
  updateSlot,
  findSlot
} from '@/api/slot'

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
            icon: '',
            iconShadow: '',
            paylineNo: 0,
            bigWin: '',
            betNum: '',
            drawAllPaylineTime: 0,
            drawAllPaylineTimeInterval: 0,
            drawAllPaylineCircle: 0,
            drawSinglePaylineTime: 0,
            drawSinglePaylineTimeInterval: 0,
        })
// 验证规则
const rule = reactive({
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findSlot({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.reslot
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
               res = await createSlot(formData.value)
               break
             case 'update':
               res = await updateSlot(formData.value)
               break
             default:
               res = await createSlot(formData.value)
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
