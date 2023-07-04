<template>
  <div>
    <el-button type="success" size="small" @click="uploadFunc()">批量上传</el-button>
    <!-- <el-button v-show="false" id="buttonBatch" type="success" size="small" @click="uploadFunc1()">批量上传</el-button> -->
    <!-- :headers="{ 'x-token': userStore.token, 'slot_id': inputSlotId, 'slot_file': inputSlotFile }" -->
    <el-upload
      :action="`${path}/SlotFileUpAndDown/upload`"
      :before-upload="checkFile"
      :headers="{ 'x-token': userStore.token}"
      :on-error="uploadError"
      :on-success="uploadSuccess"
      multiple
      :data="{'file_dir': inputSlotFile }"
      :show-file-list="false"
      class="upload-btn"
      style="padding: 0 6px;"
      :file-list="fileList"
    >
      <el-button v-show="false" id="uploadBatch" size="small" type="primary">选取文件</el-button>
    </el-upload>

  </div>
</template>

<script>

export default {
  name: 'UploadBatch',
  methods: {

  }
}
</script>

<script setup>

import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/pinia/modules/user'

const emit = defineEmits(['on-success'])
const path = ref(import.meta.env.VITE_BASE_API)

const userStore = useUserStore()
const fullscreenLoading = ref(false)

// const inputSlotId = ref(0)
const inputSlotFile = ref(0)

const checkFile = (file) => {
  fullscreenLoading.value = true
  const isJPG = file.type === 'image/jpeg'
  const isPng = file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 0.5
  if (!isJPG && !isPng) {
    ElMessage.error('上传图片只能是 jpg或png 格式!')
    fullscreenLoading.value = false
  }
  if (!isLt2M) {
    ElMessage.error('未压缩的上传图片大小不能超过 500KB，请使用压缩上传')
    fullscreenLoading.value = false
  }
  return (isPng || isJPG) && isLt2M
}

const uploadSuccess = (res) => {
  const { data } = res
  if (data.file) {
    emit('on-success', data.file.url)
  }
}

const uploadError = () => {
  ElMessage({
    type: 'error',
    message: '上传失败'
  })
  fullscreenLoading.value = false
}

const uploadFunc = () => {
  ElMessageBox.prompt(
    '填写文件上传目录，并请确认！',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPlaceholder: '请输入文件地址',
    }
  ).then(async(data) => {
    // console.log('data ', data)
    inputSlotFile.value = data.value
    // console.log('data inputSlotFile', inputSlotFile)
    document.getElementById('uploadBatch').click()
  })
}

const clearFunc = () => {
  ElMessageBox.confirm(
    '该操作将请求刷新游戏服务器所有机器内存配置，请确认',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  )
}

</script>
