import service from '@/utils/request'

// @Tags SlotTests
// @Summary 创建SlotTests
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotTests true "创建SlotTests"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /slotTests/createSlotTests [post]
export const createSlotTests = (data) => {
  return service({
    url: '/slotTests/createSlotTests',
    method: 'post',
    data
  })
}

// @Tags SlotTests
// @Summary 删除SlotTests
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotTests true "删除SlotTests"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /slotTests/deleteSlotTests [delete]
export const deleteSlotTests = (data) => {
  return service({
    url: '/slotTests/deleteSlotTests',
    method: 'delete',
    data
  })
}

// @Tags SlotTests
// @Summary 删除SlotTests
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除SlotTests"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /slotTests/deleteSlotTests [delete]
export const deleteSlotTestsByIds = (data) => {
  return service({
    url: '/slotTests/deleteSlotTestsByIds',
    method: 'delete',
    data
  })
}

export const truncateSlotTests = (data) => {
  return service({
    url: '/slotTests/truncateSlotTests',
    method: 'delete',
    data
  })
}

// @Tags SlotTests
// @Summary 更新SlotTests
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotTests true "更新SlotTests"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /slotTests/updateSlotTests [put]
export const updateSlotTests = (data) => {
  return service({
    url: '/slotTests/updateSlotTests',
    method: 'put',
    data
  })
}

// @Tags SlotTests
// @Summary 用id查询SlotTests
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.SlotTests true "用id查询SlotTests"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /slotTests/findSlotTests [get]
export const findSlotTests = (params) => {
  return service({
    url: '/slotTests/findSlotTests',
    method: 'get',
    params
  })
}

// @Tags SlotTests
// @Summary 分页获取SlotTests列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取SlotTests列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /slotTests/getSlotTestsList [get]
export const getSlotTestsList = (params) => {
  return service({
    url: '/slotTests/getSlotTestsList',
    method: 'get',
    params
  })
}
