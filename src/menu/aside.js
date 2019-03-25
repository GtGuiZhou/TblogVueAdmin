// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  { path: '/sysconfig', title: '系统配置', icon: 'cog' },
  {
    title: '文章',
    icon: 'folder-o',
    children: [
      { path: '/article/add', title: '添加' },
      { path: '/article/list', title: '列表' },
      { path: '/article/recover', title: '回收站' }
    ]
  },
  {
    title: '文件管理',
    icon: 'folder-o',
    children: [
      { path: '/filesys', title: '首页' }
    ]
  },
  {
    title: '重要信息',
    icon: 'folder-o',
    children: [
      { path: '/important/index', title: '首页' },
      { path: '/important/recover', title: '回收站' }
    ]
  },
  {
    title: '音乐管理',
    icon: 'folder-o',
    children: [
      { path: '/music/index', title: '首页' },
      { path: '/music/add', title: '新增' },
      { path: '/music/recover', title: '回收站' },
    ]
  }
]
