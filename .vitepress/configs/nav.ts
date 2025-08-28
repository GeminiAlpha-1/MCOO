import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '主页', link: '/' },
  { text: '知识库', link: '/docs/01.知识库/wiki栏目说明' },
  { text: '工具箱', link: '/docs/00.杂七杂八/工具索引' },
  { text: '项目', link: '/docs/99.项目库/项目栏目说明' },
  {
    text: '其他',
    items: [
      { text: '团队介绍', link: '/docs/00.杂七杂八/团队介绍' },
      { text: '发展脉络', link: '/docs/00.杂七杂八/发展脉络' },
      { text: '登の窝', link: 'http://doc.rseg.club/' },
      { text: '筱莫的博客', link: 'https://blog.mostu.cn/' }
    ]
  },
  {
    text: '博物馆',
    items: [{ text: '栏目说明', link: '/docs/98.博物馆/博物馆栏目说明' }]
  }
]