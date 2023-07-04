import service from '@/utils/request'

// @Tags SlotReelData
// @Summary 创建SlotReelData
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotReelData true "创建SlotReelData"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /slotReelData/createSlotReelData [post]
export const createSlotReelData = (data) => {
  return service({
    url: '/slotReelData/createSlotReelData',
    method: 'post',
    data
  })
}

// @Tags SlotReelData
// @Summary 删除SlotReelData
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotReelData true "删除SlotReelData"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /slotReelData/deleteSlotReelData [delete]
export const deleteSlotReelData = (data) => {
  return service({
    url: '/slotReelData/deleteSlotReelData',
    method: 'delete',
    data
  })
}

// @Tags SlotReelData
// @Summary 删除SlotReelData
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除SlotReelData"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /slotReelData/deleteSlotReelData [delete]
export const deleteSlotReelDataByIds = (data) => {
  return service({
    url: '/slotReelData/deleteSlotReelDataByIds',
    method: 'delete',
    data
  })
}

// @Tags SlotReelData
// @Summary 更新SlotReelData
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotReelData true "更新SlotReelData"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /slotReelData/updateSlotReelData [put]
export const updateSlotReelData = (data) => {
  return service({
    url: '/slotReelData/updateSlotReelData',
    method: 'put',
    data
  })
}

// @Tags SlotReelData
// @Summary 用id查询SlotReelData
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.SlotReelData true "用id查询SlotReelData"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /slotReelData/findSlotReelData [get]
export const findSlotReelData = (params) => {
  return service({
    url: '/slotReelData/findSlotReelData',
    method: 'get',
    params
  })
}

// @Tags SlotReelData
// @Summary 分页获取SlotReelData列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取SlotReelData列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /slotReelData/getSlotReelDataList [get]
export const getSlotReelDataList = (params) => {
  return service({
    url: '/slotReelData/getSlotReelDataList',
    method: 'get',
    params
  })
}
