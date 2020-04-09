import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/attenc/camel/roles',
    method: 'get',
    params: query
  })
}
// 查询单个角色的用户列表
export function fetchUsersList(id) {
  const url = '/attenc/camel/role/' + id + '/users'
  return request({
    url: url,
    method: 'get'
  })
}

export function fetchDetail(id) {
  const url = '/attenc/camel/role/' + id + '/full'
  return request({
    url: url,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/attenc/camel/role',
    method: 'post',
    data
  })
}

