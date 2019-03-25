import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/filesys',
  name: 'filesys',
  meta,
  redirect: { name: 'filesys-index' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'filesys/sys', name: `${pre}index`, component: () => import('@/pages/filesys/index'), meta: { ...meta, title: '文件管理首页' } },
  ])('filesys-')
}
