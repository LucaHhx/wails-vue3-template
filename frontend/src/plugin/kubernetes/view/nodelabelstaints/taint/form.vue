<template>
  <div style="overflow: hidden;width: 100%;">
    <el-form ref="FormBlock" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="名称" prop="metadata.name">
        <el-input v-if="OptionType === 'update'" v-model="formData.metadata.name" disabled autocomplete="off" />
        <el-input v-else v-model="formData.metadata.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="污点" prop="spec.taints">
        <table style="width: 98%" class="tab-table">
          <tr>
            <th scope="col" width="40%" align="left">
              <label>键</label>
            </th>
            <th scope="col" width="40%" align="left">
              <label>值</label>
            </th>
            <th scope="col" width="40%" align="left">
              <label>effect</label>
            </th>
            <th align="left" />
          </tr>
          <tr v-for="(row, index) in taints" :key="index">
            <td>
              <el-input v-model="row.key" placeholder="请输入键" />
            </td>
            <td>
              <el-input v-model="row.value" placeholder="请输入值" />
            </td>
            <td>
              <el-select v-model="row.effect" filterable placeholder="请选择">
                <!--options是一个一个对象，通过res传进来的-->
                <el-option
                  v-for="item in EffectList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </td>
            <td>
              <el-button type="danger" link icon="delete" size="small" @click="handleDelete(index)">删除</el-button>
            </td>
          </tr>
          <tr>
            <td align="left">
              <el-button size="small" type="primary" link icon="plus" @click="handleAdd">添加</el-button>
            </td>
          </tr>
        </table>
      </el-form-item>
    </el-form>
    <div class="dialog-footer" align="right">
      <el-button size="small" @click="closeDialog">取 消</el-button>
      <el-button size="small" type="primary" @click="enterDialog">确 定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormBlock',
  emits: {
    close: () => {
      return true
    },
    enter: (value) => {
      if (value.length === 1) {
        return true
      } else {
        return false
      }
    },
  }
}
</script>
<script setup>
import { ref } from 'vue'
const emit = defineEmits(['close', 'enter'])
const props = defineProps({
  form: {
    default: function() {
      return {}
    },
    type: Object
  },
  optype: {
    default: function() {
      return ''
    },
    type: String
  }
})

const rules = ref({
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
})

// 标签格式化
const taints = ref([])
const EffectList = ref([{ 'name': 'NoSchedule' }, { 'name': 'NoExecute' }, { 'name': 'PreferNoSchedule' }])
const handleTaintFormatInit = () => {
  if (formData.value.spec.taints) {
    for (const key in formData.value.spec.taints) {
      taints.value.push({
        index: Math.random(),
        effect: formData.value.spec.taints[key].effect,
        key: formData.value.spec.taints[key].key,
        value: formData.value.spec.taints[key].value,
      })
    }
  }
}

// 表单数据初始化
const formData = ref({})
const OptionType = ref(false)
const GetFormData = () => {
  formData.value = props.form
  OptionType.value = props.optype
  handleTaintFormatInit()
}

GetFormData()

// 关闭
const closeDialog = () => {
  emit('close')
}

// 添加标签
const handleAdd = () => {
  const item = {
    index: Math.random(),
    key: '',
    effect: '',
    value: '',
  }
  taints.value.push(item)
}

// 删除标签
const handleDelete = (index) => {
  taints.value.splice(index, 1)
}

// 标签格式化
const handleTaintFormat = () => {
  if (taints.value.length > 0) {
    formData.value.spec.taints = taints.value
  } else {
    delete formData.value.spec.taints
  }
}

// 校验并提交
const enterDialog = async() => {
  await handleTaintFormat()
  emit('enter', formData.value)
}
</script>
<style scoped>

</style>
