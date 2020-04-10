import Layout from '@/layout'

// todo
export const userRouter = {
  path: '/user',
  component: Layout,
  redirect: 'noRedirect',
  name: '门店',
  meta: {
    title: 'User Manage',
    icon: 'user-manage'
  },
  children: [
    {
      path: 'create',
      component: () => import('@/views/user/create'),
      name: 'create',
      meta: { title: 'User Create', roles: [1, 2, 3, 4] }
    },
    {
      path: 'update',
      component: () => import('@/views/error-page/401'),
      name: 'update',
      meta: { title: 'User Update', roles: [1, 2, 3, 4] }
    },
    {
      path: 'remove',
      component: () => import('@/views/error-page/401'),
      name: 'remove',
      meta: { title: 'User remove', roles: [1, 2, 3, 4] }
    },
    {
      path: 'detail',
      component: () => import('@/views/error-page/401'),
      name: 'detail',
      meta: { title: 'User Detail', roles: [1, 2, 3, 4] }
    }
  ]
}

export const usersRouter = {
  path: '/users',
  component: Layout,
  redirect: '/users/list',
  name: 'users',
  meta: {
    title: 'Users',
    icon: 'user'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/user/list'),
      name: 'List',
      meta: { title: 'User List', roles: [1, 2, 3] }
    },
    {
      hidden: true,
      path: 'update',
      component: () => import('@/views/error-page/401'),
      name: 'update',
      meta: { title: 'User Update', roles: [1, 2, 3, 4] }
    },
    {
      hidden: true,
      path: 'remove',
      component: () => import('@/views/error-page/401'),
      name: 'remove',
      meta: { title: 'User remove', roles: [1, 2, 3, 4] }
    },
    {
      hidden: true,
      path: 'detail',
      component: () => import('@/views/error-page/401'),
      name: 'detail',
      meta: { title: 'User Detail', roles: [1, 2, 3, 4] }
    }
  ]
}
