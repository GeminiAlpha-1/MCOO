<!-- 仅修复闪烁与发白，其余一行不改 -->
<template>
  <!-- 服务端渲染时空白，避免 hydration 不匹配 -->
  <ClientOnly>
    <iframe
      :src="src"
      frameborder="no"
      :width="width"
      :height="height"
      allow="autoplay"
      loading="eager"
    />
  </ClientOnly>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** 歌曲 / 歌单 ID */
  id:   { type: [String, Number], required: true },
  /** 2=单曲 0=歌单 */
  type: { type: String, default: '2' },
  /** 是否自动播放 */
  auto: { type: Boolean, default: false },
  /** 宽度，支持 100% / 330 等 */
  width:  { type: [String, Number], default: '100%' },
  /** 高度，官方给出 66 / 86 / 450 等 */
  height: { type: [String, Number], default: 86 }
})

const src = computed(() =>
  `//music.163.com/outchain/player?type=${props.type}&id=${props.id}&auto=${props.auto ? 1 : 0}&height=${props.height}`
)
</script>

<style scoped>
iframe {
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,.15);
}
</style>