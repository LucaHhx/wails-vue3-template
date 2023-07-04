import service from '@/utils/request'

const BaseUrl = (cluster_id) => {
  return `/kubernetes/proxy/${cluster_id}/api/v1/pods`
}

const BaseNamespaceUrl = (cluster_id, namespace) => {
  return `/kubernetes/proxy/${cluster_id}/api/v1/namespaces/${namespace}/pods`
}

const EvictionUrl = (cluster_id, namespace, name) => {
  return `/kubernetes/proxy/${cluster_id}/api/v1/namespaces/${namespace}/pods/${name}/eviction`
}

export const PodsList = (cluster_id, page, pageSize, namespace, keywords, labelSelector, fieldSelector) => {
  if (namespace && namespace !== 'All Namespaces') {
    return service({
      url: `${BaseNamespaceUrl(cluster_id, namespace)}?search=true&keywords=${keywords}&page=${page}&pageSize=${pageSize}&labelSelector=${labelSelector}&fieldSelector=${fieldSelector}`,
      method: 'get',
    })
  }
  return service({
    url: `${BaseUrl(cluster_id)}?search=true&keywords=${keywords}&page=${page}&pageSize=${pageSize}&labelSelector=${labelSelector}&fieldSelector=${fieldSelector}`,
    method: 'get',
  })
}

export const PodsGet = (cluster_id, namespace, name) => {
  return service({
    url: `${BaseNamespaceUrl(cluster_id, namespace)}/${name}`,
    method: 'get',
  })
}

export const PodsCreate = (cluster_id, namespace, data) => {
  return service({
    url: `${BaseNamespaceUrl(cluster_id, namespace)}`,
    method: 'post',
    data
  })
}

export const PodsUpdate = (cluster_id, namespace, name, data) => {
  return service({
    url: `${BaseNamespaceUrl(cluster_id, namespace)}/${name}`,
    method: 'put',
    data
  })
}

export const PodsDelete = (cluster_id, namespace, name) => {
  return service({
    url: `${BaseNamespaceUrl(cluster_id, namespace)}/${name}`,
    method: 'delete',
  })
}

export const Podseviction = (cluster_id, name, namespaces, data) => {
  return service({
    url: `${EvictionUrl(cluster_id, namespaces, name)}`,
    method: 'post',
    data
  })
}
