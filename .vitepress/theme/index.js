// https://vitepress.dev/guide/custom-theme
import { watch } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style/index.css'
import './style.css'
import './style/custom-block.css'
import './style/scrollbar.css'
import googleAnalytics from 'vitepress-plugin-google-analytics'

import BiliVideo from './components/BiliVideo.vue'
import NeteaseMusic from './components/NeteaseMusic.vue'
import Lifang from './components/Lifang.vue'
import ColorConverter from './components/ColorConverter.vue'
import MarkdownEditor from './components/MarkdownEditor.vue'
import TableEditor from './components/TableEditor.vue'
import MNavLinks from './components/MNavLinks.vue'
import Linkcard from "./components/Linkcard.vue"
import update from "./components/update.vue"
import MyLayout from './components/MyLayout.vue'
import { inBrowser } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'
import HtmlEmbed from './components/HtmlEmbed.vue'



// 彩虹背景动画样式
let homePageStyle

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: MyLayout,

  enhanceApp({ app, router }) {
    // busuanzi //
    if (inBrowser) {
      router.onAfterRouteChanged = () => {
        busuanzi.fetch()
      }
    }

    // ---------- Google Analytics ----------
    googleAnalytics({ id: 'G-E4KK2M4V47' })   // 换成你的 GA ID

    // 注册全局组件
    app.component('BiliVideo', BiliVideo)
    app.component('NeteaseMusic', NeteaseMusic)
    app.component('Lifang', Lifang)
    app.component('ColorConverter', ColorConverter)
    app.component('MarkdownEditor', MarkdownEditor)
    app.component('TableEditor', TableEditor)
    app.component('MNavLinks', MNavLinks)
    app.component('Linkcard' , Linkcard)
    app.component('update' , update)
    app.component('HtmlEmbed', HtmlEmbed)

    // 彩虹背景动画样式
    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () => updateHomePageStyle(location.pathname === '/'),
        { immediate: true }
      )
    }
  }
}

/* 彩虹背景动画样式 */
function updateHomePageStyle(isHome) {
  if (isHome) {
    if (homePageStyle) return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }
    @keyframes rainbow {
      0%   { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }`
    document.body.appendChild(homePageStyle)
  } else {
    if (!homePageStyle) return
    homePageStyle.remove()
    homePageStyle = undefined
  }
}
