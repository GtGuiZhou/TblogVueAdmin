import layoutHeaderAside from '@/layout/header-aside'
const meta = { auth: true }
// export default {
//   path: '/article',
//   name: 'article',
//   component: () => import('@/pages/article/Index.vue'),
//   meta: { meta, title: '文章' }
// }

export default {
  path: '/article',
  name: 'article',
  meta,
  redirect: { name: 'article-list' },
  component: layoutHeaderAside,
  children: [
    { path: 'list/:tag?', name: 'article-list', component: () => import('@/pages/article'), meta: { ...meta, title: '文章列表' } },
    { path: 'add', name: 'article-add', component: () => import('@/pages/article/add'), meta: { ...meta, title: '文章添加' } },
    { path: 'view/:id', name: 'article-view', component: () => import('@/pages/article/view'), meta: { ...meta, title: '文章查看' } },
    { path: 'update/:id', name: 'article-update', component: () => import('@/pages/article/update'), meta: { ...meta, title: '文章编辑' } },
    { path: 'recover', name: 'article-recover', component: () => import('@/pages/article/recover'), meta: { ...meta, title: '文章恢复' } },
  ]
}
