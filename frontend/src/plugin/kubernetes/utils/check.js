
import { listResourceApi } from '@/plugin/kubernetes/api/apis'

export async function checkApi(cluster_name, api_group, version, resource) {
  let result = false
  const res = await listResourceApi(cluster_name, api_group, version)
  if (res.code === 0) {
    res.data.items.resources.forEach(function(item) {
      if (item.kind === resource) {
        result = true
      }
    })
  }
  return result
}

