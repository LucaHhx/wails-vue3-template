import service from '@/utils/request'

// @Tags MoneySlot
// @Summary 创建MoneySlot
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.MoneySlot true "创建MoneySlot"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /moneySlot/createMoneySlot [post]
export const createMoneySlot = (data) => {
  return service({
    url: '/moneySlot/createMoneySlot',
    method: 'post',
    data
  })
}

// @Tags MoneySlot
// @Summary 删除MoneySlot
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.MoneySlot true "删除MoneySlot"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /moneySlot/deleteMoneySlot [delete]
export const deleteMoneySlot = (data) => {
  return service({
    url: '/moneySlot/deleteMoneySlot',
    method: 'delete',
    data
  })
}

// @Tags MoneySlot
// @Summary 删除MoneySlot
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除MoneySlot"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /moneySlot/deleteMoneySlot [delete]
export const deleteMoneySlotByIds = (data) => {
  return service({
    url: '/moneySlot/deleteMoneySlotByIds',
    method: 'delete',
    data
  })
}

// @Tags MoneySlot
// @Summary 更新MoneySlot
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.MoneySlot true "更新MoneySlot"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /moneySlot/updateMoneySlot [put]
export const updateMoneySlot = (data) => {
  return service({
    url: '/moneySlot/updateMoneySlot',
    method: 'put',
    data
  })
}

// @Tags MoneySlot
// @Summary 用id查询MoneySlot
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.MoneySlot true "用id查询MoneySlot"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /moneySlot/findMoneySlot [get]
export const findMoneySlot = (params) => {
  return service({
    url: '/moneySlot/findMoneySlot',
    method: 'get',
    params
  })
}

// @Tags MoneySlot
// @Summary 分页获取MoneySlot列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取MoneySlot列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /moneySlot/getMoneySlotList [get]
export const getMoneySlotList = (params) => {
  return service({
    url: '/moneySlot/getMoneySlotList',
    method: 'get',
    params
  })
}

export const goRecalculate = (params) => {
  return service({
    url: '/moneySlot/recalculate',
    method: 'get',
    params
  })
}