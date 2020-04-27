import Layout from '@/layout'

// todo
export const storeRouter = {
  path: '/store',
  component: Layout,
  redirect: 'noRedirect',
  name: '门店',
  meta: {
    title: 'Store Manage',
    icon: 'store-manage'
  },
  children: [
    {
      path: 'create',
      component: () => import('@/views/store/create'),
      name: 'create',
      meta: { title: 'Store Create', roles: [1, 2, 3] }
    },
    {
      path: 'update',
      component: () => import('@/views/error-page/401'),
      name: 'update',
      meta: { title: 'Store Update', roles: [1, 2, 3, 4] }
    },
    {
      path: 'detail',
      component: () => import('@/views/error-page/401'),
      name: 'detail',
      meta: { title: 'Store Detail', roles: [1, 2, 3, 4] }
    }
  ]
}

export const storesRouter = {
  path: '/stores',
  component: Layout,
  redirect: '/stores/list',
  name: 'stores',
  children: [
    {
      path: 'list',
      component: () => import('@/views/store/list'),
      name: 'List',
      meta: { title: 'Store List', icon: 'store', roles: [1, 2, 3] }
    },
    {
      hidden: true,
      path: 'update',
      component: () => import('@/views/error-page/401'),
      name: 'update',
      meta: { title: 'Store Update', roles: [1, 2, 3] }
    },
    {
      hidden: true,
      path: 'remove',
      component: () => import('@/views/error-page/401'),
      name: 'remove',
      meta: { title: 'Store remove', roles: [1, 2, 3] }
    },
    {
      hidden: true,
      path: 'detail',
      component: () => import('@/views/error-page/401'),
      name: 'detail',
      meta: { title: 'Store Detail', roles: [1, 2, 3] }
    }
  ]
}

