import service from '@/utils/request'

// @Tags SlotReel
// @Summary 创建SlotReel
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotReel true "创建SlotReel"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /slotReel/createSlotReel [post]
export const createSlotReel = (data) => {
  return service({
    url: '/slotReel/createSlotReel',
    method: 'post',
    data
  })
}

// @Tags SlotReel
// @Summary 删除SlotReel
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotReel true "删除SlotReel"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /slotReel/deleteSlotReel [delete]
export const deleteSlotReel = (data) => {
  return service({
    url: '/slotReel/deleteSlotReel',
    method: 'delete',
    data
  })
}

// @Tags SlotReel
// @Summary 删除SlotReel
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除SlotReel"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /slotReel/deleteSlotReel [delete]
export const deleteSlotReelByIds = (data) => {
  return service({
    url: '/slotReel/deleteSlotReelByIds',
    method: 'delete',
    data
  })
}

// @Tags SlotReel
// @Summary 更新SlotReel
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotReel true "更新SlotReel"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /slotReel/updateSlotReel [put]
export const updateSlotReel = (data) => {
  return service({
    url: '/slotReel/updateSlotReel',
    method: 'put',
    data
  })
}

// @Tags SlotReel
// @Summary 用id查询SlotReel
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.SlotReel true "用id查询SlotReel"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /slotReel/findSlotReel [get]
export const findSlotReel = (params) => {
  return service({
    url: '/slotReel/findSlotReel',
    method: 'get',
    params
  })
}

// @Tags SlotReel
// @Summary 分页获取SlotReel列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取SlotReel列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /slotReel/getSlotReelList [get]
export const getSlotReelList = (params) => {
  return service({
    url: '/slotReel/getSlotReelList',
    method: 'get',
    params
  })
}
