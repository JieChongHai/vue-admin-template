import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/attenc/auth/login',
    method: 'post',
    data
  })
}

export function fetchList(query) {
  return request({
    url: '/attenc/camel/users',
    method: 'get',
    params: query
  })
}

export function remove(username) {
  return request({
    url: '/attenc/camel/user/' + username,
    method: 'delete'
  })
}

export function create(data) {
  return request({
    url: '/attenc/camel/user',
    method: 'post',
    data
  })
}

export function detail(username) {
  const url = '/attenc/camel/user/' + username + '/full'
  return request({
    url: url,
    method: 'get'
  })
}

export function update(username, data) {
  return request({
    url: '/attenc/camel/user/' + username,
    method: 'put',
    data
  })
}

export function updatePassword(username, data) {
  const url = '/attenc/camel/user/' + username + '/password'
  return request({
    url: url,
    method: 'put',
    data
  })
}
