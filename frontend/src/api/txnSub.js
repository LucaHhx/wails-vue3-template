import service from '@/utils/request'

// @Tags TxnSub
// @Summary 创建TxnSub
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.TxnSub true "创建TxnSub"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /txnSub/createTxnSub [post]
export const createTxnSub = (data) => {
  return service({
    url: '/txnSub/createTxnSub',
    method: 'post',
    data
  })
}

// @Tags TxnSub
// @Summary 删除TxnSub
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.TxnSub true "删除TxnSub"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /txnSub/deleteTxnSub [delete]
export const deleteTxnSub = (data) => {
  return service({
    url: '/txnSub/deleteTxnSub',
    method: 'delete',
    data
  })
}

// @Tags TxnSub
// @Summary 删除TxnSub
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除TxnSub"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /txnSub/deleteTxnSub [delete]
export const deleteTxnSubByIds = (data) => {
  return service({
    url: '/txnSub/deleteTxnSubByIds',
    method: 'delete',
    data
  })
}

// @Tags TxnSub
// @Summary 更新TxnSub
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.TxnSub true "更新TxnSub"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /txnSub/updateTxnSub [put]
export const updateTxnSub = (data) => {
  return service({
    url: '/txnSub/updateTxnSub',
    method: 'put',
    data
  })
}

// @Tags TxnSub
// @Summary 用id查询TxnSub
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.TxnSub true "用id查询TxnSub"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /txnSub/findTxnSub [get]
export const findTxnSub = (params) => {
  return service({
    url: '/txnSub/findTxnSub',
    method: 'get',
    params
  })
}

// @Tags TxnSub
// @Summary 分页获取TxnSub列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取TxnSub列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /txnSub/getTxnSubList [get]
export const getTxnSubList = (params) => {
  return service({
    url: '/txnSub/getTxnSubList',
    method: 'get',
    params
  })
}
