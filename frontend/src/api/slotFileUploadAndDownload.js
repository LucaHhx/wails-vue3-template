import service from '@/utils/request'

// @Tags SlotFileUploadAndDownload
// @Summary 创建SlotFileUploadAndDownload
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotFileUploadAndDownload true "创建SlotFileUploadAndDownload"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /SlotFileUpAndDown/createSlotFileUploadAndDownload [post]
export const createSlotFileUploadAndDownload = (data) => {
  return service({
    url: '/SlotFileUpAndDown/createSlotFileUploadAndDownload',
    method: 'post',
    data
  })
}

// @Tags SlotFileUploadAndDownload
// @Summary 删除SlotFileUploadAndDownload
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotFileUploadAndDownload true "删除SlotFileUploadAndDownload"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /SlotFileUpAndDown/deleteSlotFileUploadAndDownload [delete]
export const deleteSlotFileUploadAndDownload = (data) => {
  return service({
    url: '/SlotFileUpAndDown/deleteSlotFileUploadAndDownload',
    method: 'delete',
    data
  })
}

// @Tags SlotFileUploadAndDownload
// @Summary 删除SlotFileUploadAndDownload
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除SlotFileUploadAndDownload"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /SlotFileUpAndDown/deleteSlotFileUploadAndDownload [delete]
export const deleteSlotFileUploadAndDownloadByIds = (data) => {
  return service({
    url: '/SlotFileUpAndDown/deleteSlotFileUploadAndDownloadByIds',
    method: 'delete',
    data
  })
}

// @Tags SlotFileUploadAndDownload
// @Summary 更新SlotFileUploadAndDownload
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SlotFileUploadAndDownload true "更新SlotFileUploadAndDownload"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /SlotFileUpAndDown/updateSlotFileUploadAndDownload [put]
export const updateSlotFileUploadAndDownload = (data) => {
  return service({
    url: '/SlotFileUpAndDown/updateSlotFileUploadAndDownload',
    method: 'put',
    data
  })
}

// @Tags SlotFileUploadAndDownload
// @Summary 用id查询SlotFileUploadAndDownload
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.SlotFileUploadAndDownload true "用id查询SlotFileUploadAndDownload"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /SlotFileUpAndDown/findSlotFileUploadAndDownload [get]
export const findSlotFileUploadAndDownload = (params) => {
  return service({
    url: '/SlotFileUpAndDown/findSlotFileUploadAndDownload',
    method: 'get',
    params
  })
}

// @Tags SlotFileUploadAndDownload
// @Summary 分页获取SlotFileUploadAndDownload列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取SlotFileUploadAndDownload列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /SlotFileUpAndDown/getSlotFileUploadAndDownloadList [get]
export const getSlotFileUploadAndDownloadList = (params) => {
  return service({
    url: '/SlotFileUpAndDown/getSlotFileUploadAndDownloadList',
    method: 'get',
    params
  })
}
