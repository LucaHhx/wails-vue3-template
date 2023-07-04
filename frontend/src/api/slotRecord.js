import service from '@/utils/request'

// @Tags SlotRecord
// @Summary 创建SlotRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotRecord true "创建SlotRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /Record/createSlotRecord [post]
export const createSlotRecord = (data) => {
  return service({
    url: '/Record/createSlotRecord',
    method: 'post',
    data
  })
}

// @Tags SlotRecord
// @Summary 删除SlotRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotRecord true "删除SlotRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /Record/deleteSlotRecord [delete]
export const deleteSlotRecord = (data) => {
  return service({
    url: '/Record/deleteSlotRecord',
    method: 'delete',
    data
  })
}

// @Tags SlotRecord
// @Summary 删除SlotRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除SlotRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /Record/deleteSlotRecord [delete]
export const deleteSlotRecordByIds = (data) => {
  return service({
    url: '/Record/deleteSlotRecordByIds',
    method: 'delete',
    data
  })
}

// @Tags SlotRecord
// @Summary 更新SlotRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotRecord true "更新SlotRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /Record/updateSlotRecord [put]
export const updateSlotRecord = (data) => {
  return service({
    url: '/Record/updateSlotRecord',
    method: 'put',
    data
  })
}

// @Tags SlotRecord
// @Summary 用id查询SlotRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.SlotRecord true "用id查询SlotRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /Record/findSlotRecord [get]
export const findSlotRecord = (params) => {
  return service({
    url: '/Record/findSlotRecord',
    method: 'get',
    params
  })
}

// @Tags SlotRecord
// @Summary 分页获取SlotRecord列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取SlotRecord列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /Record/getSlotRecordList [get]
export const getSlotRecordList = (params) => {
  return service({
    url: '/Record/getSlotRecordList',
    method: 'get',
    params
  })
}
