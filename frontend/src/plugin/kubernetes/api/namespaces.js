import service from '@/utils/request'

const BaseUrl = (cluster_id) => {
  return `/kubernetes/proxy/${cluster_id}/api/v1/namespaces`
}

export const NamespaceList = (cluster_id, page, pageSize, keywords) => {
  return service({
    url: `${BaseUrl(cluster_id)}?search=true&keywords=${keywords}&page=${page}&pageSize=${pageSize}`,
    method: 'get',
  })
}

export const NamespaceCreate = (cluster_id, data) => {
  return service({
    url: `${BaseUrl(cluster_id)}`,
    method: 'post',
    data
  })
}

export const NamespaceUpdate = (cluster_id, name, data) => {
  return service({
    url: `${BaseUrl(cluster_id)}/${name}`,
    method: 'put',
    data
  })
}

export const NamespaceDelete = (cluster_id, name) => {
  return service({
    url: `${BaseUrl(cluster_id)}/${name}`,
    method: 'delete',
  })
}
