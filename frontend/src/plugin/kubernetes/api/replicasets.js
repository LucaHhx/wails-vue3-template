import service from '@/utils/request'
const BaseUrl = (cluster_id, namespace) => {
  return `/kubernetes/proxy/${cluster_id}/apis/apps/v1/namespaces/${namespace}/replicasets`
}

export function ReplicaSetsList(cluster_id, namespace, selector) {
  return service({
    url: `${BaseUrl(cluster_id, namespace)}?search=true&labelSelector=${selector}+&namespace=${namespace}`,
    method: 'get',
  })
}
