import service from '@/utils/request'

// @Tags SlotPayline
// @Summary 创建SlotPayline
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotPayline true "创建SlotPayline"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /slotPayline/createSlotPayline [post]
export const createSlotPayline = (data) => {
  return service({
    url: '/slotPayline/createSlotPayline',
    method: 'post',
    data
  })
}

// @Tags SlotPayline
// @Summary 删除SlotPayline
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotPayline true "删除SlotPayline"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /slotPayline/deleteSlotPayline [delete]
export const deleteSlotPayline = (data) => {
  return service({
    url: '/slotPayline/deleteSlotPayline',
    method: 'delete',
    data
  })
}

// @Tags SlotPayline
// @Summary 删除SlotPayline
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除SlotPayline"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /slotPayline/deleteSlotPayline [delete]
export const deleteSlotPaylineByIds = (data) => {
  return service({
    url: '/slotPayline/deleteSlotPaylineByIds',
    method: 'delete',
    data
  })
}

// @Tags SlotPayline
// @Summary 更新SlotPayline
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotPayline true "更新SlotPayline"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /slotPayline/updateSlotPayline [put]
export const updateSlotPayline = (data) => {
  return service({
    url: '/slotPayline/updateSlotPayline',
    method: 'put',
    data
  })
}

// @Tags SlotPayline
// @Summary 用id查询SlotPayline
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.SlotPayline true "用id查询SlotPayline"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /slotPayline/findSlotPayline [get]
export const findSlotPayline = (params) => {
  return service({
    url: '/slotPayline/findSlotPayline',
    method: 'get',
    params
  })
}

// @Tags SlotPayline
// @Summary 分页获取SlotPayline列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取SlotPayline列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /slotPayline/getSlotPaylineList [get]
export const getSlotPaylineList = (params) => {
  return service({
    url: '/slotPayline/getSlotPaylineList',
    method: 'get',
    params
  })
}
