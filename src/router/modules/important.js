import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/important',
  name: 'important',
  meta,
  redirect: { name: 'important-recover' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'index', name: `${pre}index`, component: () => import('@/pages/important/index'), meta: { ...meta, title: '重要信息首页' } },
    { path: 'recover', name: `${pre}recover`, component: () => import('@/pages/important/recover'), meta: { ...meta, title: '重要信息回收站' } },
  ])('important-')
}
