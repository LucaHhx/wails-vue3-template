import service from '@/utils/request'

// @Tags MoneyLog
// @Summary 创建MoneyLog
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.MoneyLog true "创建MoneyLog"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /moneyLog/createMoneyLog [post]
export const createMoneyLog = (data) => {
  return service({
    url: '/moneyLog/createMoneyLog',
    method: 'post',
    data
  })
}

// @Tags MoneyLog
// @Summary 删除MoneyLog
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.MoneyLog true "删除MoneyLog"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /moneyLog/deleteMoneyLog [delete]
export const deleteMoneyLog = (data) => {
  return service({
    url: '/moneyLog/deleteMoneyLog',
    method: 'delete',
    data
  })
}

// @Tags MoneyLog
// @Summary 删除MoneyLog
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除MoneyLog"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /moneyLog/deleteMoneyLog [delete]
export const deleteMoneyLogByIds = (data) => {
  return service({
    url: '/moneyLog/deleteMoneyLogByIds',
    method: 'delete',
    data
  })
}

// @Tags MoneyLog
// @Summary 更新MoneyLog
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.MoneyLog true "更新MoneyLog"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /moneyLog/updateMoneyLog [put]
export const updateMoneyLog = (data) => {
  return service({
    url: '/moneyLog/updateMoneyLog',
    method: 'put',
    data
  })
}

// @Tags MoneyLog
// @Summary 用id查询MoneyLog
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.MoneyLog true "用id查询MoneyLog"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /moneyLog/findMoneyLog [get]
export const findMoneyLog = (params) => {
  return service({
    url: '/moneyLog/findMoneyLog',
    method: 'get',
    params
  })
}

// @Tags MoneyLog
// @Summary 分页获取MoneyLog列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取MoneyLog列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /moneyLog/getMoneyLogList [get]
export const getMoneyLogList = (params) => {
  return service({
    url: '/moneyLog/getMoneyLogList',
    method: 'get',
    params
  })
}
