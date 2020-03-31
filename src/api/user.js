import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/attenc/auth/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/attenc/camel/users',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
