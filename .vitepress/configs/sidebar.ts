import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = [
  {
    text: '「 📚 知识库」',
    items: [
      {
        text: 'VitePress',
        collapsed: false,
        items: [
          { text: '常用指令', link: '/docs/01.知识库/01.VitePress/00.常用指令' },
          { text: '实践页面', link: '/docs/01.知识库/01.VitePress/01.实践页面' },
          { text: '侧边栏与多级侧边栏', link: '/docs/01.知识库/01.VitePress/02.多级侧边栏' },
          { text: '可折叠侧边栏组', link: '/docs/01.知识库/01.VitePress/03.可折叠侧边栏' },
          { text: '页脚编辑', link: '/docs/01.知识库/01.VitePress/04.页脚编辑' },
          { text: '标题徽章', link: '/docs/01.知识库/01.VitePress/05.标题徽章' },
          { text: '团队页面', link: '/docs/01.知识库/01.VitePress/06.团队页面' },
          { text: '最后编辑时间', link: '/docs/01.知识库/01.VitePress/07.最后编辑时间' },
          { text: '嵌入视频播放器', link: '/docs/01.知识库/01.VitePress/08.嵌入视频播放页' },
          { text: '嵌入音乐播放器', link: '/docs/01.知识库/01.VitePress/09.嵌入音乐播放器' },
          { text: '首页文章自动更新', link: '/docs/01.知识库/01.VitePress/10.首页文章自动更新' },
          { text: '主题色', link: '/docs/01.知识库/01.VitePress/11.主题色' },
          { text: 'H1标题颜色', link: '/docs/01.知识库/01.VitePress/12.H1标题颜色' },
          { text: '去除链接下划线', link: '/docs/01.知识库/01.VitePress/13.去除链接下划线' },
          { text: '彩虹背景动画', link: '/docs/01.知识库/01.VitePress/14.彩虹背景动画' },
          { text: '引用颜色', link: '/docs/01.知识库/01.VitePress/15.引用颜色' },
          { text: '容器颜色', link: '/docs/01.知识库/01.VitePress/16.容器颜色' },
          { text: '导航栏毛玻璃', link: '/docs/01.知识库/01.VitePress/17.导航栏毛玻璃' },
          { text: '代码块', link: '/docs/01.知识库/01.VitePress/18.代码块' },
          { text: '代码组', link: '/docs/01.知识库/01.VitePress/19.代码组' },
          { text: '链接卡片', link: '/docs/01.知识库/01.VitePress/20.链接卡片' },
          { text: '代码精简', link: '/docs/01.知识库/01.VitePress/21.代码精简' },
          { text: '链接图标', link: '/docs/01.知识库/01.VitePress/22.链接图标' },
          { text: '记号笔', link: '/docs/01.知识库/01.VitePress/23.记号笔' },
          { text: '谷歌分析', link: '/docs/01.知识库/01.VitePress/24.谷歌分析' },
        ]
      }
    ]
  },
  {
    text: '「 💼 项目」',
    items: [
      { text: '▶︎ 栏目说明', link: '/docs/99.项目库/项目栏目说明' },
      {
        text: '💡 最新想法',
        collapsed: true,
        items: [{ text: '基岩版服务器', link: '/docs/99.项目库/01.想开一个基岩版服务器' }]
      },
      {
        text: '📂 工作进度',
        collapsed: true,
        items: [
          { text: 'Java版服务器', link: '/docs/99.项目库/02.Java版服务器现状' },
          { text: '研究VitePress插件', link: '/docs/99.项目库/03.研究VitePress插件' }
        ]
      }
    ]
  },
  {
    text: '「 💾 博物馆」',
    items: [
      { text: '▶︎ 栏目说明', link: '/docs/98.博物馆/博物馆栏目说明' },
      {
        text: '服务器相关',
        collapsed: true,
        items: [
          { text: 'GeDK服务器规定', link: '/docs/98.博物馆/01.服务器/01.GeDK服务器规定' },
          { text: 'GeDK服规试行版', link: '/docs/98.博物馆/01.服务器/02.GeDK服规试行版' },
          { text: '服务器部分可用指令', link: '/docs/98.博物馆/01.服务器/03.服务器部分可用指令' }
        ]
      }
    ]
  }
]