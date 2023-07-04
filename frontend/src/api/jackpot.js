import service from '@/utils/request'

// @Tags Jackpot
// @Summary 创建Jackpot
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Jackpot true "创建Jackpot"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /jackpot/createJackpot [post]
export const createJackpot = (data) => {
  return service({
    url: '/jackpot/createJackpot',
    method: 'post',
    data
  })
}

// @Tags Jackpot
// @Summary 删除Jackpot
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Jackpot true "删除Jackpot"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /jackpot/deleteJackpot [delete]
export const deleteJackpot = (data) => {
  return service({
    url: '/jackpot/deleteJackpot',
    method: 'delete',
    data
  })
}

// @Tags Jackpot
// @Summary 删除Jackpot
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除Jackpot"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /jackpot/deleteJackpot [delete]
export const deleteJackpotByIds = (data) => {
  return service({
    url: '/jackpot/deleteJackpotByIds',
    method: 'delete',
    data
  })
}

// @Tags Jackpot
// @Summary 更新Jackpot
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Jackpot true "更新Jackpot"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /jackpot/updateJackpot [put]
export const updateJackpot = (data) => {
  return service({
    url: '/jackpot/updateJackpot',
    method: 'put',
    data
  })
}

// @Tags Jackpot
// @Summary 用id查询Jackpot
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.Jackpot true "用id查询Jackpot"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /jackpot/findJackpot [get]
export const findJackpot = (params) => {
  return service({
    url: '/jackpot/findJackpot',
    method: 'get',
    params
  })
}

// @Tags Jackpot
// @Summary 分页获取Jackpot列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取Jackpot列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /jackpot/getJackpotList [get]
export const getJackpotList = (params) => {
  return service({
    url: '/jackpot/getJackpotList',
    method: 'get',
    params
  })
}
export const saveJackpotList = (data) => {
  return service({
    url: '/jackpot/saveJackpotList',
    method: 'post',
    data
  })
}
