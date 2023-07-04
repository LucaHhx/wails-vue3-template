
import service from '@/utils/request'

// @Tags SlotFake
// @Summary 创建SlotFake
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotFake true "创建SlotFake"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /slotFake/createSlotFake [post]
export const createSlotFake = (data) => {
  return service({
    url: '/slotFake/createSlotFake',
    method: 'post',
    data
  })
}

// @Tags SlotFake
// @Summary 删除SlotFake
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotFake true "删除SlotFake"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /slotFake/deleteSlotFake [delete]
export const deleteSlotFake = (data) => {
  return service({
    url: '/slotFake/deleteSlotFake',
    method: 'delete',
    data
  })
}

// @Tags SlotFake
// @Summary 删除SlotFake
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除SlotFake"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /slotFake/deleteSlotFake [delete]
export const deleteSlotFakeByIds = (data) => {
  return service({
    url: '/slotFake/deleteSlotFakeByIds',
    method: 'delete',
    data
  })
}

// @Tags SlotFake
// @Summary 更新SlotFake
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotFake true "更新SlotFake"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /slotFake/updateSlotFake [put]
export const updateSlotFake = (data) => {
  return service({
    url: '/slotFake/updateSlotFake',
    method: 'put',
    data
  })
}

// @Tags SlotFake
// @Summary 用id查询SlotFake
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.SlotFake true "用id查询SlotFake"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /slotFake/findSlotFake [get]
export const findSlotFake = (params) => {
  return service({
    url: '/slotFake/findSlotFake',
    method: 'get',
    params
  })
}

// @Tags SlotFake
// @Summary 分页获取SlotFake列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取SlotFake列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /slotFake/getSlotFakeList [get]
export const getSlotFakeList = (params) => {
  return service({
    url: '/slotFake/getSlotFakeList',
    method: 'get',
    params
  })
}
