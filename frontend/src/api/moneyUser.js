import service from '@/utils/request'

// @Tags MoneyUser
// @Summary 创建MoneyUser
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.MoneyUser true "创建MoneyUser"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /moneyUser/createMoneyUser [post]
export const createMoneyUser = (data) => {
  return service({
    url: '/moneyUser/createMoneyUser',
    method: 'post',
    data
  })
}

// @Tags MoneyUser
// @Summary 删除MoneyUser
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.MoneyUser true "删除MoneyUser"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /moneyUser/deleteMoneyUser [delete]
export const deleteMoneyUser = (data) => {
  return service({
    url: '/moneyUser/deleteMoneyUser',
    method: 'delete',
    data
  })
}

// @Tags MoneyUser
// @Summary 删除MoneyUser
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除MoneyUser"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /moneyUser/deleteMoneyUser [delete]
export const deleteMoneyUserByIds = (data) => {
  return service({
    url: '/moneyUser/deleteMoneyUserByIds',
    method: 'delete',
    data
  })
}

// @Tags MoneyUser
// @Summary 更新MoneyUser
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.MoneyUser true "更新MoneyUser"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /moneyUser/updateMoneyUser [put]
export const updateMoneyUser = (data) => {
  return service({
    url: '/moneyUser/updateMoneyUser',
    method: 'put',
    data
  })
}

// @Tags MoneyUser
// @Summary 用id查询MoneyUser
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.MoneyUser true "用id查询MoneyUser"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /moneyUser/findMoneyUser [get]
export const findMoneyUser = (params) => {
  return service({
    url: '/moneyUser/findMoneyUser',
    method: 'get',
    params
  })
}

// @Tags MoneyUser
// @Summary 分页获取MoneyUser列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取MoneyUser列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /moneyUser/getMoneyUserList [get]
export const getMoneyUserList = (params) => {
  return service({
    url: '/moneyUser/getMoneyUserList',
    method: 'get',
    params
  })
}
export const goRecalculate = (params) => {
  return service({
    url: '/moneyUser/recalculate',
    method: 'get',
    params
  })
}
