import service from '@/utils/request'

const BaseUrl = (cluster_id) => {
  return `/kubernetes/proxy/${cluster_id}`
}

export const NodeMetricsList = (cluster_id, data) => {
  return service({
    url: `${BaseUrl(cluster_id)}/apis/metrics.k8s.io/v1beta1/nodes?search=true`,
    method: 'get',
    data
  })
}

export const PodsMetricsList = (cluster_id, namespace, labelSelector) => {
  return service({
    url: `${BaseUrl(cluster_id)}/apis/metrics.k8s.io/v1beta1/pods?search=true&fieldSelector=metadata.namespace=${namespace}&labelSelector=${labelSelector}&namespace=${namespace}`,
    method: 'get',
  })
}

export const GetMetrics = (data) => {
  return service({
    url: '/kubernetes/metrics/get',
    method: 'post',
    data
  })
}
