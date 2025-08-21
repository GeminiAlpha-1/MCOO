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

const emojis = [
  { id: 'like', emoji: '👍', },
  { id: 'happy', emoji: '🎉', },
  { id: 'boom', emoji: '🤯', },
  { id: 'fun', emoji: '🤪', },
  { id: 'think', emoji: '🤔', },
  { id: 'dislike', emoji: '💔', }
]

const repo   = '你的用户名/emoji-poll'
const branch = 'main'
const path   = 'public/reactions.json'
const pageKey = location.pathname
const TOKEN = import.meta.env.PUBLIC_GITHUB_TOKEN || ''

/* 当前票数 & 本地已投集合 */
const items = reactive(emojis.map(e => ({ ...e, count: 0 })))
const votedIds = ref(new Set(JSON.parse(localStorage.getItem(`voted-${pageKey}`) || '[]')))

/* 拉取远程票数 */
async function fetchCounts() {
  try {
    const data = await fetch(`https://raw.githubusercontent.com/${repo}/${branch}/${path}`).then(r => r.json())
    emojis.forEach((e, i) => (items[i].count = data[pageKey]?.[e.id] || 0))
  } catch { /* 文件不存在时忽略 */ }
}

/* 首次加载 + 每次投票后拉最新 */
fetchCounts()

/* 投票/取消投票 */
async function toggle(item) {
  const wasVoted = votedIds.value.has(item.id)
  const delta = wasVoted ? -1 : 1

  /* 本地先锁定，防止连点 */
  votedIds.value.has(item.id)
    ? votedIds.value.delete(item.id)
    : votedIds.value.add(item.id)
  localStorage.setItem(`voted-${pageKey}`, JSON.stringify([...votedIds.value]))

  /* 远程更新 */
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
      message: `${wasVoted ? 'un' : ''}vote ${item.emoji} on ${pageKey}`,
      content: newContent,
      sha: current.sha
    })
  })

  /* 重新拉取总数，保证本地与远程一致 */
  await fetchCounts()
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