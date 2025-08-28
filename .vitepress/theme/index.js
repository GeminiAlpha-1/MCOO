// https://vitepress.dev/guide/custom-theme
import { h, watch } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style/index.css'
import './style.css'
import './style/custom-block.css'
import './style/scrollbar.css'

import BiliVideo from './components/BiliVideo.vue'
import NeteaseMusic from './components/NeteaseMusic.vue'
import Lifang from './components/Lifang.vue'
import ColorConverter from './components/ColorConverter.vue'
import MarkdownEditor from './components/MarkdownEditor.vue'
import TableEditor from './components/TableEditor.vue'
import MNavLinks from './components/MNavLinks.vue'
import Linkcard from "./components/Linkcard.vue"

// 彩虹背景动画样式
let homePageStyle

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,

  Layout() {
    const { frontmatter } = useData()
    const props = {}

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }

    return h(DefaultTheme.Layout, props, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },

  enhanceApp({ app, router }) {
    // 注册全局组件
    app.component('BiliVideo', BiliVideo)
    app.component('NeteaseMusic', NeteaseMusic)
    app.component('Lifang', Lifang)
    app.component('ColorConverter', ColorConverter)
    app.component('MarkdownEditor', MarkdownEditor)
    app.component('TableEditor', TableEditor)
    app.component('MNavLinks', MNavLinks)
    app.component('Linkcard' , Linkcard)

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