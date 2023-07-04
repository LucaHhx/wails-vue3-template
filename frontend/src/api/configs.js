import service from '@/utils/request'

// @Tags Configs
// @Summary 创建Configs
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Configs true "创建Configs"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /configs/createConfigs [post]
export const createConfigs = (data) => {
  return service({
    url: '/configs/createConfigs',
    method: 'post',
    data
  })
}

// @Tags Configs
// @Summary 删除Configs
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Configs true "删除Configs"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /configs/deleteConfigs [delete]
export const deleteConfigs = (data) => {
  return service({
    url: '/configs/deleteConfigs',
    method: 'delete',
    data
  })
}

// @Tags Configs
// @Summary 删除Configs
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除Configs"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /configs/deleteConfigs [delete]
export const deleteConfigsByIds = (data) => {
  return service({
    url: '/configs/deleteConfigsByIds',
    method: 'delete',
    data
  })
}

// @Tags Configs
// @Summary 更新Configs
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Configs true "更新Configs"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /configs/updateConfigs [put]
export const updateConfigs = (data) => {
  return service({
    url: '/configs/updateConfigs',
    method: 'put',
    data
  })
}

// @Tags Configs
// @Summary 用id查询Configs
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.Configs true "用id查询Configs"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /configs/findConfigs [get]
export const findConfigs = (params) => {
  return service({
    url: '/configs/findConfigs',
    method: 'get',
    params
  })
}

// @Tags Configs
// @Summary 分页获取Configs列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取Configs列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /configs/getConfigsList [get]
export const getConfigsList = (params) => {
  return service({
    url: '/configs/getConfigsList',
    method: 'get',
    params
  })
}
