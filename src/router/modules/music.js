import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/music',
  name: 'music',
  meta,
  redirect: { name: 'music-index' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'music/index', name: `${pre}index`, component: () => import('@/pages/music/index'), meta: { ...meta, title: '音乐管理首页' } },
  ])('music-')
}
