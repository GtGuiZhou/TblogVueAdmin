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
    { path: 'page2', name: `${pre}page2`, component: () => import('@/pages/demo/page2'), meta: { ...meta, title: '页面 2' } },
    { path: 'page3', name: `${pre}page3`, component: () => import('@/pages/demo/page3'), meta: { ...meta, title: '页面 3' } }
  ])('filesys-')
}
