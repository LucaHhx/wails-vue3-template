import service from '@/utils/request'

// @Tags Currency
// @Summary 创建Currency
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Currency true "创建Currency"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /currency/createCurrency [post]
export const createCurrency = (data) => {
  return service({
    url: '/currency/createCurrency',
    method: 'post',
    data
  })
}

// @Tags Currency
// @Summary 删除Currency
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Currency true "删除Currency"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /currency/deleteCurrency [delete]
export const deleteCurrency = (data) => {
  return service({
    url: '/currency/deleteCurrency',
    method: 'delete',
    data
  })
}

// @Tags Currency
// @Summary 删除Currency
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除Currency"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /currency/deleteCurrency [delete]
export const deleteCurrencyByIds = (data) => {
  return service({
    url: '/currency/deleteCurrencyByIds',
    method: 'delete',
    data
  })
}

// @Tags Currency
// @Summary 更新Currency
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Currency true "更新Currency"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /currency/updateCurrency [put]
export const updateCurrency = (data) => {
  return service({
    url: '/currency/updateCurrency',
    method: 'put',
    data
  })
}

// @Tags Currency
// @Summary 用id查询Currency
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.Currency true "用id查询Currency"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /currency/findCurrency [get]
export const findCurrency = (params) => {
  return service({
    url: '/currency/findCurrency',
    method: 'get',
    params
  })
}

// @Tags Currency
// @Summary 分页获取Currency列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取Currency列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /currency/getCurrencyList [get]
export const getCurrencyList = (params) => {
  return service({
    url: '/currency/getCurrencyList',
    method: 'get',
    params
  })
}
