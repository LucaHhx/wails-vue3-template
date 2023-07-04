import service from '@/utils/request'

const BaseUrl = (cluster_id) => {
  return `/kubernetes/proxy/${cluster_id}/apis`
}

export const listResourceApi = (cluster_id, apiGroup, version) => {
  return service({
    url: `${BaseUrl(cluster_id)}/${apiGroup}/${version}`,
    method: 'get',
  })
}
