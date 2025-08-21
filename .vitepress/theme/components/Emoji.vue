<template>
  <ClientOnly>
    <div class="emoji-box">
      <span
        v-for="item in items"
        :key="item.id"
        class="emoji-cell"
        :class="{ voted: votedIds.has(item.id) }"
        @click="toggle(item)"
      >
        <span class="emoji">{{ item.emoji }}</span>
        <span class="count">{{ item.count }}</span>
      </span>
    </div>
  </ClientOnly>
</template>

<script setup>
import { reactive, ref } from 'vue'

/* 固定表情 */
const items = reactive([
  { id: 'like', emoji: '👍', count: 0 },
  { id: 'happy', emoji: '🎉', count: 0 },
  { id: 'boom', emoji: '🤯', count: 0 },
  { id: 'fun', emoji: '🤪', count: 0 },
  { id: 'think', emoji: '🤔', count: 0 },
  { id: 'dislike', emoji: '💔', count: 0 }
])

/* 配置：改成自己的仓库 & token */
const repo   = 'GeminiAlpha-1/emoji-poll'
const branch = 'main'
const path   = 'public/reactions.json'
const pageKey = location.pathname
const TOKEN = import.meta.env.PUBLIC_GITHUB_TOKEN || ''

const votedIds = ref(new Set(JSON.parse(localStorage.getItem(`voted-${pageKey}`) || '[]')))

/* 拉取远程总数 */
fetch(`https://raw.githubusercontent.com/${repo}/${branch}/${path}`)
  .then(r => r.json())
  .then(json => {
    const p = json[pageKey] || {}
    items.forEach(i => (i.count = p[i.id] || 0))
  })

/* 投票/取消投票 */
async function toggle(item) {
  const delta = votedIds.value.has(item.id) ? -1 : 1
  item.count += delta
  delta > 0 ? votedIds.value.add(item.id) : votedIds.value.delete(item.id)
  localStorage.setItem(`voted-${pageKey}`, JSON.stringify([...votedIds.value]))

  const url = `https://api.github.com/repos/${repo}/contents/${path}`
  const current = await fetch(url).then(r => r.json())
  const data = JSON.parse(atob(current.content))
  data[pageKey] = data[pageKey] || {}
  data[pageKey][item.id] = Math.max(0, (data[pageKey][item.id] || 0) + delta)
  const newContent = btoa(JSON.stringify(data, null, 2))

  await fetch(url, {
    method: 'PUT',
    headers: { Authorization: `token ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `${delta > 0 ? '+' : '-'}1 ${item.emoji} on ${pageKey}`,
      content: newContent,
      sha: current.sha
    })
  })
}
</script>

<style scoped>
.emoji-box {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin: 32px 0;
}
.emoji-cell {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--vp-c-text-1);
}
.emoji-cell.voted {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}
:root.dark .emoji-cell {
  color: var(--vp-c-text-1);
}
</style>