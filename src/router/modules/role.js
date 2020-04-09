import Layout from '@/layout'

// todo
export const roleRouter = {
  path: '/role',
  component: Layout,
  redirect: 'noRedirect',
  name: '角色',
  meta: {
    title: 'Role Manage',
    icon: 'role-manage'
  },
  children: [
    {
      path: 'create',
      component: () => import('@/views/error-page/401'),
      name: 'create',
      meta: { title: 'Role Create', roles: [1, 2] }
    },
    {
      path: 'update',
      component: () => import('@/views/error-page/401'),
      name: 'update',
      meta: { title: 'Role Update', roles: [1, 2, 3, 4] }
    },
    {
      path: 'detail',
      component: () => import('@/views/error-page/401'),
      name: 'detail',
      meta: { title: 'Role Detail', roles: [1, 2, 3, 4] }
    }
  ]
}

export const rolesRouter = {
  path: '/roles',
  component: Layout,
  redirect: 'noRedirect',
  name: 'roles',
  meta: {
    title: 'Role List',
    icon: 'role'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/error-page/401'),
      name: 'List',
      meta: { title: 'Role List', roles: [1, 2, 3] }
    },
    {
      path: 'users',
      component: () => import('@/views/error-page/401'),
      name: 'Users',
      meta: { title: 'User List', roles: [1, 2, 3] }
    }
  ]
}

