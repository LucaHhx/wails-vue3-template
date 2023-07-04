import service from '@/utils/request'

const BaseUrl = (cluster_id) => {
  return `/kubernetes/proxy/${cluster_id}/api/v1/secrets`
}

const BaseNamespaceUrl = (cluster_id, namespace) => {
  return `/kubernetes/proxy/${cluster_id}/api/v1/namespaces/${namespace}/secrets`
}

export const SecretsList = (cluster_id, page, pageSize, namespace, keywords, labelSelector) => {
  if (namespace && namespace !== 'All Namespaces') {
    return service({
      url: `${BaseNamespaceUrl(cluster_id, namespace)}?search=true&keywords=${keywords}&page=${page}&pageSize=${pageSize}&labelSelector=${labelSelector}`,
      method: 'get',
    })
  }
  return service({
    url: `${BaseUrl(cluster_id)}?search=true&keywords=${keywords}&page=${page}&pageSize=${pageSize}`,
    method: 'get',
  })
}

export const SecretsGet = (cluster_id, namespace, name) => {
  return service({
    url: `${BaseNamespaceUrl(cluster_id, namespace)}/${name}`,
    method: 'get',
  })
}

export const SecretsCreate = (cluster_id, namespace, data) => {
  return service({
    url: `${BaseNamespaceUrl(cluster_id, namespace)}`,
    method: 'post',
    data
  })
}

export const SecretsUpdate = (cluster_id, namespace, name, data) => {
  return service({
    url: `${BaseNamespaceUrl(cluster_id, namespace)}/${name}`,
    method: 'put',
    data
  })
}

export const SecretsDelete = (cluster_id, namespace, name) => {
  return service({
    url: `${BaseNamespaceUrl(cluster_id, namespace)}/${name}`,
    method: 'delete',
  })
}
