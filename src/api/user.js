import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/attenc/auth/login',
    method: 'post',
    data
  })
}