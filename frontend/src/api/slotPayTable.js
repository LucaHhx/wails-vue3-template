import service from '@/utils/request'

// @Tags SlotPayTable
// @Summary 创建SlotPayTable
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotPayTable true "创建SlotPayTable"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /slotPayTable/createSlotPayTable [post]
export const createSlotPayTable = (data) => {
  return service({
    url: '/slotPayTable/createSlotPayTable',
    method: 'post',
    data
  })
}

// @Tags SlotPayTable
// @Summary 删除SlotPayTable
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotPayTable true "删除SlotPayTable"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /slotPayTable/deleteSlotPayTable [delete]
export const deleteSlotPayTable = (data) => {
  return service({
    url: '/slotPayTable/deleteSlotPayTable',
    method: 'delete',
    data
  })
}

// @Tags SlotPayTable
// @Summary 删除SlotPayTable
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除SlotPayTable"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /slotPayTable/deleteSlotPayTable [delete]
export const deleteSlotPayTableByIds = (data) => {
  return service({
    url: '/slotPayTable/deleteSlotPayTableByIds',
    method: 'delete',
    data
  })
}

// @Tags SlotPayTable
// @Summary 更新SlotPayTable
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotPayTable true "更新SlotPayTable"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /slotPayTable/updateSlotPayTable [put]
export const updateSlotPayTable = (data) => {
  return service({
    url: '/slotPayTable/updateSlotPayTable',
    method: 'put',
    data
  })
}

// @Tags SlotPayTable
// @Summary 用id查询SlotPayTable
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.SlotPayTable true "用id查询SlotPayTable"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /slotPayTable/findSlotPayTable [get]
export const findSlotPayTable = (params) => {
  return service({
    url: '/slotPayTable/findSlotPayTable',
    method: 'get',
    params
  })
}

// @Tags SlotPayTable
// @Summary 分页获取SlotPayTable列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取SlotPayTable列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /slotPayTable/getSlotPayTableList [get]
export const getSlotPayTableList = (params) => {
  return service({
    url: '/slotPayTable/getSlotPayTableList',
    method: 'get',
    params
  })
}
