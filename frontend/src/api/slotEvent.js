import service from '@/utils/request'

// @Tags SlotEvent
// @Summary 创建SlotEvent
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotEvent true "创建SlotEvent"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /slotEvent/createSlotEvent [post]
export const createSlotEvent = (data) => {
  return service({
    url: '/slotEvent/createSlotEvent',
    method: 'post',
    data
  })
}

// @Tags SlotEvent
// @Summary 删除SlotEvent
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotEvent true "删除SlotEvent"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /slotEvent/deleteSlotEvent [delete]
export const deleteSlotEvent = (data) => {
  return service({
    url: '/slotEvent/deleteSlotEvent',
    method: 'delete',
    data
  })
}

// @Tags SlotEvent
// @Summary 删除SlotEvent
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除SlotEvent"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /slotEvent/deleteSlotEvent [delete]
export const deleteSlotEventByIds = (data) => {
  return service({
    url: '/slotEvent/deleteSlotEventByIds',
    method: 'delete',
    data
  })
}

// @Tags SlotEvent
// @Summary 更新SlotEvent
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotEvent true "更新SlotEvent"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /slotEvent/updateSlotEvent [put]
export const updateSlotEvent = (data) => {
  return service({
    url: '/slotEvent/updateSlotEvent',
    method: 'put',
    data
  })
}

// @Tags SlotEvent
// @Summary 用id查询SlotEvent
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.SlotEvent true "用id查询SlotEvent"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /slotEvent/findSlotEvent [get]
export const findSlotEvent = (params) => {
  return service({
    url: '/slotEvent/findSlotEvent',
    method: 'get',
    params
  })
}

// @Tags SlotEvent
// @Summary 分页获取SlotEvent列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取SlotEvent列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /slotEvent/getSlotEventList [get]
export const getSlotEventList = (params) => {
  return service({
    url: '/slotEvent/getSlotEventList',
    method: 'get',
    params
  })
}
