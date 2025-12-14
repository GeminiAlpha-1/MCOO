<template>
  <div ref="containerRef" class="html-embed-host">
    <div v-if="loading" class="loading">正在加载工具...</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  file: { type: String, required: true }
})

const containerRef = ref(null)
const loading = ref(true)

// 加载HTML文件的函数
const loadHtml = async () => {
  try {
    const response = await fetch(`/html/${props.file}`)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const html = await response.text()
    
    // 直接使用iframe加载HTML内容
    // 这种方式能确保所有样式、脚本都在独立环境中正确加载和执行
    const container = containerRef.value
    if (!container) {
      console.error('Container not found')
      loading.value = false
      return
    }
    
    // 创建iframe元素
    const iframe = document.createElement('iframe')
    iframe.style.width = '100%'
    iframe.style.height = '800px' // 固定高度
    iframe.style.border = 'none'
    iframe.style.borderRadius = '8px'
    
    // 设置iframe的srcdoc属性，直接加载HTML内容
    iframe.srcdoc = html
    
    // 监听iframe加载完成事件
    iframe.onload = () => {
      loading.value = false
      console.log('HTML content loaded successfully in iframe')
    }
    
    // 清空容器并添加iframe
    container.innerHTML = ''
    container.appendChild(iframe)
    
  } catch (error) {
    console.error(`加载HTML文件失败: ${props.file}`, error)
    loading.value = false
  }
}

onMounted(() => {
  if (import.meta.env.SSR) {
    return
  }
  loadHtml()
})

// 监听file属性变化，重新加载HTML
watch(
  () => props.file,
  () => {
    loading.value = true
    loadHtml()
  }
)
</script>

<style scoped>
.html-embed-host {
  width: 100%;
  min-height: 300px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  background: #fff;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #999;
}
</style>