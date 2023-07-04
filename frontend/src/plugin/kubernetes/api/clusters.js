import service from '@/utils/request'

export const getClustersList = (data) => {
  return service({
    url: '/kubernetes/clusters/list',
    method: 'post',
    data
  })
}

export const getClustersById = (data) => {
  return service({
    url: '/kubernetes/clusters/getById',
    method: 'post',
    data
  })
}

export const CreateCluster = (data) => {
  return service({
    url: '/kubernetes/clusters/create',
    method: 'post',
    data
  })
}

export const UpdateCluster = (data) => {
  return service({
    url: '/kubernetes/clusters/update',
    method: 'put',
    data
  })
}

export const DeleteCluster = (data) => {
  return service({
    url: '/kubernetes/clusters/delete',
    method: 'delete',
    data
  })
}

export const DeleteClusterByIds = (data) => {
  return service({
    url: '/kubernetes/clusters/deleteByIds',
    method: 'delete',
    data
  })
}
