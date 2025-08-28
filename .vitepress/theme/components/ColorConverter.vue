<!-- docs/.vitepress/components/ColorConverter.vue -->
<template>
  <div class="color-converter" :class="{ 'has-image': hasImage }">
    <!-- 图片参考区域 -->
    <div v-if="hasImage" class="image-section">
      <div class="image-container">
        <img 
          :src="imageUrl" 
          alt="颜色参考"
          class="reference-image"
          @click="pickColorFromImage"
          ref="referenceImage"
        />
        <div 
          v-if="showColorPicker" 
          class="image-color-picker"
          :style="{ left: pickerPosition.x + 'px', top: pickerPosition.y + 'px' }"
        >
          <div 
            class="selected-color" 
            :style="{ backgroundColor: selectedImageColor }"
          ></div>
          <button @click="useSelectedColor">使用此颜色</button>
        </div>
      </div>
    </div>

    <!-- 主控制区域 -->
    <div class="main-section">
      <!-- 右上角图片图标 -->
      <div class="controls-bar">
        <button 
          class="image-toggle" 
          @click="toggleImage"
          :title="hasImage ? '清除参考图片' : '添加参考图片'"
        >
          <span class="icon">{{ hasImage ? '🗑️' : '📂' }}</span>
        </button>
      </div>

      <div class="color-display">
        <div 
          class="color-preview" 
          :style="{ backgroundColor: currentColor.hex }"
        ></div>
        <div class="color-info">
          <h3>{{ currentColor.hex }}</h3>
        </div>
      </div>

      <div class="input-section">
        <div class="input-group">
          <label>颜色选择器</label>
          <div class="color-picker-wrapper">
            <input 
              type="color" 
              v-model="currentColor.hex"
              @input="updateFromHex"
              class="color-picker"
            />
          </div>
        </div>

        <div class="input-group">
          <label>十六进制</label>
          <input 
            type="text" 
            v-model="currentColor.hex"
            @input="updateFromHex"
            placeholder="#000000"
            class="text-input"
          />
        </div>

        <div class="input-group">
          <label>RGB</label>
          <div class="rgb-inputs">
            <input 
              type="number" 
              v-model.number="currentColor.rgb.r"
              @input="updateFromRgb"
              min="0" max="255"
              placeholder="R"
              class="number-input"
            />
            <input 
              type="number" 
              v-model.number="currentColor.rgb.g"
              @input="updateFromRgb"
              min="0" max="255"
              placeholder="G"
              class="number-input"
            />
            <input 
              type="number" 
              v-model.number="currentColor.rgb.b"
              @input="updateFromRgb"
              min="0" max="255"
              placeholder="B"
              class="number-input"
            />
          </div>
        </div>

        <div class="input-group">
          <label>CMYK</label>
          <div class="cmyk-inputs">
            <input 
              type="number" 
              v-model.number="currentColor.cmyk.c"
              @input="updateFromCmyk"
              min="0" max="100"
              placeholder="C"
              class="number-input"
            />
            <input 
              type="number" 
              v-model.number="currentColor.cmyk.m"
              @input="updateFromCmyk"
              min="0" max="100"
              placeholder="M"
              class="number-input"
            />
            <input 
              type="number" 
              v-model.number="currentColor.cmyk.y"
              @input="updateFromCmyk"
              min="0" max="100"
              placeholder="Y"
              class="number-input"
            />
            <input 
              type="number" 
              v-model.number="currentColor.cmyk.k"
              @input="updateFromCmyk"
              min="0" max="100"
              placeholder="K"
              class="number-input"
            />
          </div>
        </div>
      </div>

      <div class="color-values">
        <div class="value-item">
          <span class="label">十六进制:</span>
          <span class="value">{{ currentColor.hex }}</span>
          <button @click="copyToClipboard(currentColor.hex)" class="copy-btn">复制</button>
        </div>
        <div class="value-item">
          <span class="label">RGB:</span>
          <span class="value">rgb({{ currentColor.rgb.r }}, {{ currentColor.rgb.g }}, {{ currentColor.rgb.b }})</span>
          <button @click="copyToClipboard(`rgb(${currentColor.rgb.r}, ${currentColor.rgb.g}, ${currentColor.rgb.b})`)" class="copy-btn">复制</button>
        </div>
        <div class="value-item">
          <span class="label">CMYK:</span>
          <span class="value">cmyk({{ Math.round(currentColor.cmyk.c) }}%, {{ Math.round(currentColor.cmyk.m) }}%, {{ Math.round(currentColor.cmyk.y) }}%, {{ Math.round(currentColor.cmyk.k) }}%)</span>
          <button @click="copyToClipboard(`cmyk(${Math.round(currentColor.cmyk.c)}%, ${Math.round(currentColor.cmyk.m)}%, ${Math.round(currentColor.cmyk.y)}%, ${Math.round(currentColor.cmyk.k)}%)`)" class="copy-btn">复制</button>
        </div>
      </div>

      <div class="quick-colors">
        <h4>常用颜色</h4>
        <div class="color-grid">
          <div 
            v-for="color in quickColors" 
            :key="color.hex"
            class="quick-color"
            :style="{ backgroundColor: color.hex }"
            :title="color.name"
            @click="setColor(color.hex)"
          ></div>
        </div>
      </div>
    </div>

    <!-- 隐藏的文件输入 -->
    <input 
      type="file" 
      ref="fileInput" 
      accept="image/*" 
      @change="handleImageSelect" 
      style="display: none"
    />
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'

// 原有的颜色状态管理
const currentColor = reactive({
  hex: '#3b82f6',
  rgb: { r: 59, g: 130, b: 246 },
  cmyk: { c: 76, m: 47, y: 0, k: 4 }
})

// 图片相关状态
const hasImage = ref(false)
const imageUrl = ref('')
const fileInput = ref(null)
const referenceImage = ref(null)
const showColorPicker = ref(false)
const selectedImageColor = ref('#000000')
const pickerPosition = reactive({ x: 0, y: 0 })

const quickColors = [
  { name: '红色', hex: '#ef4444' },
  { name: '绿色', hex: '#22c55e' },
  { name: '蓝色', hex: '#3b82f6' },
  { name: '黄色', hex: '#eab308' },
  { name: '紫色', hex: '#8b5cf6' },
  { name: '粉色', hex: '#ec4899' },
  { name: '橙色', hex: '#f97316' },
  { name: '青色', hex: '#06b6d4' },
  { name: '黑色', hex: '#000000' },
  { name: '白色', hex: '#ffffff' },
  { name: '灰色', hex: '#6b7280' },
  { name: '棕色', hex: '#92400e' }
]

// 原有的颜色转换函数（保持不变）
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
}

function rgbToCmyk(r, g, b) {
  r = r / 255
  g = g / 255
  b = b / 255
  
  const k = 1 - Math.max(r, g, b)
  const c = k === 1 ? 0 : (1 - r - k) / (1 - k)
  const m = k === 1 ? 0 : (1 - g - k) / (1 - k)
  const y = k === 1 ? 0 : (1 - b - k) / (1 - k)
  
  return {
    c: c * 100,
    m: m * 100,
    y: y * 100,
    k: k * 100
  }
}

function cmykToRgb(c, m, y, k) {
  c = c / 100
  m = m / 100
  y = y / 100
  k = k / 100
  
  const r = 255 * (1 - c) * (1 - k)
  const g = 255 * (1 - m) * (1 - k)
  const b = 255 * (1 - y) * (1 - k)
  
  return {
    r: Math.round(r),
    g: Math.round(g),
    b: Math.round(b)
  }
}

function updateFromHex() {
  if (!currentColor.hex.match(/^#[0-9A-Fa-f]{6}$/)) return
  
  const rgb = hexToRgb(currentColor.hex)
  if (rgb) {
    currentColor.rgb = rgb
    currentColor.cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b)
  }
}

function updateFromRgb() {
  const { r, g, b } = currentColor.rgb
  currentColor.hex = rgbToHex(r, g, b)
  currentColor.cmyk = rgbToCmyk(r, g, b)
}

function updateFromCmyk() {
  const { c, m, y, k } = currentColor.cmyk
  const rgb = cmykToRgb(c, m, y, k)
  currentColor.rgb = rgb
  currentColor.hex = rgbToHex(rgb.r, rgb.g, rgb.b)
}

function setColor(hex) {
  currentColor.hex = hex
  updateFromHex()
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    console.log('已复制到剪贴板:', text)
  })
}

// 新增的图片功能
function toggleImage() {
  if (hasImage.value) {
    // 清除图片
    hasImage.value = false
    imageUrl.value = ''
    if (imageUrl.value && imageUrl.value.startsWith('blob:')) {
      URL.revokeObjectURL(imageUrl.value)
    }
  } else {
    // 选择图片
    fileInput.value.click()
  }
}

function handleImageSelect(event) {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    if (imageUrl.value && imageUrl.value.startsWith('blob:')) {
      URL.revokeObjectURL(imageUrl.value)
    }
    imageUrl.value = URL.createObjectURL(file)
    hasImage.value = true
  }
}

function pickColorFromImage(event) {
  const img = referenceImage.value
  if (!img) return

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  const rect = img.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  const scaleX = img.naturalWidth / img.width
  const scaleY = img.naturalHeight / img.height
  
  canvas.width = 1
  canvas.height = 1
  ctx.drawImage(
    img,
    x * scaleX, y * scaleY, 1, 1,
    0, 0, 1, 1
  )
  
  const pixelData = ctx.getImageData(0, 0, 1, 1).data
  const hex = rgbToHex(pixelData[0], pixelData[1], pixelData[2])
  
  selectedImageColor.value = hex
  pickerPosition.x = x
  pickerPosition.y = y
  showColorPicker.value = true
}

function useSelectedColor() {
  setColor(selectedImageColor.value)
  showColorPicker.value = false
}

// 清理
import { onUnmounted } from 'vue'
onUnmounted(() => {
  if (imageUrl.value && imageUrl.value.startsWith('blob:')) {
    URL.revokeObjectURL(imageUrl.value)
  }
})
</script>

<style scoped>
/* 自适应容器 */
.color-converter {
  width: 100%;
  margin: 2rem 0;
  padding: 2rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.color-converter.has-image {
  padding-top: 1rem;
}

/* 图片区域 */
.image-section {
  margin-bottom: 1rem;
}

.image-container {
  position: relative;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.reference-image {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
  cursor: crosshair;
  display: block;
}

.image-color-picker {
  position: absolute;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.selected-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
}

.image-color-picker button {
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.8rem;
}

/* 控制栏 */
.controls-bar {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
}

.image-toggle {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.image-toggle:hover {
  background: var(--vp-c-bg-soft);
  transform: translateY(-1px);
}

.icon {
  font-size: 1.2rem;
}

/* 主区域 */
.main-section {
  position: relative;
}

.color-display {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.color-preview {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  border: 2px solid var(--vp-c-divider);
}

.color-info h3 {
  margin: 0;
  font-size: 1.5rem;
  font-family: monospace;
}

.input-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

/* 颜色选择器样式 */
.color-picker-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.color-picker {
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: none;
  padding: 0;
}

.color-picker::-webkit-color-swatch-wrapper {
  padding: 0;
  border-radius: 8px;
}

.color-picker::-webkit-color-swatch {
  border: none;
  border-radius: 8px;
}

.color-picker::-moz-color-swatch {
  border: none;
  border-radius: 8px;
}

/* 统一输入框样式 */
.text-input,
.number-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.text-input:focus,
.number-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.rgb-inputs,
.cmyk-inputs {
  display: grid;
  gap: 0.5rem;
}

.rgb-inputs {
  grid-template-columns: repeat(3, 1fr);
}

.cmyk-inputs {
  grid-template-columns: repeat(4, 1fr);
}

.color-values {
  margin-bottom: 2rem;
}

.value-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.value-item .label {
  font-weight: 600;
  min-width: 80px;
}

.value-item .value {
  flex: 1;
  font-family: monospace;
  font-size: 0.9rem;
}

.copy-btn {
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: var(--vp-c-bg-soft);
  transform: translateY(-1px);
}

.quick-colors h4 {
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem;
}

.quick-color {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
  transition: transform 0.2s, box-shadow 0.2s;
}

.quick-color:hover {
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .color-converter {
    padding: 1.5rem;
  }
  
  .controls-bar {
    top: 0.5rem;
    right: 0.5rem;
  }
  
  .color-display {
    flex-direction: column;
    text-align: center;
  }
  
  .color-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 480px) {
  .color-converter {
    padding: 1rem;
  }
  
  .cmyk-inputs {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .rgb-inputs {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 宽屏适配 */
@media (min-width: 1200px) {
  .color-converter {
    max-width: none;
  }
}
</style>