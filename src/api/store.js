import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/attenc/camel/stores',
    method: 'get',
    params: query
  })
}

export function remove(intStoreCode) {
  const url = '/attenc/camel/store/' + intStoreCode
  return request({
    url: url,
    method: 'delete'
  })
}

export function fetchDetail(intStoreCode) {
  const url = '/attenc/camel/store/' + intStoreCode + '/full'
  return request({
    url: url,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/attenc/camel/store',
    method: 'post',
    data
  })
}

export function update(intStoreCode, data) {
  const url = '/attenc/camel/store/' + intStoreCode
  return request({
    url: url,
    method: 'put',
    data
  })
}

