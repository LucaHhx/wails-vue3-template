import service from '@/utils/request'

const BaseUrl = (cluster_id) => {
  return `/kubernetes/proxy/${cluster_id}/apis/apps/v1/deployments`
}

const BaseNamespaceUrl = (cluster_id, namespace) => {
  return `/kubernetes/proxy/${cluster_id}/apis/apps/v1/namespaces/${namespace}/deployments`
}

export const DeploymentsList = (cluster_id, page, pageSize, namespace, keywords) => {
  if (namespace && namespace !== 'All Namespaces') {
    return service({
      url: `${BaseNamespaceUrl(cluster_id, namespace)}?search=true&keywords=${keywords}&page=${page}&pageSize=${pageSize}`,
      method: 'get',
    })
  }
  return service({
    url: `${BaseUrl(cluster_id)}?search=true&keywords=${keywords}&page=${page}&pageSize=${pageSize}`,
    method: 'get',
  })
}

export const DeploymentsGet = (cluster_id, namespace, name) => {
  return service({
    url: `${BaseNamespaceUrl(cluster_id, namespace)}/${name}`,
    method: 'get',
  })
}

export const DeploymentsCreate = (cluster_id, namespace, data) => {
  return service({
    url: `${BaseNamespaceUrl(cluster_id, namespace)}`,
    method: 'post',
    data
  })
}

export const DeploymentsUpdate = (cluster_id, namespace, name,data) => {
  return service({
    url: `${BaseNamespaceUrl(cluster_id, namespace)}/${name}?namespace=${namespace}`,
    method: 'put',
    data
  })
}

export const DeploymentsPatch = (cluster_id, namespace, name, data) => {
  return service({
    url: `${BaseNamespaceUrl(cluster_id, namespace)}/${name}?namespace=${namespace}`,
    method: 'patch',
    data
  })
}

export const DeploymentsDelete = (cluster_id, namespace, name) => {
  return service({
    url: `${BaseNamespaceUrl(cluster_id, namespace)}/${name}`,
    method: 'delete',
  })
}
