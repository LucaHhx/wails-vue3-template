import service from '@/utils/request'

// @Tags SlotUserSpin
// @Summary 创建SlotUserSpin
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotUserSpin true "创建SlotUserSpin"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /slotUserSpin/createSlotUserSpin [post]
export const createSlotUserSpin = (data) => {
  return service({
    url: '/slotUserSpin/createSlotUserSpin',
    method: 'post',
    data
  })
}

// @Tags SlotUserSpin
// @Summary 删除SlotUserSpin
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotUserSpin true "删除SlotUserSpin"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /slotUserSpin/deleteSlotUserSpin [delete]
export const deleteSlotUserSpin = (data) => {
  return service({
    url: '/slotUserSpin/deleteSlotUserSpin',
    method: 'delete',
    data
  })
}

// @Tags SlotUserSpin
// @Summary 删除SlotUserSpin
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除SlotUserSpin"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /slotUserSpin/deleteSlotUserSpin [delete]
export const deleteSlotUserSpinByIds = (data) => {
  return service({
    url: '/slotUserSpin/deleteSlotUserSpinByIds',
    method: 'delete',
    data
  })
}

// @Tags SlotUserSpin
// @Summary 更新SlotUserSpin
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotUserSpin true "更新SlotUserSpin"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /slotUserSpin/updateSlotUserSpin [put]
export const updateSlotUserSpin = (data) => {
  return service({
    url: '/slotUserSpin/updateSlotUserSpin',
    method: 'put',
    data
  })
}

// @Tags SlotUserSpin
// @Summary 用id查询SlotUserSpin
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.SlotUserSpin true "用id查询SlotUserSpin"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /slotUserSpin/findSlotUserSpin [get]
export const findSlotUserSpin = (params) => {
  return service({
    url: '/slotUserSpin/findSlotUserSpin',
    method: 'get',
    params
  })
}

// @Tags SlotUserSpin
// @Summary 分页获取SlotUserSpin列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取SlotUserSpin列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /slotUserSpin/getSlotUserSpinList [get]
export const getSlotUserSpinList = (params) => {
  return service({
    url: '/slotUserSpin/getSlotUserSpinList',
    method: 'get',
    params
  })
}
