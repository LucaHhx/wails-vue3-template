import service from '@/utils/request'

// @Tags MoneyUserSlot
// @Summary 创建MoneyUserSlot
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.MoneyUserSlot true "创建MoneyUserSlot"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /moneyUserSlot/createMoneyUserSlot [post]
export const createMoneyUserSlot = (data) => {
  return service({
    url: '/moneyUserSlot/createMoneyUserSlot',
    method: 'post',
    data
  })
}

// @Tags MoneyUserSlot
// @Summary 删除MoneyUserSlot
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.MoneyUserSlot true "删除MoneyUserSlot"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /moneyUserSlot/deleteMoneyUserSlot [delete]
export const deleteMoneyUserSlot = (data) => {
  return service({
    url: '/moneyUserSlot/deleteMoneyUserSlot',
    method: 'delete',
    data
  })
}

// @Tags MoneyUserSlot
// @Summary 删除MoneyUserSlot
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除MoneyUserSlot"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /moneyUserSlot/deleteMoneyUserSlot [delete]
export const deleteMoneyUserSlotByIds = (data) => {
  return service({
    url: '/moneyUserSlot/deleteMoneyUserSlotByIds',
    method: 'delete',
    data
  })
}

// @Tags MoneyUserSlot
// @Summary 更新MoneyUserSlot
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.MoneyUserSlot true "更新MoneyUserSlot"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /moneyUserSlot/updateMoneyUserSlot [put]
export const updateMoneyUserSlot = (data) => {
  return service({
    url: '/moneyUserSlot/updateMoneyUserSlot',
    method: 'put',
    data
  })
}

// @Tags MoneyUserSlot
// @Summary 用id查询MoneyUserSlot
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.MoneyUserSlot true "用id查询MoneyUserSlot"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /moneyUserSlot/findMoneyUserSlot [get]
export const findMoneyUserSlot = (params) => {
  return service({
    url: '/moneyUserSlot/findMoneyUserSlot',
    method: 'get',
    params
  })
}

// @Tags MoneyUserSlot
// @Summary 分页获取MoneyUserSlot列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取MoneyUserSlot列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /moneyUserSlot/getMoneyUserSlotList [get]
export const getMoneyUserSlotList = (params) => {
  return service({
    url: '/moneyUserSlot/getMoneyUserSlotList',
    method: 'get',
    params
  })
}
export const goRecalculate = (params) => {
  return service({
    url: '/moneyUserSlot/recalculate',
    method: 'get',
    params
  })
}
