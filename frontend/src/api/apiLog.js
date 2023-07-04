import service from '@/utils/request'

// @Tags ApiLog
// @Summary 创建ApiLog
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.ApiLog true "创建ApiLog"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /apiLog/createApiLog [post]
export const createApiLog = (data) => {
  return service({
    url: '/apiLog/createApiLog',
    method: 'post',
    data
  })
}

// @Tags ApiLog
// @Summary 删除ApiLog
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.ApiLog true "删除ApiLog"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /apiLog/deleteApiLog [delete]
export const deleteApiLog = (data) => {
  return service({
    url: '/apiLog/deleteApiLog',
    method: 'delete',
    data
  })
}

// @Tags ApiLog
// @Summary 删除ApiLog
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除ApiLog"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /apiLog/deleteApiLog [delete]
export const deleteApiLogByIds = (data) => {
  return service({
    url: '/apiLog/deleteApiLogByIds',
    method: 'delete',
    data
  })
}

// @Tags ApiLog
// @Summary 更新ApiLog
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.ApiLog true "更新ApiLog"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /apiLog/updateApiLog [put]
export const updateApiLog = (data) => {
  return service({
    url: '/apiLog/updateApiLog',
    method: 'put',
    data
  })
}

// @Tags ApiLog
// @Summary 用id查询ApiLog
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.ApiLog true "用id查询ApiLog"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /apiLog/findApiLog [get]
export const findApiLog = (params) => {
  return service({
    url: '/apiLog/findApiLog',
    method: 'get',
    params
  })
}

// @Tags ApiLog
// @Summary 分页获取ApiLog列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取ApiLog列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /apiLog/getApiLogList [get]
export const getApiLogList = (params) => {
  return service({
    url: '/apiLog/getApiLogList',
    method: 'get',
    params
  })
}
