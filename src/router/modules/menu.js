import Layout from '@/layout'

export const menusRouter = {
  path: '/menus',
  component: Layout,
  redirect: '/menus/list',
  name: 'menus',
  children: [
    {
      path: 'list',
      component: () => import('@/views/menu/list'),
      name: 'List',
      meta: { title: 'Menu List', icon: 'menu', roles: [1, 2] }
    }
  ]
}
