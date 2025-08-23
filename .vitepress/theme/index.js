// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import BiliVideo from './components/BiliVideo.vue'
import NeteaseMusic from './components/NeteaseMusic.vue'
import Lifang from './components/Lifang.vue'
import ColorConverter from './components/ColorConverter.vue'
import MarkdownEditor from './components/MarkdownEditor.vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots Cylinder.vue
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('BiliVideo', BiliVideo)
    app.component('NeteaseMusic', NeteaseMusic)
    app.component('Lifang', Lifang)
    app.component('ColorConverter', ColorConverter)
    app.component('MarkdownEditor', MarkdownEditor)
  }
}