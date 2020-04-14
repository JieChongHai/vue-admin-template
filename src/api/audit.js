import request from '@/utils/request'

export function fetchJobs(category, query) {
  return request({
    url: '/attenc/camel/jobs/' + category,
    method: 'get',
    params: query
  })
}

export function fetchJobDetail(jobID) {
  return request({
    url: '/attenc/camel/job/' + jobID,
    method: 'get'
  })
}
// 查询是否需要审核
export function enrollment(data) {
  return request({
    url: '/attenc/camel/audit/enrollment',
    method: 'post',
    data
  })
}
// 修改审核任务状态
export function submitted(token) {
  return request({
    url: '/attenc/camel/audit/submission/' + token,
    method: 'post'
  })
}
// 审核拒绝
export function reject(data) {
  return request({
    url: '/attenc/camel/audit/reject',
    method: 'post',
    data
  })
}
// 审核通过
export function resolve(data) {
  return request({
    url: '/attenc/camel/audit/resolve',
    method: 'post',
    data
  })
}
