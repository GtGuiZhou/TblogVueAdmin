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
      { path: '/music/recover', title: '回收站' }
    ]
  },
  {
    title: '演示页面',
    icon: 'folder-o',
    children: [
      { path: '/demo/page1', title: '页面 1' },
      { path: '/demo/page2', title: '页面 2' },
      { path: '/demo/page3', title: '页面 3' }
    ]
  }
]
