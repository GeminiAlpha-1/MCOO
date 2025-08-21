<template>
  <!-- SSR 下先不渲染，避免 hydration 报错 -->
  <ClientOnly>
    <iframe
      :src="iframeSrc"
      scrolling="no"
      frameborder="no"
      allowfullscreen="true"
      style="width:100%;aspect-ratio:16/9;border-radius:6px"
    />
  </ClientOnly>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 支持两种写法：
  // 1) 完整 https://www.bilibili.com/video/BV1xx…
  // 2) 直接 BV1xx…
  bvid: { type: String, required: true }
})

const iframeSrc = computed(() => {
  // 提取纯 BV 号
  const bv = props.bvid.match(/(BV[a-zA-Z0-9]+)/)?.[1]
  if (!bv) throw new Error('BiliVideo 需提供有效 BV 号')
  // 官方 iframe 模板，参数固定
  return `//player.bilibili.com/player.html?isOutside=true&bvid=${bv}&p=1`
})
</script>