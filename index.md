---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "MCOO墨客小筑"
  text: "这只是互联网里的一块不起眼的角落，偶尔路过便好。"
  tagline: “而我的心略大于整个宇宙。”
  image:
    src: /background.svg
    alt: 主页右侧背景大图
  actions:
    - theme: brand
      text: 爱发电主页
      link: https://afdian.com/a/mcooooo
    - theme: alt
      text: 前往知识库 →
      link: /doc_wiki/wiki栏目说明

---
<script setup>
import DynamicFeatureBox from './.vitepress/theme/components/DynamicFeatureBox.vue'
</script>

<div class="features-container">
  <DynamicFeatureBox title="🥳 最新公告 📣" sub-title="⏱️ 站点动态与重要通知" folder="doc_notic" :max="3" />
  <DynamicFeatureBox title="📚 知识仓库 🧐" sub-title="⏳ 搜集各类知识点与小技巧" folder="doc_wiki" :max="3" />
  <DynamicFeatureBox title="💡 社区文章 📝" sub-title="🎞️ 用户分享与经验交流" folder="doc_doc" :max="3" />
</div>

<style scoped>
.features-container {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-top: 2.5rem;
}

@media (max-width: 768px) {
  .features-container {
    flex-direction: column;
  }
}
</style>
