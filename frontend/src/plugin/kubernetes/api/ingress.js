import service from '@/utils/request'

const BaseUrl = (cluster_id) => {
  return `/kubernetes/proxy/${cluster_id}/apis/networking.k8s.io/v1/ingresses`
}

const BaseNamespaceUrl = (cluster_id, namespace) => {
  return `/kubernetes/proxy/${cluster_id}/apis/networking.k8s.io/v1/namespaces/${namespace}/ingresses`
}

export const IngressesList = (cluster_id, page, pageSize, namespace, keywords, labelSelector, fieldSelector) => {
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

export const IngressesGet = (cluster_id, namespace, name) => {
  return service({
    url: `${BaseNamespaceUrl(cluster_id, namespace)}/${name}`,
    method: 'get',
  })
}

export const IngressesCreate = (cluster_id, namespace, data) => {
  return service({
    url: `${BaseNamespaceUrl(cluster_id, namespace)}`,
    method: 'post',
    data
  })
}

export const IngressesUpdate = (cluster_id, namespace, name, data) => {
  return service({
    url: `${BaseNamespaceUrl(cluster_id, namespace)}/${name}`,
    method: 'put',
    data
  })
}

export const IngressesDelete = (cluster_id, namespace, name) => {
  return service({
    url: `${BaseNamespaceUrl(cluster_id, namespace)}/${name}`,
    method: 'delete',
  })
}
