import service from '@/utils/request'

// @Tags Tracking
// @Summary 创建Tracking
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Tracking true "创建Tracking"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /tracking/createTracking [post]
export const createTracking = (data) => {
  return service({
    url: '/tracking/createTracking',
    method: 'post',
    data
  })
}

// @Tags Tracking
// @Summary 删除Tracking
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Tracking true "删除Tracking"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /tracking/deleteTracking [delete]
export const deleteTracking = (data) => {
  return service({
    url: '/tracking/deleteTracking',
    method: 'delete',
    data
  })
}

// @Tags Tracking
// @Summary 删除Tracking
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除Tracking"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /tracking/deleteTracking [delete]
export const deleteTrackingByIds = (data) => {
  return service({
    url: '/tracking/deleteTrackingByIds',
    method: 'delete',
    data
  })
}

// @Tags Tracking
// @Summary 更新Tracking
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Tracking true "更新Tracking"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /tracking/updateTracking [put]
export const updateTracking = (data) => {
  return service({
    url: '/tracking/updateTracking',
    method: 'put',
    data
  })
}

// @Tags Tracking
// @Summary 用id查询Tracking
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.Tracking true "用id查询Tracking"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /tracking/findTracking [get]
export const findTracking = (params) => {
  return service({
    url: '/tracking/findTracking',
    method: 'get',
    params
  })
}

// @Tags Tracking
// @Summary 分页获取Tracking列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取Tracking列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /tracking/getTrackingList [get]
export const getTrackingList = (params) => {
  return service({
    url: '/tracking/getTrackingList',
    method: 'get',
    params
  })
}
