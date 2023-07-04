<template>
  <div>
    <div class="gva-search-box">
      <el-form
        :inline="true"
        :model="searchInfo"
        class="demo-form-inline"
        @keyup.enter="onSubmit"
      >
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
        <el-form-item label="类型">
          <el-select
            v-model="searchInfo.type"
            :clearable="true"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="(v, k) in typeOpts"
              :key="k"
              :label="v"
              :value="parseInt(k)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="机器id">
          <el-input v-model.number="searchInfo.slotId" placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="押注">
          <el-input v-model.number="searchInfo.amount" placeholder="大于多少" />
        </el-form-item>
        <el-form-item label="总赢钱">
          <el-input v-model.number="searchInfo.win" placeholder="大于多少" />
        </el-form-item>
        <el-form-item label="主游戏编号">
          <el-input
            v-model.number="searchInfo.testId"
            placeholder="查找主游戏编号"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            size="small"
            type="primary"
            icon="search"
            @click="onSubmit"
          >查询
          </el-button>
          <el-button
            size="small"
            icon="refresh"
            @click="onReset"
          >重置
          </el-button>
        </el-form-item>
        <el-divider />
        <el-form-item label="类型">
          <el-select v-model="runConfig.type" filterable placeholder="请选择">
            <el-option
              v-for="(v, k) in typeOpts"
              :key="k"
              :label="v"
              :value="parseInt(k)"
              type="number"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="选项">
          <el-select v-model="runConfig.opts" clearable multiple filterable placeholder="请选择">
            <el-option
              v-for="(v, k) in opts"
              :key="k"
              :label="v"
              :value="parseInt(k)"
              type="number"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="机器id">
          <el-input v-model.number="runConfig.slotId" placeholder="slotId" />
        </el-form-item>
        <el-form-item v-show="[1, 2].includes(runConfig.type)" label="次数">
          <el-input v-model.number="runConfig.num" placeholder="执行次数" />
        </el-form-item>
        <el-form-item v-show="runConfig.type === 2" label="持有">
          <el-input v-model.number="runConfig.hold" placeholder="hold" />
        </el-form-item>
        <el-form-item label="押注">
          <el-input v-model.number="runConfig.amount" placeholder="整数" />
        </el-form-item>

        <el-form-item label="加注">
          <el-select v-model="runConfig.raise" filterable placeholder="请选择">
            <el-option
              v-for="(v, k) in raiseType"
              :key="k"
              :label="v"
              :value="parseInt(k)"
              type="number"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="购买FreeSpin">
          <el-select
            v-model="runConfig.isMustFree"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="(v, k) in mustFreeType"
              :key="k"
              :label="v"
              :value="parseInt(k)"
              type="number"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="购买ReSpin">
          <el-select v-model="runConfig.isMustRes" filterable placeholder="请选择">
            <el-option
              v-for="(v, k) in mustFreeType"
              :key="k"
              :label="v"
              :value="parseInt(k)"
              type="number"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-show="[4].includes(runConfig.type)"
          label="结果"
          size="300px"
        >
          <el-input
            v-model.number="runConfig.result"
            placeholder="结果集合"
            type="textarea"
            style="width: 500px"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            size="small"
            type="primary"
            icon="select"
            @click="createTest"
          >执行
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button
          size="small"
          type="primary"
          icon="download"
          @click="exportExcel"
        >导出
        </el-button>
        <!-- <el-button size="small" type="primary" icon="plus" @click="openDialog">新增</el-button> -->
        <el-popover v-model:visible="deleteVisible" placement="top" width="160">
          <p>确定要删除吗？</p>
          <div style="text-align: right; margin-top: 8px">
            <el-button
              size="small"
              type="primary"
              link
              @click="deleteVisible = false"
            >取消
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click="onDelete"
            >确定
            </el-button>
          </div>
          <template #reference>
            <el-button
              icon="delete"
              size="small"
              style="margin-left: 10px"
              :disabled="!multipleSelection.length"
              @click="deleteVisible = true"
            >删除
            </el-button>
          </template>
        </el-popover>
        <el-popover v-model:visible="truncateVisible" placement="top" width="160">
          <p>确定要清空吗？</p>
          <div style="text-align: right; margin-top: 8px">
            <el-button
              size="small"
              type="primary"
              link
              @click="truncateVisible = false"
            >取消
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click="onTruncate"
            >确定
            </el-button>
          </div>
          <template #reference>
            <el-button
              icon="delete"
              size="small"
              style="margin-left: 10px"
              @click="truncateVisible = true"
            >清空
            </el-button>
          </template>
        </el-popover>
      </div>
      <div style="height: 65vh">
        <el-table
          ref="multipleTable"
          style="width: 100%"
          tooltip-effect="dark"
          :data="tableData"
          row-key="ID"
          height="100%"
          border
          @selection-change="handleSelectionChange"
          @sort-change="sortChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column
            align="left"
            label="ID"
            prop="ID"
            sortable="custom"
            width="90"
          />
          <el-table-column
            align="left"
            label="玩法类型"
            prop="type"
            width="120"
          >
            <template #default="scope">
              <el-tag
                size="small"
                :type="typeTags[scope.row.type]"
                effect="dark"
              >
                {{ typeOpts[scope.row.type] }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            sortable="custom"
            align="left"
            label="机器id"
            prop="slotId"
            width="90"
          />
          <el-table-column
            sortable="custom"
            align="left"
            label="持有"
            prop="hold"
            width="90"
          />
          <!-- <el-table-column sortable="custom" align="left" label="押注" prop="amount" width="90" /> -->
          <el-table-column
            sortable="custom"
            align="left"
            label="总赢钱"
            prop="win"
            width="120"
          />
          <el-table-column
            sortable="custom"
            align="left"
            label="最大次数"
            prop="maxNum"
            width="120"
          />
          <el-table-column
            sortable="custom"
            align="left"
            label="实际次数"
            prop="runNum"
            width="120
          "
          />
          <el-table-column
            sortable="custom"
            align="left"
            label="押注金额"
            prop="bet"
            width="120"
          />
          <el-table-column
            sortable="custom"
            align="left"
            label="加注金额"
            prop="raise"
            width="120"
          />
          <el-table-column
            sortable="custom"
            align="left"
            label="普通转编号"
            prop="testId"
            width="120"
          />
          <el-table-column
            sortable="custom"
            align="left"
            label="游戏进度"
            prop="rank"
            width="120"
          />
          <el-table-column
            sortable="custom"
            align="left"
            label="游戏类型"
            fixed="right"
            prop="gameType"
            width="120"
          >
            <template #default="scope">
              <el-tag
                size="small"
                :type="statusTags[scope.row.gameType]"
                effect="dark"
              >
                {{ gameTypes[scope.row.gameType] }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column align="left" label="详情" prop="detail" width="200" fixed="right">
            <template #default="scope">
              {{
                ![3, 4, 5].includes(scope.row.type)
                  ? scope.row.detail.slice(0, 15) + ' ...'
                  : ''
              }}
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            fixed="right"
            label="状态"
            prop="status"
            width="120"
          >
            <template #default="scope">
              <el-tag
                size="small"
                :type="statusTags[scope.row.status]"
                effect="dark"
              >
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
          <el-table-column
            align="left"
            label="按钮组"
            fixed="right"
            width="130"
          >
            <template #default="scope">
              <el-button
                type="primary"
                link
                icon="box"
                size="small"
                class="table-button"
                @click="updateSlotTestsFunc(scope.row)"
              >详情
              </el-button>
              <el-button
                type="primary"
                link
                icon="delete"
                size="small"
                @click="deleteRow(scope.row)"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="gva-pagination">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="page"
          :page-size="pageSize"
          :page-sizes="[13, 30, 50, 100]"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
    <el-dialog
      v-model="dialogFormVisible"
      :before-close="closeDialog"
      title="弹窗操作"
    >
      <el-form
        ref="elFormRef"
        :model="formData"
        label-position="right"
        :rules="rule"
        label-width="120px"
      >
        <el-form-item label="类型:" prop="type" disabled>
          <el-input
            v-model="typeOpts[formData.type]"
            disabled
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="押注:" prop="amount">
          <el-input
            v-model.number="formData.amount"
            disabled
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="加注:" prop="raise">
          <el-input
            v-model.number="formData.raise"
            disabled
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="总赢钱:" prop="win">
          <el-input
            v-model.number="formData.win"
            disabled
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="游戏类型:" prop="gameType">
          <el-input
            v-model="gameTypes[formData.gameType]"
            disabled
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="游戏进度:" prop="rank">
          <el-input
            v-model.number="formData.rank"
            disabled
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item
          v-show="[1, 2].includes(formData.type)"
          label="最大次数:"
          prop="maxNum"
        >
          <el-input
            v-model.number="formData.maxNum"
            disabled
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item
          v-show="[1, 2].includes(formData.type)"
          label="实际次数:"
          prop="runNum"
        >
          <el-input
            v-model.number="formData.runNum"
            disabled
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item v-if="isOne" style="height: 15px">
          <el-col v-for="(v, k) in color" :key="k" :span="4">
            <el-tag class="ml-2" size="mini" :type="v" effect="dark">
              {{ k }}
            </el-tag>
          </el-col>
        </el-form-item>
        <br>
        <el-form-item
          v-for="(vv, kk) in formData.detail.data"
          :key="kk"
          label=""
          prop=""
        >
          <el-col v-for="(v, k) in vv" :key="k" :span="3">
            <el-tag
              class="ml-2"
              :type="getTagSetting(v,formData.slotId).color"
            >{{ getTagSetting(v, formData.slotId).name }}
            </el-tag>
          </el-col>
        </el-form-item>
        <el-form-item
          v-if="[3, 4,5].includes(formData.type)"
          label="详情:"
          prop="detail"
        >
          <el-input
            v-model="formData.detail.text"
            disabled
            type="textarea"
            rows="6"
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item
          v-if="![3, 4,5].includes(formData.type)"
          label="详情:"
          prop="detail"
        >
          <el-input
            v-model="formData.detail"
            disabled
            type="textarea"
            rows="20"
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item
          v-if="[3, 4,5].includes(formData.type)"
          label="游戏数据:"
          prop="detail"
        >
          <el-input
            v-model="formData.gameData"
            disabled
            type="textarea"
            rows="20"
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="small" @click="closeDialog">返 回</el-button>
          <!-- <el-button size="small" type="primary" @click="enterDialog">确 定</el-button> -->
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SlotTests',
  data() {
    return {
      typeTags: {
        0: 'warning',
        1: 'success',
        2: 'info',
        3: 'primary',
        4: 'danger',
        6: 'warning',
        9: 'danger',
        10: 'success',
      },
      statusTags: {
        0: 'warning',
        1: 'warning',
        2: 'info',
        3: 'primary',
        4: 'danger',
        9: 'danger',
        10: 'success',
      },
      defaultStatus: { 1: '正常', 2: '关闭', 9: '异常' },
      typeOpts: { 1: '指定次数', 2: '死亡次数', 3: '单次详情', 4: '指定结果', 5: '前端测试', 6: '测试用户' },
      raiseType: { 0: '不加注', 1: '加注' },
      mustFreeType: { 0: '不购买', 1: '购买' },
      gameTypes: { 0: '普通', 1: '普通', 2: 'FreeSpin', 3: 'reSpin', 4: 'FreeReSpin' },
      statusOpts: { 1: '运行中', 9: '异常', 10: '完成' },
      opts: { 1: '免费转', 2: 'demo' },
    }
  },
}
</script>

<script setup>
import {
  createSlotTests,
  deleteSlotTests,
  deleteSlotTestsByIds,
  getSlotTestsList,
  truncateSlotTests,
} from '@/api/slotTests'

// 全量引入格式化工具 请按需保留
import { formatDate } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'
import { getShortcuts } from '@/utils/date'
import { ParseJson, toSQLLine } from '@/utils/stringFun'
import { exportFile } from '@/utils/excel'
import { getTagSetting } from '@/utils/getTag'

const color = {
  Line: 'success',
  PayTable: 'warning',
  Wild: 'danger',
  Single: 'info',
  Jackpot: 'primary',
}
const isOne = ref(false)
// 自动化生成的字典（可能为空）以及字段
const formData = ref({
  type: 1,
  amount: 0,
  num: 0,
  win: 0,
  maxNum: 0,
  runNum: 0,
  detail: '',
  raise: 0,
})

// 验证规则
const rule = reactive({})

const elFormRef = ref()

// =========== 表格控制部分 ===========
const page = ref(1)
const total = ref(0)
const pageSize = ref(13)
const tableData = ref([])
const searchInfo = ref({})

const runConfig = ref({
  type: 3,
  slotId: 1,
  num: 1,
  hold: 10000,
  amount: 100,
  opts: 0,
  raise: 0,
  isMustFree: 0,
  isMustRes: 0,
})

const shortcuts = getShortcuts()

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
  pageSize.value = 100
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
// 数据导出
const exportExcel = async() => {
  const map = {
    ID: '',
    type: '玩法类型',
    amount: '押注',
    win: '总赢钱',
    maxNum: '最大次数',
    runNum: '实际次数',
    detail: '详情',
  }
  const table = await getSlotTestsList({
    page: 1,
    pageSize: 100000,
    ...searchInfo.value,
  })
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
  data.forEach((v) => {
    console.log(v)
    if ([3, 4, 5].includes(v.type)) {
      if (v.slotId !== 5) {
        v.detail = formatOnceDetail(v.detail)
      } else {
        v.detail = formatOnceDetail5(v.detail)
      }
    }
    v.CreatedAt = formatDate(v.CreatedAt)
    v.UpdatedAt = formatDate(v.UpdatedAt)
  })
  return data
}

const formatOnceDetail5 = (v) => {
  const viewData = ParseJson(v)
  if (typeof viewData !== 'object') {
    return v
  }

  const arr = []
  viewData.data.split(';').forEach((row) => {
    arr.push(row.split(','))
  })
  const arrnew = []
  if (arr.length === 1) {
    for (let i = 0; i < 3; i++) {
      arrnew.push(arr[0].slice(i * 5, i * 5 + 5))
    }

    viewData.data = arrnew
  } else {
    viewData.data = arr
  }
  console.log('viewData')
  console.log(viewData)
  return viewData
}

// 格式化数据
const formatOnceDetail = (v) => {
  const viewData = ParseJson(v)
  if (typeof viewData !== 'object') {
    return v
  }
  console.log(viewData)
  let s = ''
  const arr = []
  viewData.data.split(';').forEach((row) => {
    arr.push(row.split(','))
  })
  const arrnew = []
  if (arr.length === 1) {
    for (let i = 0; i < 3; i++) {
      arrnew.push(arr[0].slice(i * 5, i * 5 + 5))
    }

    viewData.data = arrnew
  } else {
    viewData.data = arr
  }

  let muls = viewData.payTableMuls
  if (!muls) {
    muls = []
  }
  let sum = 0
  muls.forEach((v, i) => {
    sum += parseFloat(v)
  })

  s += '押注: ' + viewData.bet + '\n'
  s +=
      'payTable倍数: ' +
      muls +
      '（len: ' +
      muls.length +
      ' sum: ' +
      sum +
      '）' +
      '\n'
  s += '百搭倍数: [' + viewData.wildMuls + ']\n'
  s += '奖池倍数: ' + viewData.jackpotMul + '\n'
  s += '赢钱: ' + viewData.gain + '\n'
  viewData.text = s
  return viewData
}
// 查询
const getTableData = async() => {
  const table = await getSlotTestsList({
    page: page.value,
    pageSize: pageSize.value,
    ...searchInfo.value,
  })
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
    deleteSlotTestsFunc(row)
  })
}

// 批量删除控制标记
const deleteVisible = ref(false)
const truncateVisible = ref(false)

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
  multipleSelection.value.map((item) => {
    ids.push(item.ID)
  })
  const res = await deleteSlotTestsByIds({ ids })
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
const onTruncate = async() => {
  const res = await truncateSlotTests({ ids: '测试' })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    truncateVisible.value = false
    getTableData()
  }
}

// 行为控制标记（弹窗内部需要增还是改）

// 更新行
const createTest = async() => {
  const res = await createSlotTests(runConfig.value)
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '成功',
    })
    getTableData()
  }
}

// 更新行
const updateSlotTestsFunc = async(row) => {
  const res = tableData.value.find((v) => v.ID === row.ID)
  formData.value = res
  dialogFormVisible.value = true
  console.log(formData.value)
  isOne.value = Array.isArray(formData.value.detail.data)
  // const res = await findSlotTests({ ID: row.ID })
  // type.value = 'update'
  // if (res.code === 0) {
  //   formData.value = res.data.reslotTests
  //   dialogFormVisible.value = true
  // }
}

// 删除行
const deleteSlotTestsFunc = async(row) => {
  const res = await deleteSlotTests({ ID: row.ID })
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
// const openDialog = () => {
//   type.value = 'create'
//   dialogFormVisible.value = true
// }

// 关闭弹窗
const closeDialog = () => {
  dialogFormVisible.value = false
  // formData.value = {
  //   type: 1,
  //   amount: 0,
  //   win: 0,
  //   maxNum: 0,
  //   runNum: 0,
  //   detail: '',
  // }
}
// 弹窗确定
</script>

<style></style>
