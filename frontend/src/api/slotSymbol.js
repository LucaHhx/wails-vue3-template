import service from '@/utils/request'

// @Tags SlotSymbol
// @Summary 创建SlotSymbol
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotSymbol true "创建SlotSymbol"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /slotSymbol/createSlotSymbol [post]
export const createSlotSymbol = (data) => {
  return service({
    url: '/slotSymbol/createSlotSymbol',
    method: 'post',
    data
  })
}

// @Tags SlotSymbol
// @Summary 删除SlotSymbol
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotSymbol true "删除SlotSymbol"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /slotSymbol/deleteSlotSymbol [delete]
export const deleteSlotSymbol = (data) => {
  return service({
    url: '/slotSymbol/deleteSlotSymbol',
    method: 'delete',
    data
  })
}

// @Tags SlotSymbol
// @Summary 删除SlotSymbol
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除SlotSymbol"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /slotSymbol/deleteSlotSymbol [delete]
export const deleteSlotSymbolByIds = (data) => {
  return service({
    url: '/slotSymbol/deleteSlotSymbolByIds',
    method: 'delete',
    data
  })
}

// @Tags SlotSymbol
// @Summary 更新SlotSymbol
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotSymbol true "更新SlotSymbol"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /slotSymbol/updateSlotSymbol [put]
export const updateSlotSymbol = (data) => {
  return service({
    url: '/slotSymbol/updateSlotSymbol',
    method: 'put',
    data
  })
}

// @Tags SlotSymbol
// @Summary 用id查询SlotSymbol
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.SlotSymbol true "用id查询SlotSymbol"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /slotSymbol/findSlotSymbol [get]
export const findSlotSymbol = (params) => {
  return service({
    url: '/slotSymbol/findSlotSymbol',
    method: 'get',
    params
  })
}

// @Tags SlotSymbol
// @Summary 分页获取SlotSymbol列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取SlotSymbol列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /slotSymbol/getSlotSymbolList [get]
export const getSlotSymbolList = (params) => {
  return service({
    url: '/slotSymbol/getSlotSymbolList',
    method: 'get',
    params
  })
}
