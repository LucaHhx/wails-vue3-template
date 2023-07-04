import service from '@/utils/request'

const BaseUrl = (cluster_id) => {
  return `/kubernetes/proxy/${cluster_id}/apis/autoscaling/v2beta2/horizontalpodautoscalers`
}

const BaseNamespaceUrl = (cluster_id, namespace) => {
  return `/kubernetes/proxy/${cluster_id}/apis/autoscaling/v2beta2/namespaces/${namespace}/horizontalpodautoscalers`
}

export const HorizontalPodautoscalersList = (cluster_id, page, pageSize, namespace, keywords, labelSelector) => {
  if (namespace && namespace !== 'All Namespaces') {
    return service({
      url: `${BaseNamespaceUrl(cluster_id)}?search=true&keywords=${keywords}&page=${page}&pageSize=${pageSize}&labelSelector=${labelSelector}&namespace=${namespace}`,
      method: 'get',
    })
  }
  return service({
    url: `${BaseUrl(cluster_id)}?search=true&keywords=${keywords}&page=${page}&pageSize=${pageSize}`,
    method: 'get',
  })
}

export const HorizontalPodautoscalersGet = (cluster_id, namespace, name) => {
  return service({
    url: `${BaseNamespaceUrl(cluster_id, namespace)}/${name}`,
    method: 'get',
  })
}

export const HorizontalPodautoscalersCreate = (cluster_id, namespace, data) => {
  return service({
    url: `${BaseNamespaceUrl(cluster_id, namespace)}`,
    method: 'post',
    data
  })
}

export const HorizontalPodautoscalersUpdate = (cluster_id, namespace, name,  data) => {
  return service({
    url: `${BaseNamespaceUrl(cluster_id, namespace)}/${name}`,
    method: 'put',
    data
  })
}

export const HorizontalPodautoscalersDelete = (cluster_id, namespace, name) => {
  return service({
    url: `${BaseNamespaceUrl(cluster_id, namespace)}/${name}`,
    method: 'delete',
  })
}