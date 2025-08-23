<template>
  <div class="markdown-editor" :class="{ mobile: isMobile, dark: isDark }">
    <!-- 工具栏 -->
    <div class="toolbar">
      <div class="toolbar-group">
        <button @click="formatText('bold')" title="加粗">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-width="2" d="M6 4h8a4 4 0 0 0 4 4 4 4 0 0 0-4 4H6z"/>
            <path stroke-width="2" d="M6 12h9a4 4 0 0 0 4 4 4 4 0 0 0-4 4H6z"/>
          </svg>
        </button>
        <button @click="formatText('italic')" title="斜体">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-width="2" d="M10 4h4M14 4l-4 16m-2 0h4"/>
          </svg>
        </button>
        <button @click="formatText('underline')" title="下划线">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-width="2" d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3M4 21h16"/>
          </svg>
        </button>
        <button @click="formatText('strikethrough')" title="中划线">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-width="2" d="M16 4H8a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4z"/>
            <path stroke-width="2" d="M20 12H4"/>
          </svg>
        </button>
      </div>

      <div class="toolbar-group">
        <select @change="formatText('heading')" v-model="selectedHeading" class="heading-select">
          <option value="1">标题 1</option>
          <option value="2">标题 2</option>
          <option value="3">标题 3</option>
          <option value="4">标题 4</option>
          <option value="5">标题 5</option>
          <option value="6">标题 6</option>
        </select>
      </div>

      <div class="toolbar-group">
        <button @click="formatText('quote')" title="引用">&gt;</button>
        <button @click="formatText('ul')" title="无序列表">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-width="2" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>
          </svg>
        </button>
        <button @click="formatText('ol')" title="有序列表">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-width="2" d="M10 6h11M10 12h11M10 18h11M4 6h1v4H4V6zm1 9a1 1 0 1 0-2 0 1 1 0 0 0 2 0zM3 16h1v4H3v-4z"/>
          </svg>
        </button>
      </div>

      <div class="toolbar-group">
        <button @click="insertLink" title="添加链接">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-width="2" d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path stroke-width="2" d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
        </button>
        <button @click="insertImage" title="插入图片">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <path stroke-width="2" d="M21 15l-5-5L5 21"/>
          </svg>
        </button>
        <button @click="insertTable" title="插入表格">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-width="2" d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18"/>
          </svg>
        </button>
        <button @click="formatText('code')" title="代码块">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-width="2" d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>
          </svg>
        </button>
      </div>

      <div class="toolbar-group">
        <button @click="clearAll" title="清空">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-width="2" d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- 表格选择器 -->
    <div v-if="showTableSelector" class="table-selector" :class="{ dark: isDark }" @mouseleave="showTableSelector = false">
      <div class="table-grid">
        <div
          v-for="row in 8"
          :key="row"
          class="table-row"
        >
          <div
            v-for="col in 8"
            :key="col"
            class="table-cell"
            :class="{ active: row <= selectedTableRows && col <= selectedTableCols }"
            @mouseover="selectedTableRows = row; selectedTableCols = col"
            @click="confirmTable"
          ></div>
        </div>
      </div>
      <div class="table-info">{{ selectedTableRows }} × {{ selectedTableCols }}</div>
    </div>

    <!-- 主编辑区域 -->
    <div class="editor-container">
      <div class="editor-pane">
        <textarea
          ref="editor"
          v-model="content"
          @input="handleInput"
          class="editor"
          placeholder="在此输入Markdown内容..."
        ></textarea>
      </div>
      <div class="preview-pane">
        <div class="preview" v-html="renderedContent"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, inject } from 'vue'
import MarkdownIt from 'markdown-it'
import MarkdownItAbbr from 'markdown-it-abbr'
import MarkdownItFootnote from 'markdown-it-footnote'
import MarkdownItSub from 'markdown-it-sub'
import MarkdownItSup from 'markdown-it-sup'
import MarkdownItMark from 'markdown-it-mark'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

// 获取 VitePress 的 isDark 状态
const isDark = inject('isDark', ref(false))

// 状态管理
const content = ref(props.modelValue)
const selectedHeading = ref('1')
const showTableSelector = ref(false)
const selectedTableRows = ref(1)
const selectedTableCols = ref(1)
const isMobile = ref(false)

// Markdown 渲染器
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})
  .use(MarkdownItAbbr)
  .use(MarkdownItFootnote)
  .use(MarkdownItSub)
  .use(MarkdownItSup)
  .use(MarkdownItMark)

const renderedContent = computed(() => {
  return md.render(content.value)
})

// 响应式布局
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

// 内容更新
const handleInput = () => {
  emit('update:modelValue', content.value)
}

// 工具栏功能
const formatText = (type) => {
  const textarea = document.querySelector('.editor')
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = content.value.substring(start, end)
  let newText = ''

  switch (type) {
    case 'bold':
      newText = `**${selectedText || '加粗文本'}**`
      break
    case 'italic':
      newText = `*${selectedText || '斜体文本'}*`
      break
    case 'underline':
      newText = `<u>${selectedText || '下划线文本'}</u>`
      break
    case 'strikethrough':
      newText = `~~${selectedText || '删除线文本'}~~`
      break
    case 'code':
      newText = `\`\`\`\n${selectedText || '代码块'}\n\`\`\``
      break
    case 'quote':
      newText = `> ${selectedText || '引用文本'}`
      break
    case 'ul':
      newText = `- ${selectedText || '列表项'}`
      break
    case 'ol':
      newText = `1. ${selectedText || '列表项'}`
      break
    case 'heading':
      const level = parseInt(selectedHeading.value)
      newText = `${'#'.repeat(level)} ${selectedText || '标题'}`
      break
  }

  if (newText) {
    content.value = content.value.substring(0, start) + newText + content.value.substring(end)
    nextTick(() => {
      textarea.focus()
      textarea.setSelectionRange(start + newText.length, start + newText.length)
    })
  }
}

const insertLink = () => {
  const url = prompt('请输入链接地址：', 'https://')
  const text = prompt('请输入链接文本：', '链接文本')
  if (url && text) {
    const textarea = document.querySelector('.editor')
    const start = textarea.selectionStart
    const linkText = `[${text}](${url})`
    content.value = content.value.substring(0, start) + linkText + content.value.substring(start)
  }
}

const insertImage = () => {
  const url = prompt('请输入图片地址：', 'https://')
  const alt = prompt('请输入图片描述：', '图片描述')
  if (url) {
    const textarea = document.querySelector('.editor')
    const start = textarea.selectionStart
    const imageText = `![${alt || '图片'}](${url})`
    content.value = content.value.substring(0, start) + imageText + content.value.substring(start)
  }
}

const insertTable = () => {
  showTableSelector.value = true
}

const confirmTable = () => {
  let table = '\n'
  for (let i = 0; i <= selectedTableRows.value; i++) {
    table += '|'
    for (let j = 0; j < selectedTableCols.value; j++) {
      if (i === 1) {
        table += ' --- |'
      } else {
        table += ' 内容 |'
      }
    }
    table += '\n'
  }
  content.value += table
  showTableSelector.value = false
}

const clearAll = () => {
  if (confirm('确定要清空所有内容吗？')) {
    content.value = ''
  }
}
</script>

<style scoped>
.markdown-editor {
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 1rem 0;
  position: relative;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
  background: #f8f9fa;
  border-bottom: 1px solid #e1e5e9;
  align-items: center;
}

.toolbar-group {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 0 4px;
  border-right: 1px solid #e1e5e9;
  flex-shrink: 0;
}

.toolbar-group:last-child {
  border-right: none;
}

button {
  padding: 8px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  min-width: 32px;
  height: 32px;
}

button:hover {
  background: #f0f0f0;
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

.heading-select {
  padding: 6px 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  color: #333;
}

.editor-container {
  display: flex;
  height: 500px;
}

.editor-pane,
.preview-pane {
  flex: 1;
  min-height: 100%;
}

.editor {
  width: 100%;
  height: 100%;
  border: none;
  padding: 16px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.5;
  resize: none;
  outline: none;
  background: #fafbfc;
}

.preview {
  height: 100%;
  padding: 16px;
  overflow-y: auto;
  background: #fff;
  border-left: 1px solid #e1e5e9;
}

.preview :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.preview :deep(pre) {
  background: #f6f8fa;
  padding: 12px;
  border-radius: 8px;
  overflow-x: auto;
}

.preview :deep(code) {
  background: #f3f4f6;
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 85%;
}

.table-selector {
  position: absolute;
  top: 54px;
  right: 20px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.table-grid {
  display: inline-block;
  border: 1px solid #ddd;
}

.table-row {
  display: flex;
}

.table-cell {
  width: 20px;
  height: 20px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
}

.table-cell.active {
  background: #007bff;
}

.table-info {
  text-align: center;
  margin-top: 8px;
  font-size: 12px;
  color: #666;
}

/* 移动端样式 */
@media (max-width: 768px) {
  .markdown-editor.mobile {
    height: auto;
  }

  .editor-container {
    flex-direction: column;
    height: auto;
  }

  .editor-pane {
    order: 2;
    height: 300px;
  }

  .preview-pane {
    order: 1;
    height: 300px;
  }

  .preview {
    border-left: none;
    border-bottom: 1px solid #e1e5e9;
  }
}

/* 暗色主题支持 */
.markdown-editor.dark {
  background: #1e1e1e;
  border-color: #444;
  color: #e4e4e4;
}

.dark .toolbar {
  background: #2d2d2d;
  border-color: #444;
}

.dark button {
  background: #2d2d2d;
  border-color: #555;
  color: #e4e4e4;
}

.dark button:hover {
  background: #444;
}

.dark .heading-select {
  background: #2d2d2d;
  border-color: #555;
  color: #e4e4e4;
}

.dark .editor {
  background: #1e1e1e;
  color: #e4e4e4;
}

.dark .preview {
  background: #1e1e1e;
  color: #e4e4e4;
  border-color: #444;
}

.dark .preview :deep(pre) {
  background: #2d2d2d;
}

.dark .preview :deep(code) {
  background: #333;
}

.dark .table-selector {
  background: #2d2d2d;
  border-color: #555;
}

.dark .table-cell {
  background: #2d2d2d;
  border-color: #555;
}
</style>