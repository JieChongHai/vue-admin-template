import Layout from '@/layout'

// todo/all/done/submitted
export const jobsRouter = {
  path: '/jobs',
  component: Layout,
  redirect: 'noRedirect',
  name: '审核任务',
  meta: {
    title: 'Audit Jobs',
    icon: 'jobs'
  },
  children: [
    {
      path: 'todo',
      component: () => import('@/views/error-page/401'),
      name: 'todo',
      meta: { title: 'Todo Job', roles: [1, 2, 3] }
    },
    {
      path: 'all',
      component: () => import('@/views/error-page/401'),
      name: 'all',
      meta: { title: 'All Job', roles: [1, 2, 3] }
    },
    {
      path: 'submitted',
      component: () => import('@/views/error-page/401'),
      name: 'submitted',
      meta: { title: 'Submitted Job', roles: [1, 2, 3] }
    },
    {
      path: 'done',
      component: () => import('@/views/error-page/401'),
      name: 'done',
      meta: { title: 'Done Job', roles: [1, 2, 3] }
    },
    {
      hidden: true,
      path: 'detail',
      component: () => import('@/views/error-page/401'),
      name: 'done',
      meta: { title: 'Done Job', roles: [1, 2, 3] }
    }
  ]
}

