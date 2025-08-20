// .vitepress/theme/index.js
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import busuanzi from 'busuanzi.pure.js'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout() {
    // 在页面底部插入计数器
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () =>
        h(
          'div',
          {
            style: {
              textAlign: 'center',
              fontSize: '0.85em',
              color: '#666',
              margin: '2rem 0'
            }
          },
          [
            '🤯 Busuanzi全网累计访问量 ',
            h('span', { id: 'busuanzi_value_site_pv' }),
            ' 次，😱 全网累计访客数 ',
            h('span', { id: 'busuanzi_value_site_uv' }),
            ' 人次'
          ]
        )
    })
  },
  enhanceApp({ router }) {
    // 浏览器环境才执行
    if (typeof window !== 'undefined') {
      busuanzi.fetch()                      // 首次加载
      router.onAfterRouteChanged = () => busuanzi.fetch() // 路由切换后重新统计
    }
  }
}
