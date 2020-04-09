import Layout from '@/layout'

export const userRouter = {
  path: '/users',
  component: Layout,
  redirect: '/users/list',
  name: 'users',
  meta: {
    title: 'user',
    icon: 'user'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/error-page/401'),
      name: 'List',
      meta: { title: 'User List', roles: [1, 2, 3] }
    }
  ]
}
// todo
