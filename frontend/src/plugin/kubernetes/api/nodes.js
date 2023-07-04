import service from '@/utils/request'

const BaseUrl = (cluster_id) => {
  return `/kubernetes/proxy/${cluster_id}/api/v1/nodes`
}

export const NodesList = (cluster_id, page, pageSize, keywords) => {
    return service({
      url: `${BaseUrl(cluster_id)}?search=true&keywords=${keywords}&page=${page}&pageSize=${pageSize}`,
      method: 'get',
    })
}

export const NodesGet = (cluster_id, name) => {
  return service({
    url: `${BaseUrl(cluster_id)}/${name}`,
    method: 'get',
  })
}

export const NodesUpdate = (cluster_id, name, data) => {
  return service({
    url: `${BaseUrl(cluster_id)}/${name}`,
    method: 'put',
    data
  })
}

export const NodesDelete = (cluster_id, name) => {
  return service({
    url: `${BaseUrl(cluster_id)}/${name}`,
    method: 'delete',
  })
}
