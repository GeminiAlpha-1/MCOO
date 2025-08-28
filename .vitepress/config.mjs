import { defineConfig } from 'vitepress'
import { nav, sidebar, socialLinks } from './configs'

export default defineConfig({
  base: '/',
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  title: 'MCOO墨客小筑',
  description: 'A VitePress Site',
  appearance: true,
  lastUpdated: true,
  markdown: {
    config: (md) => {
      md.set({ html: true })
    }
  },
  themeConfig: {
    outlineTitle: '文章目录',
    outline: [2, 6],
    logo: '/logo2.svg',

    nav,           // ← 已拆分
    sidebar,       // ← 已拆分
    socialLinks,   // ← 已拆分

    footer: {
      copyright: 'Copyright © 2020 Alioth Dream Studios'
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索内容',
            buttonAriaLabel: '搜索内容'
          },
          modal: {
            noResultsText: '无结果',
            resetButtonTitle: '清除',
            footer: {
              selectText: '选择',
              navigateText: '切换'
            }
          }
        }
      }
    }
  }
})