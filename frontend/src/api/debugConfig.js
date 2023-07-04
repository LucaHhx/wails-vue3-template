import service from '@/utils/request'

// @Tags DebugConfig
// @Summary 创建DebugConfig
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.DebugConfig true "创建DebugConfig"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /debugConfig/createDebugConfig [post]
export const createDebugConfig = (data) => {
  return service({
    url: '/debugConfig/createDebugConfig',
    method: 'post',
    data
  })
}

// @Tags DebugConfig
// @Summary 删除DebugConfig
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.DebugConfig true "删除DebugConfig"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /debugConfig/deleteDebugConfig [delete]
export const deleteDebugConfig = (data) => {
  return service({
    url: '/debugConfig/deleteDebugConfig',
    method: 'delete',
    data
  })
}

// @Tags DebugConfig
// @Summary 删除DebugConfig
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除DebugConfig"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /debugConfig/deleteDebugConfig [delete]
export const deleteDebugConfigByIds = (data) => {
  return service({
    url: '/debugConfig/deleteDebugConfigByIds',
    method: 'delete',
    data
  })
}

// @Tags DebugConfig
// @Summary 更新DebugConfig
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.DebugConfig true "更新DebugConfig"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /debugConfig/updateDebugConfig [put]
export const updateDebugConfig = (data) => {
  return service({
    url: '/debugConfig/updateDebugConfig',
    method: 'put',
    data
  })
}

// @Tags DebugConfig
// @Summary 用id查询DebugConfig
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.DebugConfig true "用id查询DebugConfig"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /debugConfig/findDebugConfig [get]
export const findDebugConfig = (params) => {
  return service({
    url: '/debugConfig/findDebugConfig',
    method: 'get',
    params
  })
}

// @Tags DebugConfig
// @Summary 分页获取DebugConfig列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取DebugConfig列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /debugConfig/getDebugConfigList [get]
export const getDebugConfigList = (params) => {
  return service({
    url: '/debugConfig/getDebugConfigList',
    method: 'get',
    params
  })
}

// @Tags DebugConfig
// @Summary 获取所有的DebugConfig
// @Security ApiKeyAuth
export const getSlotTags = (params) => {
  return service({
    url: '/debugConfig/getSlotTags',
    method: 'get',
    params
  })
}
