<template>
  <div>
    <div class="gva-search-box">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline" @keyup.enter="onSubmit">
        <el-form-item label="创建时间:" prop="betweenTime">
          <el-date-picker
            v-model="searchInfo.betweenTime"
            type="datetimerange"
            :shortcuts="shortcuts"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            format="YYYY-MM-DD HH:mm"
            value-format="YYYYMMDDHHmmss"
          />
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="searchInfo.name" placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="线数编号">
          <el-input v-model.number="searchInfo.paylineNo" placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchInfo.status" :clearable="true" filterable placeholder="请选择">
            <el-option v-for="v,k in statusOpts" :key="k" :label="v" :value="parseInt(k)" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" icon="search" @click="onSubmit">查询</el-button>
          <el-button size="small" icon="refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button size="small" type="primary" icon="download" @click="exportExcel">导出</el-button>
        <el-button type="success" icon="upload" size="small" @click="uploadFunc()">导入</el-button>
        <el-upload
          action=""
          class="excel-btn"
          :headers="{'x-token':useUserStore.token}"
          :show-file-list="false"
          :before-upload="upload"
          accept=".xlsx,.xls"
          style="padding: 0 6px;"
        >
          <el-button v-show="false" id="upload1" size="small" type="success" icon="upload">导入</el-button>
        </el-upload>
        <el-button size="small" type="primary" icon="plus" @click="openDialog">新增</el-button>
        <el-button size="small" type="primary" icon="delete" @click="clearFunc">刷新游戏缓存</el-button>
        <el-popover v-model:visible="deleteVisible" placement="top" width="160">
          <p>确定要删除吗？</p>
          <div style="text-align: right; margin-top: 8px;">
            <el-button size="small" type="primary" link @click="deleteVisible = false">取消</el-button>
            <el-button size="small" type="primary" @click="onDelete">确定</el-button>
          </div>
          <template #reference>
            <el-button
              icon="delete"
              size="small"
              style="margin-left: 10px;"
              :disabled="!multipleSelection.length"
              @click="deleteVisible = true"
            >删除
            </el-button>
          </template>
        </el-popover>
      </div>
      <el-table
        ref="multipleTable"
        style="width: 100%"
        tooltip-effect="dark"
        :data="tableData"
        row-key="ID"
        border
        @selection-change="handleSelectionChange"
        @sort-change="sortChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column align="left" label="ID" prop="ID" sortable="custom" width="90" />
        <el-table-column align="left" label="名称" prop="name" width="130" />
        <el-table-column align="left" label="url" prop="url" width="130" />
        <!-- <el-table-column align="left" label="使用的标签图集" prop="icon" width="130" /> -->
        <!-- <el-table-column align="left" label="使用的模糊标签图集" prop="iconShadow" width="160" /> -->
        <el-table-column align="left" label="payline编号" prop="paylineNo" width="100" />
        <el-table-column align="left" label="赢钱最大区间" prop="bigWin" width="140">
          <template #default="scope">
            <el-popover placement="top" width="160" trigger="hover">
              <p>{{ scope.row.bigWin }}</p>
              <template #reference>
                <div type="text" size="mini">
                  {{ scope.row.bigWin ? scope.row.bigWin.slice(0, 15) + '...' : '' }}
                </div>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column align="left" label="机器押注" prop="betNum" width="140">
          <template #default="scope">
            <el-popover placement="top" width="160" trigger="hover">
              <p>{{ scope.row.betNum }}</p>
              <template #reference>
                <div type="text" size="mini">
                  {{ scope.row.betNum ? scope.row.betNum.slice(0, 15) + '...' : '' }}
                </div>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column align="left" label="加注比例" prop="raise" width="120" />
        <el-table-column align="left" label="购买Free比例" prop="buyFreeSpin" width="120" />
        <el-table-column align="left" label="购买Re比例" prop="buyReSpin" width="120" />
        <el-table-column align="left" label="最高倍率" prop="topMul" width="120" />
        <el-table-column align="left" label="是否划所有线" prop="isDrawAllPayline" width="110">
          <template #default="scope">
            <el-tag size="small" :type="statusTags[scope.row.isDrawAllPayline]" effect="dark">
              {{ scope.row.isDrawAllPayline === 0 ? '未知' : isDrawAllPaylineOpts[scope.row.isDrawAllPayline] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label="jackpot规则" prop="jackpotRule" width="120" />
        <el-table-column align="left" label="划所有线时间" prop="drawAllPaylineTime" width="120" />
        <el-table-column align="left" label="划所有线间隔" prop="drawAllPaylineTimeInterval" width="120" />
        <el-table-column align="left" label="划所有线循环几次" prop="drawAllPaylineCircle" width="160" />
        <el-table-column align="left" label="是否划单条线" prop="isDrawSinglePayline" width="110">
          <template #default="scope">
            <el-tag size="small" :type="statusTags[scope.row.isDrawSinglePayline]" effect="dark">
              {{
                scope.row.isDrawSinglePayline === 0 ? '未知' : isDrawSinglePaylineOpts[scope.row.isDrawSinglePayline]
              }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label="每条线划线时间" prop="drawSinglePaylineTime" width="130" />
        <el-table-column align="left" label="每条线划线间隔" prop="drawSinglePaylineTimeInterval" width="130" />
        <el-table-column align="left" label="状态" prop="status" width="65">
          <template #default="scope">
            <el-tag size="small" :type="statusTags[scope.row.status]" effect="dark">
              {{ statusOpts[scope.row.status] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label="创建时间" width="180">
          <template #default="scope">{{ scope.row.CreatedAt }}</template>
        </el-table-column>
        <el-table-column align="left" label="更新时间" width="180">
          <template #default="scope">{{ scope.row.UpdatedAt }}</template>
        </el-table-column>
        <el-table-column align="left" label="按钮组" width="130" fixed="right">
          <template #default="scope">
            <el-button
              type="primary"
              link
              icon="edit"
              size="small"
              class="table-button"
              @click="updateSlotFunc(scope.row)"
            >变更
            </el-button>
            <el-button type="primary" link icon="delete" size="small" @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="gva-pagination">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="page"
          :page-size="pageSize"
          :page-sizes="[10, 30, 50, 100]"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
    <el-dialog v-model="dialogFormVisible" :before-close="closeDialog" title="弹窗操作">
      <el-form ref="elFormRef" :model="formData" label-position="right" :rules="rule" label-width="150px">
        <el-form-item label="名称:" prop="name">
          <el-input v-model="formData.name" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="url:" prop="url">
          <el-input v-model="formData.url" :clearable="true" placeholder="url" />
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
          <el-input v-model="formData.betNum" :clearable="true" placeholder="整数 使用英文逗号隔开" />
        </el-form-item>
        <el-form-item label="加注比例:" prop="betNum">
          <el-input v-model="formData.raise" :clearable="true" placeholder="小数" />
        </el-form-item>
        <el-form-item label="购买Free比例:" prop="betNum">
          <el-input v-model="formData.buyFreeSpin" :clearable="true" placeholder="小数" />
        </el-form-item>
        <el-form-item label="购买Re比例:" prop="betNum">
          <el-input v-model="formData.buyReSpin" :clearable="true" placeholder="小数" />
        </el-form-item>
        <el-form-item label="最高倍率:" prop="betNum">
          <el-input v-model.number="formData.topMul" :clearable="true" placeholder="小数" />
        </el-form-item>
        <el-form-item label="是否划所有线:" prop="isDrawAllPayline">
          <el-select v-model="formData.isDrawAllPayline" placeholder="请选择" style="width:25%">
            <el-option v-for="v,k in isDrawAllPaylineOpts" :key="k" :label="v" :value="parseInt(k)" />
          </el-select>
        </el-form-item>
        <el-form-item label="jackpot规则:" prop="jackpotRule">
          <el-input v-model="formData.jackpotRule" :clearable="true" placeholder="jackpotid 整数 使用英文逗号隔开" />
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
          <el-select v-model="formData.isDrawSinglePayline" placeholder="请选择" style="width:25%">
            <el-option v-for="v,k in isDrawSinglePaylineOpts" :key="k" :label="v" :value="parseInt(k)" />
          </el-select>
        </el-form-item>
        <el-form-item label="每条线划线时间:" prop="drawSinglePaylineTime">
          <el-input v-model.number="formData.drawSinglePaylineTime" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="每条线划线间隔:" prop="drawSinglePaylineTimeInterval">
          <el-input v-model.number="formData.drawSinglePaylineTimeInterval" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-select v-model="formData.status" placeholder="请选择" style="width:25%">
            <el-option v-for="v,k in statusOpts" :key="k" :label="v" :value="parseInt(k)" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="small" @click="closeDialog">取 消</el-button>
          <el-button size="small" type="primary" @click="enterDialog">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Slot',
  data() {
    return {
      statusTags: { 0: 'warning', 1: 'success', 2: 'info', 3: 'primary', 4: 'danger', 9: 'danger' },
      defaultStatus: { 1: '正常', 2: '关闭', 9: '异常' },
      statusOpts: { 1: '开启', 2: '关闭' },
      isDrawSinglePaylineOpts: { 1: '是', 2: '否' },
      isDrawAllPaylineOpts: { 1: '是', 2: '否' },
      updateslotId: 0,
    }
  },
}
</script>

<script setup>
import {
  createSlot,
  deleteSlot,
  deleteSlotByIds,
  updateSlot,
  findSlot,
  getSlotList,
  updateAllConfig,
  backendOperate,
} from '@/api/slot'

// 全量引入格式化工具 请按需保留
import { getDictFunc, formatDate, formatBoolean, filterDict, formatObjKey } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'
import { getShortcuts } from '@/utils/date'
import { arrIsRepeat } from '@/utils/helper'
import { toSQLLine } from '@/utils/stringFun'
import { exportFile, readExcel } from '@/utils/excel'
import { useUserStore } from '@/pinia/modules/user'

// 自动化生成的字典（可能为空）以及字段
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
  isDrawAllPayline: 1,
  isDrawSinglePayline: 1,
  status: 1,
  raise: 0,
  buyFreeSpin: 0,
  buyReSpin: 0,
  topMul: 0,

})

// 验证规则
const rule = reactive({})

const elFormRef = ref()

// =========== 表格控制部分 ===========
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const searchInfo = ref({})

const shortcuts = getShortcuts()
// const updateslotId = ref(0)
const updatePaylineNo = ref(0)

// 排序
const sortChange = ({ prop, order }) => {
  if (prop) {
    searchInfo.value.sort = toSQLLine(prop)
    searchInfo.value.order = order
    getTableData()
  }
}

// 重置
const onReset = () => {
  searchInfo.value = {}
  getTableData()
}

// 搜索
const onSubmit = () => {
  page.value = 1
  pageSize.value = 10
  getTableData()
}

// 分页
const handleSizeChange = (val) => {
  pageSize.value = val
  getTableData()
}

// 修改页面容量
const handleCurrentChange = (val) => {
  page.value = val
  getTableData()
}

const formatUploadData = (data, map) => {
  if (!data) {
    return []
  }
  data = data.slice(2)
  data = formatObjKey(map, data, false)
  return data
}

const formatSlotData = (data) => {
  // 去除非当前slotid的数据
  // data = data.filter(v => v.id === updateslotId.value)
  const map = {
    SlotName: 'name',
    IsOpen: 'status',
    SlotIcon: 'icon',
    SlotIconShadow: 'iconShadow',
    PaylineNo: 'paylineNo',
    BigWin: 'bigWin',
    BetNum: 'betNum',
    ExtraBetNum: 'raise',
    BuyFreeSpin: 'buyFreeSpin',
    BuyReSpin: 'buyReSpin',
    IsDrawAllPayline: 'isDrawAllPayline',
    DrawAllPaylineTime: 'drawAllPaylineTime',
    DrawAllPaylineTimeInterval: 'drawAllPaylineTimeInterval',
    DrawAllPaylineCircle: 'drawAllPaylineCircle',
    IsDrawSinglePayline: 'isDrawSinglePayline',
    DrawSinglePaylineTime: 'drawSinglePaylineTime',
    DrawSinglePaylineTimeInterval: 'drawSinglePaylineTimeInterval',
    JackpotRule: 'jackpotRule',
    TopMul: 'topMul',
  }
  data = formatUploadData(data, map)
  if (data.length > 0) {
    // updatePaylineNo.value = data[0].paylineNo
  }
  // if (arrIsRepeat(data.map(v => v.id))) {
  //   return 'slot表id重复'
  // }
  data.forEach((v) => {
    v.raise = parseFloat(v.raise)
  })
  return data
}

const formatReelDataFormat = (data) => {
  var reelData = []
  var slotid = 0
  var rindex = 0
  for (let index = 0; index < data.length; index++) {
    if (slotid !== data[index].slotId) {
      slotid = data[index].slotId
      rindex = index
    }

    var nums = []
    const element = data[index]
    for (const rd in element) {
      if (rd === 'slotId') {
        continue
      }
      const num1 = rd.replace(/[^\d]/g, '')
      if (num1 > 0 && !nums.includes(num1)) {
        nums.push(num1)
        reelData.push({
          slotId: element.slotId,
          weightData: element['weightData' + num1],
          reelData: element['data' + num1],
          fsWeight: element['fsWeightData' + num1],
          fsReelData: element['fsData' + num1],
          group: index - rindex + 1,
          which: +num1,
          demo: element.demo,
        })
      }
    }
  }
  return reelData
}

const formatSlotReelData = (data, demoData) => {
  // data = data.filter(v => v.slotId === updateslotId.value)
  const map = {
    SlotId: 'slotId',
    ReelSize: 'size',
    ReelNum: 'num',
    ReelSpace: 'space',
    ReelSpeed: 'speed',
    ReelStopTime: 'stopTime',
    ReelSpring: 'spring',
    demo: 'demo',
  }
  const map1 = {
    SlotId: 'slotId',
    demo: 'demo',
  }
  for (let index = 0; index < 30; index++) {
    map1['WeightData' + index.toString()] = 'weightData' + index.toString()
    map1['ReelData' + index.toString()] = 'data' + index.toString()
    map1['FSWeightData' + index.toString()] = 'fSWeightData' + index.toString()
    map1['FSReelData' + index.toString()] = 'fsData' + index.toString()
  }
  data.forEach((v) => {
    // 非demo
    v.demo = 2
  })
  demoData.forEach((v) => {
    // demo
    v.demo = 1
  })
  // 合并demo和非demo
  data = data.concat(demoData.slice(2))

  var data1 = formatUploadData(data, map)
  var data2 = formatUploadData(data, map1)
  data2 = formatReelDataFormat(data2)
  // if (arrIsRepeat(data.map(v => v.id))) {
  //   return 'slotReel表id重复'
  // }
  return {
    reels: data1,
    reel_datas: data2,
  }
}

const formatPayTableData = (data, data2) => {
  // data = data.filter(v => v.slotId === updateslotId.value)
  const map = {
    // 通用参数
    SlotId: 'slotId',
    // Paytableid: 'id',
    // 表1参数
    PaytableCombine: 'combine1',
    PaytableCombineNum1: 'combineNum1',
    PaytableWinMultiple: 'winMultiple',
    // 表2参数
    AnyPaytableCombine1: 'combine1',
    AnyPaytableCombineNum1: 'combineNum1',
    AnyPaytableCombine2: 'combine2',
    AnyPaytableCombineNum2: 'combineNum2',
    AnyPaytableWinMultiple: 'winMultiple',
    type: 'type',
  }
  data.forEach(item => {
    item.type = 1
  })
  data2.forEach(item => {
    item.type = 2
  })
  data = data.concat(data2.slice(2))
  data = formatUploadData(data, map)
  // if (arrIsRepeat(data.map(v => v.id))) {
  //   return 'payTable' + type + '表id重复'
  // }
  return data
}

const formatSymbolData = (data) => {
  // data = data.filter(v => v.slotId === updateslotId.value)
  const map = {
    SlotId: 'slotId',
    // Symbolid: 'id',
    SymbolName: 'name',
    SymbolSize: 'size',
    SymbolHierarchy: 'hierarchy',
    IsWild: 'isWild',
    SubSymbol: 'sub',
    Multiple: 'multiple',
    IsSingleWin: 'isSingleWin',
  }
  data = formatUploadData(data, map)
  // if (arrIsRepeat(data.map(v => v.id))) {
  //   return 'symbol表id重复'
  // }
  return data
}

const formatPaylineData = (data) => {
  // if (!updatePaylineNo.value) {
  //   console.log('slot 下 paylineNo 为空 不更新 payline')
  //   return []
  // }
  // data = data.filter(v => v.paylineNo === updatePaylineNo.value)
  const map = {
    PaylineNo: 'no',
    Sort: 'sort',
    PaylineSize: 'size',
    Payline: 'num',
    Position: 'position',
  }
  data = formatUploadData(data, map)
  // if (arrIsRepeat(data.map(v => v.sort))) {
  //   return 'payline表排序重复'
  // }
  return data
}

const formatEventData = (data, demoData) => {
  const map = {
    SlotId: 'slotId',
    Event1: 'event1',
    demo: 'demo',
  }
  data.forEach((v) => {
    // 非demo
    v.demo = 2
  })
  demoData.forEach((v) => {
    // demo
    v.demo = 1
  })
  // 合并demo和非demo
  data = data.concat(demoData.slice(2))
  data = formatUploadData(data, map)
  return data
}

const formatFakeData = (data, fsData) => {
  const map = {
    // 通用参数
    SlotId: 'slotId',
    // 表1参数
    Num: 'num',
    Position: 'position',
    Which: 'which',
    type: 'type',
  }
  data.forEach(item => {
    item.type = 1
  })
  fsData.forEach(item => {
    item.type = 2
  })
  data = data.concat(fsData.slice(2))
  data = formatUploadData(data, map)
  return data
}

const upload = async(file, fileList) => {
  const files = { 0: file }
  const ws = await readExcel(files, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const data = {
    slot_id: 0,
    data: {
      slot: formatSlotData(ws[0]),
      slot_reel: formatSlotReelData(ws[1], ws[2]),
      slot_pay_table: formatPayTableData(ws[3], ws[4]),
      slot_symbol: formatSymbolData(ws[5]),
      slot_payline: formatPaylineData(ws[6]),
      slot_event: formatEventData(ws[7], ws[8]),
      slot_fake: formatFakeData(ws[9], ws[10]),
    },
  }
  // 校验数据
  for (const k in data.data) {
    const item = data.data[k]
    if (typeof item === 'string') {
      ElMessageBox.alert(item, '失败', {
        confirmButtonText: 'OK',
        dangerouslyUseHTMLString: true,
      })
      return
    }
  }
  const res = await updateAllConfig(data)
  if (res.code === 0) {
    ElMessageBox.alert(res.msg, '成功', {
      confirmButtonText: 'OK',
      dangerouslyUseHTMLString: true,
    })
  } else {
    ElMessageBox.alert(res.msg, '失败', {
      confirmButtonText: 'OK',
      dangerouslyUseHTMLString: true,
    })
  }
  getTableData()
  file.abort()
}

const uploadFunc = () => {
  // ElMessageBox.prompt(
  ElMessageBox.confirm(
    '该操作将变更所有配置，无法恢复，请确认！',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      // inputPlaceholder: '请输入机器id'
    },
  ).then(async(data) => {
    // updateslotId.value = parseInt(data.value)
    document.getElementById('upload1').click()
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
  ).then(async() => {
    backendOperateFunc(1, [])
  })
}

const backendOperateFunc = async(type, data) => {
  const res = await backendOperate({ type: type, data: data })
  if (res.code === 0) {
    ElMessageBox.alert(res.msg, '成功', {
      confirmButtonText: 'OK',
      dangerouslyUseHTMLString: true,
    })
  } else {
    ElMessageBox.alert(res.msg, '失败', {
      confirmButtonText: 'OK',
      dangerouslyUseHTMLString: true,
    })
  }
}

// 数据导出
const exportExcel = async() => {
  const map = {
    'ID': '',
    'name': '名称',
    'icon': '使用的标签图集',
    'iconShadow': '使用的模糊标签图集',
    'paylineNo': '线数编号',
    'bigWin': '赢钱最大区间',
    'betNum': '机器押注',
    'isDrawAllPayline': '是否划所有线',
    'drawAllPaylineTime': '划所有线时间',
    'drawAllPaylineTimeInterval': '划所有线间隔',
    'drawAllPaylineCircle': '划所有线循环几次',
    'isDrawSinglePayline': '是否划单条线',
    'drawSinglePaylineTime': '每条线划线时间',
    'drawSinglePaylineTimeInterval': '每条线划线间隔',
    'status': '状态',
  }
  const table = await getSlotList({ page: 1, pageSize: 100000, ...searchInfo.value })
  if (table.code === 0) {
    const data = formatData(table.data.list)
    const params = {
      sheetData: data,
      headMap: map,
      fileName: '数据导出',
    }
    exportFile(params)
  } else {
    ElMessage.error(table.msg)
  }
}

// 格式化数据
const formatData = (data) => {
  data.forEach(v => {
    v.CreatedAt = formatDate(v.CreatedAt)
    v.UpdatedAt = formatDate(v.UpdatedAt)
  })
  return data
}

// 查询
const getTableData = async() => {
  const table = await getSlotList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
  if (table.code === 0) {
    tableData.value = formatData(table.data.list)
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

getTableData()

// ============== 表格控制部分结束 ===============

// 获取需要的字典 可能为空 按需保留
const setOptions = async() => {
}

// 获取需要的字典 可能为空 按需保留
setOptions()

// 多选数据
const multipleSelection = ref([])
// 多选
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

// 删除行
const deleteRow = (row) => {
  ElMessageBox.confirm('确定要删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteSlotFunc(row)
  })
}

// 批量删除控制标记
const deleteVisible = ref(false)

// 多选删除
const onDelete = async() => {
  const ids = []
  if (multipleSelection.value.length === 0) {
    ElMessage({
      type: 'warning',
      message: '请选择要删除的数据',
    })
    return
  }
  multipleSelection.value &&
  multipleSelection.value.map(item => {
    ids.push(item.ID)
  })
  const res = await deleteSlotByIds({ ids })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    if (tableData.value.length === ids.length && page.value > 1) {
      page.value--
    }
    deleteVisible.value = false
    getTableData()
  }
}

// 行为控制标记（弹窗内部需要增还是改）
const type = ref('')

// 更新行
const updateSlotFunc = async(row) => {
  const res = await findSlot({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data.reslot
    dialogFormVisible.value = true
  }
}

// 删除行
const deleteSlotFunc = async(row) => {
  const res = await deleteSlot({ ID: row.ID })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    if (tableData.value.length === 1 && page.value > 1) {
      page.value--
    }
    getTableData()
  }
}

// 弹窗控制标记
const dialogFormVisible = ref(false)

// 打开弹窗
const openDialog = () => {
  type.value = 'create'
  dialogFormVisible.value = true
}

// 关闭弹窗
const closeDialog = () => {
  dialogFormVisible.value = false
  formData.value = {
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
    isDrawAllPayline: 1,
    isDrawSinglePayline: 1,
    status: 1,
    raise: 0,
    buyFreeSpin: 0,
    buyReSpin: 0,
    topMul: 0,
  }
}
// 弹窗确定
const enterDialog = async() => {
  elFormRef.value?.validate(async(valid) => {
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
        message: '创建/更改成功',
      })
      closeDialog()
      getTableData()
    }
  })
}
</script>

<style>
</style>
