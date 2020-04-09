import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/attenc/camel/menus',
    method: 'get'
  })
}
