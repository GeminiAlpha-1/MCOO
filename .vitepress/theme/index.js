// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import BiliVideo from './components/BiliVideo.vue'
//注册BiliVideo插件
import NeteaseMusic from './components/NeteaseMusic.vue'
//注册NeteaseMusic插件
import Emoji from './components/Emoji.vue'
//注册Emoji插件

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('BiliVideo', BiliVideo)
    //注册BiliVideo插件
    app.component('NeteaseMusic', NeteaseMusic)
    //注册NeteaseMusic插件
    app.component('Emoji', Emoji)
    //注册Emoji插件
  }
}