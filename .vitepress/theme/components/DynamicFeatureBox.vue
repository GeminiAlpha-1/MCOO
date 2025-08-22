<script setup lang="ts">
import { computed } from 'vue'
import { data } from '../../data/posts.data.mjs'

interface Props {
  title: string
  subTitle?: string   // ← 新增副标题
  folder: string
  max?: number
}
const props = withDefaults(defineProps<Props>(), { max: 3 })
const list = computed(() =>
  data
    .filter(p => p.file.startsWith(props.folder))
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, props.max)
)
</script>

<template>
  <div class="feature-box">
    <!-- 主标题 -->
    <h3 class="feature-title">{{ title }}</h3>
    <!-- 副标题（可选） -->
    <p v-if="subTitle" class="feature-subtitle">{{ subTitle }}</p>

    <!-- 文章列表 -->
    <ul v-if="list.length" class="feature-list">
      <li v-for="(item, idx) in list" :key="item.url">
        <span v-if="idx === 0" class="new-badge">🔥‼️</span>
        <a :href="item.url">{{ item.title }}</a>
      </li>
    </ul>

    <!-- 空状态 -->
    <p v-else class="empty-tip">暂无文章</p>
  </div>
</template>

<style scoped>
.feature-box {
  flex: 1;
  padding: 1.5rem 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}
.feature-title {
  margin: 0 0 0.25rem;
  font-size: 1.25rem;
  color: var(--vp-c-brand);
}
.feature-subtitle {
  margin: 0 0 0.75rem;
  font-size: 1.0rem;
  color: var(--vp-c-text-2);
}
.feature-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.feature-list li {
  margin: 0.2rem 0;
  font-size: 0.95rem;
  border-bottom: 1px solid rgb(219, 219, 219); /* 细横线 */
  padding-bottom: 0.1em;
}
.feature-list li:last-child {
  border-bottom: none; /* 最后一项去掉线 */
}
.new-badge {
  color: #f43f5e;
  font-size: 0.8rem;
  margin-right: 0.25rem;
}
.empty-tip {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
  font-style: italic;
}
a {
  color: var(--vp-c-text-1);
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>