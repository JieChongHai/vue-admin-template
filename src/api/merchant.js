import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/attenc/camel/merchants',
    method: 'get',
    params: query
  })
}

export function remove(intMerCode) {
  const url = '/attenc/camel/merchant/' + intMerCode
  return request({
    url: url,
    method: 'delete'
  })
}

export function fetchDetail(intMerCode) {
  const url = '/attenc/camel/merchant/' + intMerCode + '/full'
  return request({
    url: url,
    method: 'get'
  })
}
