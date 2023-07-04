import service from '@/utils/request'

// @Tags Txn
// @Summary 创建Txn
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Txn true "创建Txn"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /txn/createTxn [post]
export const createTxn = (data) => {
  return service({
    url: '/txn/createTxn',
    method: 'post',
    data
  })
}

// @Tags Txn
// @Summary 删除Txn
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Txn true "删除Txn"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /txn/deleteTxn [delete]
export const deleteTxn = (data) => {
  return service({
    url: '/txn/deleteTxn',
    method: 'delete',
    data
  })
}

// @Tags Txn
// @Summary 删除Txn
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除Txn"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /txn/deleteTxn [delete]
export const deleteTxnByIds = (data) => {
  return service({
    url: '/txn/deleteTxnByIds',
    method: 'delete',
    data
  })
}

// @Tags Txn
// @Summary 更新Txn
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Txn true "更新Txn"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /txn/updateTxn [put]
export const updateTxn = (data) => {
  return service({
    url: '/txn/updateTxn',
    method: 'put',
    data
  })
}

// @Tags Txn
// @Summary 用id查询Txn
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.Txn true "用id查询Txn"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /txn/findTxn [get]
export const findTxn = (params) => {
  return service({
    url: '/txn/findTxn',
    method: 'get',
    params
  })
}

// @Tags Txn
// @Summary 分页获取Txn列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取Txn列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /txn/getTxnList [get]
export const getTxnList = (params) => {
  return service({
    url: '/txn/getTxnList',
    method: 'get',
    params
  })
}
