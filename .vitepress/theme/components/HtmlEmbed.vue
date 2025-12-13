<template>
  <div :id="containerId" class="html-embed-host">
    <div v-if="loading" class="loading">正在加载工具...</div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'

const props = defineProps({
  file: { type: String, required: true }
})

const containerId = `html-tool-${Math.random().toString(36).slice(2, 11)}`
const loading = ref(true)

// 确保容器DOM元素真正就绪的函数
const ensureContainerReady = async () => {
  const maxRetries = 10
  let retries = 0
  
  while (retries < maxRetries) {
    const host = document.getElementById(containerId)
    
    // 检查元素是否存在于文档中并且可见
    if (host && document.contains(host)) {
      // 检查元素是否可见（有尺寸）
      const rect = host.getBoundingClientRect()
      if (rect.width > 0 || rect.height > 0) {
        return true
      }
    }
    
    // 等待100ms后重试
    await new Promise(resolve => setTimeout(resolve, 100))
    retries++
  }
  
  // 兜底：即使重试失败，也继续执行
  console.warn(`⚠️ 容器DOM就绪检查超时，但将继续执行`)
  return false
}

// 加载HTML文件的函数
const loadHtml = async () => {
  try {
    // 从public目录加载HTML文件
    const response = await fetch(`/html/${props.file}`)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const html = await response.text()
    
    // 确保DOM完全渲染后再注入HTML
    // 多重保证：nextTick + requestAnimationFrame + 容器就绪检查
    await nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))
    await ensureContainerReady()
    
    await injectHtml(html)
  } catch (error) {
    console.error(`❌ 加载HTML文件失败: ${props.file}`, error)
    loading.value = false
  }
}

// 按顺序加载外部脚本
const loadExternalScripts = async (host, scriptSources) => {
  for (const src of scriptSources) {
    await new Promise((resolve, reject) => {
      const newScript = document.createElement('script')
      newScript.src = src
      newScript.async = false  // 确保按顺序执行
      newScript.defer = false
      
      newScript.onload = resolve
      newScript.onerror = () => {
        console.error(`❌ 加载外部脚本失败: ${src}`)
        reject(new Error(`加载脚本失败: ${src}`))
      }
      
      host.appendChild(newScript)
    })
  }
}

// 注入HTML并处理样式/脚本
const injectHtml = async (html) => {
  const host = document.getElementById(containerId)
  if (!host) return

  const sandbox = document.createElement('div')
  sandbox.innerHTML = html

  // 处理样式：自动添加作用域前缀
  const styles = sandbox.querySelectorAll('style')
  styles.forEach(style => {
    const scopedStyle = document.createElement('style')
    scopedStyle.setAttribute('data-container', containerId)
    scopedStyle.textContent = style.textContent.replace(
      /([^{}]+)\{/g,
      (match, selectors) => {
        const scoped = selectors.split(',').map(selector => {
          const trimmedSelector = selector.trim()
          // 跳过特殊选择器：
          // 1. Tailwind工具类（全面匹配）
          // 2. 按钮ID选择器
          // 3. 带有伪类的选择器
          if (
            /^(@layer|@tailwind|@apply|@import)/.test(trimmedSelector) || // 跳过Tailwind指令
            /^(bg-|text-|px-|py-|flex|grid|rounded|shadow|transition|hover:|focus:|active:|disabled:|dark:|lg:|md:|sm:|xl:|2xl:)/.test(trimmedSelector) || // Tailwind工具类
            /^#(start-btn|reset-btn|work-mode|break-mode)/.test(trimmedSelector) || // 按钮ID选择器
            /^body|^html|^head/.test(trimmedSelector) // 跳过HTML标签选择器
          ) {
            return trimmedSelector
          }
          // 对其他选择器添加作用域前缀
          return `#${containerId} ${trimmedSelector}`
        }).join(', ')
        return `${scoped} {`
      }
    )
    document.head.appendChild(scopedStyle)
    style.remove()
  })

  // 保存脚本内容
  const scriptContents = []
  const scriptSources = []
  const scripts = sandbox.querySelectorAll('script')
  scripts.forEach(script => {
    if (script.src) {
      scriptSources.push(script.src)
    } else {
      scriptContents.push(script.textContent)
    }
    script.remove()
  })

  // 先注入HTML主体到DOM
  host.innerHTML = sandbox.innerHTML

  // 确保DOM有足够时间渲染（等待两次动画帧）
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  
  // 调试：检查按钮元素是否存在并可见
  console.log('🔍 检查按钮元素状态:')
  const buttonIds = ['start-btn', 'reset-btn', 'work-mode', 'break-mode']
  buttonIds.forEach(id => {
    const button = host.querySelector(`#${id}`)
    if (button) {
      console.log(`✅ 按钮 ${id} 存在`)
      console.log(`   可见性:`, {
        width: button.offsetWidth,
        height: button.offsetHeight,
        display: getComputedStyle(button).display,
        visibility: getComputedStyle(button).visibility,
        opacity: getComputedStyle(button).opacity
      })
    } else {
      console.log(`❌ 按钮 ${id} 不存在`)
    }
  })
  
  // 执行内联脚本
  scriptContents.forEach(content => {
    try {
      // 使用更可靠的脚本执行方式，确保在正确的DOM上下文中运行
      const script = document.createElement('script')
      script.textContent = content
      host.appendChild(script)
      // 执行完毕后移除脚本元素
      script.remove()
    } catch (error) {
      console.error(`❌ 执行内联脚本失败:`, error)
    }
  })

  // 按顺序加载外部脚本
  if (scriptSources.length > 0) {
    try {
      await loadExternalScripts(host, scriptSources)
    } catch (error) {
      console.error(`❌ 处理外部脚本失败:`, error)
    }
  }

  // 所有脚本执行完成后，再次确保按钮可见
  buttonIds.forEach(id => {
    const button = host.querySelector(`#${id}`)
    if (button) {
      // 确保按钮有正确的样式和显示属性
      button.style.display = 'inline-flex'
      button.style.visibility = 'visible'
      button.style.opacity = '1'
      // 添加调试信息
      console.log(`🔧 强制设置按钮 ${id} 为可见`)
    }
  })

  // 所有脚本执行完成后隐藏加载状态
  loading.value = false
}

onMounted(() => {
  // 对于SSR页面，确保客户端水合完成后再加载
  if (import.meta.env.SSR) {
    return
  }
  
  // 直接加载HTML
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