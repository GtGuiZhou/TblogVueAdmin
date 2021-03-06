import layoutHeaderAside from '@/layout/header-aside'

const module = 'music'
const moduleName = '音乐'

const meta = { auth: true }

export default {
  path: `/${module}`,
  name: module,
  meta,
  redirect: { name: `${module}-index` },
  component: layoutHeaderAside,
  children: ([
    { path: 'index', name: `${module}-index`, component: () => import(`@/pages/${module}/index`), meta: { ...meta, title: `${moduleName}首页` } },
    { path: 'add', name: `${module}-add`, component: () => import(`@/pages/${module}/add`), meta: { ...meta, title: `${moduleName}新增` } },
    { path: 'update/:id', name: `${module}-update`, component: () => import(`@/pages/${module}/update`), meta: { ...meta, title: `${moduleName}编辑` } },
    { path: 'recover', name: `${module}-recover`, component: () => import(`@/pages/${module}/recover`), meta: { ...meta, title: `${moduleName}回收站` } },
    // { path: 'view', name: `${module}-view`, component: () => import(`@/pages/${module}/view`), meta: { ...meta, title: `${moduleName}查看` } }
  ])
}
