<!-- TableEditor.vue -->
<template>
  <div class="table-editor" :class="{ dark: isDark }">
    <!-- 工具栏 -->
    <div class="toolbar">
      <button @click="showTableSelector = !showTableSelector" title="插入表格">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-width="2" d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18"/>
        </svg>
        <span>插入表格</span>
      </button>
      <button @click="insertRowBelowCursor" title="在光标下方插入一行">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-width="2" d="M12 5v14M5 12l7-7 7 7"/>
        </svg>
        <span>插入行</span>
      </button>
      <button @click="insertColAfterCursor" title="在光标右侧插入一列">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-width="2" d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
        <span>插入列</span>
      </button>
    </div>

    <!-- 24×36 表格选择器 -->
    <div v-if="showTableSelector" class="table-selector" :class="{ dark: isDark }" @mouseleave="showTableSelector = false">
      <div class="table-grid" @mouseleave="selectedTableRows = 0; selectedTableCols = 0">
        <div
          v-for="row in 36"
          :key="row"
          class="table-row"
        >
          <div
            v-for="col in 24"
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

    <!-- 预览在上 / 编辑在下 -->
    <div class="editor-container">
      <div class="preview-pane">
        <div class="preview" v-html="renderedContent"></div>
      </div>
      <div class="editor-pane">
        <textarea
          ref="editor"
          v-model="content"
          @input="$emit('update:modelValue', content)"
          class="editor"
          placeholder="在此输入或粘贴 Markdown 表格..."
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject, nextTick, watch } from 'vue'
import MarkdownIt from 'markdown-it'

const props = defineProps({
  modelValue: { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue'])

const isDark = inject('isDark', ref(false))
const md = new MarkdownIt({ html: true })

const content = ref(props.modelValue)
const showTableSelector = ref(false)
const selectedTableRows = ref(0)
const selectedTableCols = ref(0)

watch(() => props.modelValue, val => (content.value = val))
const renderedContent = computed(() => md.render(content.value))

/* ---------- 工具函数 ---------- */
function getEditor() {
  return document.querySelector('.editor')
}

function insertAtCursor(text) {
  const el = getEditor()
  if (!el) return
  const [start, end] = [el.selectionStart, el.selectionEnd]
  content.value = content.value.slice(0, start) + text + content.value.slice(end)
  nextTick(() => {
    el.focus()
    el.setSelectionRange(start + text.length, start + text.length)
  })
}

/* ---------- 1. 拖拽大表格 ---------- */
function confirmTable() {
  const r = selectedTableRows.value
  const c = selectedTableCols.value
  if (!r || !c) return
  let t = '\n'
  for (let i = 0; i <= r; i++) {
    t += '|'
    for (let j = 0; j < c; j++) {
      t += i === 1 ? ' --- |' : ' 内容 |'
    }
    t += '\n'
  }
  insertAtCursor(t)
  showTableSelector.value = false
  selectedTableRows.value = 0
  selectedTableCols.value = 0
}

/* ---------- 2. 光标下方插入行 ---------- */
function insertRowBelowCursor() {
  const val = content.value
  const el = getEditor()
  if (!el) return
  const pos = el.selectionStart

  const lines = val.split('\n')
  let lineIdx = 0
  let count = 0
  for (let i = 0; i < lines.length; i++) {
    if (count + lines[i].length + 1 > pos) { lineIdx = i; break }
    count += lines[i].length + 1
  }

  // 寻找当前光标所在的表格块
  let start = lineIdx, end = lineIdx
  for (let i = lineIdx; i >= 0; i--) if (!lines[i].trim().startsWith('|')) { start = i + 1; break }
  for (let i = lineIdx; i < lines.length; i++) if (!lines[i].trim().startsWith('|')) { end = i - 1; break }

  const sepIdx = lines.findIndex((l, idx) => idx >= start && idx <= end && /\|.*---/.test(l))
  if (sepIdx === -1) return
  const colCnt = (lines[sepIdx].match(/\|/g) || []).length - 1
  const newRow = '|' + Array(colCnt).fill(' 内容 ').join('|') + '|\n'
  const insertPos = lines.slice(0, sepIdx + 1).join('\n').length + 1
  content.value = val.slice(0, insertPos) + newRow + val.slice(insertPos)
}

/* ---------- 3. 光标右侧插入列 ---------- */
function insertColAfterCursor() {
  const val = content.value
  const el = getEditor()
  if (!el) return
  const pos = el.selectionStart

  const lines = val.split('\n')
  let lineIdx = 0
  let count = 0
  for (let i = 0; i < lines.length; i++) {
    if (count + lines[i].length + 1 > pos) { lineIdx = i; break }
    count += lines[i].length + 1
  }

  // 寻找表格块
  let start = lineIdx, end = lineIdx
  for (let i = lineIdx; i >= 0; i--) if (!lines[i].trim().startsWith('|')) { start = i + 1; break }
  for (let i = lineIdx; i < lines.length; i++) if (!lines[i].trim().startsWith('|')) { end = i - 1; break }

  const tableLines = lines.map((l, idx) => idx >= start && idx <= end && l.trim().startsWith('|') ? l : null)

  // 计算光标所在列
  const currentLine = lines[lineIdx]
  const cursorInLine = pos - count
  const parts = currentLine.split('|')
  let col = 0, charSum = 0
  for (let i = 0; i < parts.length; i++) {
    if (charSum + parts[i].length + 1 >= cursorInLine) { col = i; break }
    charSum += parts[i].length + 1
  }

  // 插入列
  const newLines = lines.map((l, idx) => {
    if (tableLines[idx] === null) return l
    const cells = l.split('|')
    const isSep = l.includes('---')
    cells.splice(col + 1, 0, isSep ? ' --- ' : ' 内容 ')
    return cells.join('|')
  })
  content.value = newLines.join('\n')
}
</script>

<style scoped>
.table-editor {
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  margin: 1rem 0;
  position: relative;
}

.toolbar {
  display: flex;
  gap: 8px;
  padding: 8px;
  background: #f8f9fa;
  border-bottom: 1px solid #e1e5e9;
  align-items: center;
}

.toolbar button {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  color: #333;
  font-size: 14px;
}

.toolbar button:hover {
  background: #f0f0f0;
}

.editor-container {
  display: flex;
  flex-direction: column;
  height: 70vh;
}

.preview-pane,
.editor-pane {
  flex: 1 1 50%;
  overflow: hidden;
}

.preview {
  height: 100%;
  padding: 12px;
  overflow-y: auto;
  background: #fff;
  border-bottom: 1px solid #e1e5e9;
}

/* 修复预览框表格边框 */
.preview :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 0;
}

.preview :deep(th),
.preview :deep(td) {
  border: 1px solid #bbb;
  padding: 4px 8px;
}

.editor {
  width: 100%;
  height: 100%;
  border: none;
  padding: 12px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.5;
  resize: none;
  outline: none;
  background: #fafbfc;
}

.table-selector {
  position: absolute;
  top: 46px;
  left: 8px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-height: 300px;
  overflow: auto;
}

.table-grid {
  display: inline-block;
  border: 1px solid #ddd;
}

.table-row {
  display: flex;
}

.table-cell {
  width: 14px;
  height: 14px;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
}

.table-cell.active {
  background: #007bff;
}

.table-info {
  text-align: center;
  margin-top: 4px;
  font-size: 12px;
  color: #666;
}

.table-editor.dark {
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

.dark .editor {
  background: #1e1e1e;
  color: #e4e4e4;
}

.dark .preview {
  background: #1e1e1e;
  color: #e4e4e4;
  border-color: #444;
}

.dark .preview :deep(th),
.dark .preview :deep(td) {
  border: 1px solid #555;
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