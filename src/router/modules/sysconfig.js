import layoutHeaderAside from '@/layout/header-aside'
const meta = { auth: true }
// export default {
//   path: '/article',
//   name: 'article',
//   component: () => import('@/pages/article/Index.vue'),
//   meta: { meta, title: '文章' }
// }

export default {
  path: '/sysconfig',
  name: 'sysconfig',
  meta,
  redirect: { name: 'sysconfig-index' },
  component: layoutHeaderAside,
  children: [
    { path: 'index', name: 'sysconfig-index', component: () => import('@/pages/sysconfig'), meta: { ...meta, title: '系统配置首页' } }
  ]
}
