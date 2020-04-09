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

export function create(data) {
  return request({
    url: '/attenc/camel/merchant',
    method: 'post',
    data
  })
}

export function update(intMerCode, data) {
  const url = '/attenc/camel/merchant/' + intMerCode
  return request({
    url: url,
    method: 'put',
    data
  })
}

export function updateAuditConfig(intMerCode, data) {
  const url = '/attenc/camel/merchant/' + intMerCode + '/audit'
  return request({
    url: url,
    method: 'put',
    data
  })
}

export function findRoles(intMerCode) {
  const url = '/attenc/camel/merchant/' + intMerCode + '/roles'
  return request({
    url: url,
    method: 'get'
  })
}
// 导出门店列表 excel
export function report(query) {
  return request({
    url: '/attenc/camel/stores/report',
    method: 'get',
    params: query
  })
}
