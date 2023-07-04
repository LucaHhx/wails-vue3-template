<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="机器id:" prop="slotId">
          <el-input v-model.number="formData.slotId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="显示区域:" prop="size">
          <el-input v-model="formData.size" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="显示几个格子:" prop="num">
          <el-input v-model.number="formData.num" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="格子间距:" prop="space">
          <el-input v-model.number="formData.space" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="转动速度:" prop="speed">
          <el-input v-model.number="formData.speed" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="停止时间:" prop="stopTime">
          <el-input v-model.number="formData.stopTime" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="滚动回弹节奏:" prop="spring">
          <el-input v-model="formData.spring" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="普通标签排布:" prop="data">
          <el-input v-model="formData.data" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="普通标签权重1:" prop="weightData1">
          <el-input v-model="formData.weightData1" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="普通标签权重2:" prop="weightData2">
          <el-input v-model="formData.weightData2" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="普通标签权重3:" prop="weightData3">
          <el-input v-model="formData.weightData3" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="免费标签排布:" prop="fsData">
          <el-input v-model="formData.fsData" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="免费标签权重1:" prop="fsWeightData1">
          <el-input v-model="formData.fsWeightData1" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="免费标签权重2:" prop="fsWeightData2">
          <el-input v-model="formData.fsWeightData2" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="免费标签权重3:" prop="fsWeightData3">
          <el-input v-model="formData.fsWeightData3" :clearable="true" placeholder="请输入" />
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
  name: 'SlotReel'
}
</script>

<script setup>
import {
  createSlotReel,
  updateSlotReel,
  findSlotReel
} from '@/api/slotReel'

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
            size: '',
            num: 0,
            space: 0,
            speed: 0,
            stopTime: 0,
            spring: '',
            data: '',
            weightData1: '',
            weightData2: '',
            weightData3: '',
            fsData: '',
            fsWeightData1: '',
            fsWeightData2: '',
            fsWeightData3: '',
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
      const res = await findSlotReel({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.reslotReel
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
               res = await createSlotReel(formData.value)
               break
             case 'update':
               res = await updateSlotReel(formData.value)
               break
             default:
               res = await createSlotReel(formData.value)
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
