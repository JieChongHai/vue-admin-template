import Layout from '@/layout'

// todo
export const merchantRouter = {
  path: '/merchant',
  component: Layout,
  redirect: 'noRedirect',
  name: '商户',
  meta: {
    title: 'Merchant Manage',
    icon: 'merchant-manage'
  },
  children: [
    {
      path: 'create',
      component: () => import('@/views/merchant/create'),
      name: 'create',
      meta: { title: 'Merchant Create', roles: [1, 2] }
    },
    {
      path: 'update',
      component: () => import('@/views/merchant/update'),
      name: 'update',
      meta: { title: 'Merchant Update', roles: [1, 2, 3] }
    },
    {
      path: 'detail',
      component: () => import('@/views/merchant/detail'),
      name: 'detail',
      meta: { title: 'Merchant Detail', roles: [1, 2, 3] }
    }
  ]
}

export const merchantsRouter = {
  path: '/merchants',
  component: Layout,
  redirect: '/merchants/list',
  name: 'merchants',
  children: [
    {
      path: 'list',
      component: () => import('@/views/merchant/list'),
      name: 'List',
      meta: { title: 'Merchant List', icon: 'merchant', roles: [1, 2] }
    },
    {
      hidden: true,
      path: 'update/:intMerCode',
      component: () => import('@/views/merchant/update'),
      name: 'update',
      meta: { title: 'Merchant Update', roles: [1, 2], activeMenu: '/merchants/list' }
    },
    {
      hidden: true,
      path: 'detail/:intMerCode',
      component: () => import('@/views/merchant/detail'),
      name: 'detail',
      meta: { title: 'Merchant Detail', roles: [1, 2], activeMenu: '/merchants/list' }
    }
  ]
}

