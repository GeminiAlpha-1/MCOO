<template>
  <div class="scene">
    <div
      class="cube glass"
      :style="cubeStyle"
      @mousedown="onMouseDown"
    >
      <div
        v-for="(_, i) in 6"
        :key="i"
        class="face"
        :style="glassStyle"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const rotX = ref(-15)
const rotY = ref(25)
let dragging = false
let lastX = 0
let lastY = 0

/* 随机起点 */
const h = ref(Math.random() * 360)
const glassStyle = computed(() => ({
  /* 磨砂玻璃 + 动态色调 */
  background: `hsla(${h.value}, 60%, 50%, 0.2)`,
  backdropFilter: 'blur(5px)',
  transition: 'background 2s ease'   /* 平滑过渡 */
}))

const cubeStyle = computed(() => ({
  transform: `rotateX(${rotX.value}deg) rotateY(${rotY.value}deg)`
}))

function onMouseDown(e) {
  dragging = true
  lastX = e.clientX
  lastY = e.clientY
  /* 拖动时随机跳到下一个色 */
  h.value = (h.value + 30 + Math.random() * 330) % 360
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

function onMouseMove(e) {
  if (!dragging) return
  rotY.value += (e.clientX - lastX) * 0.5
  rotX.value -= (e.clientY - lastY) * 0.5
  lastX = e.clientX
  lastY = e.clientY
}

function onMouseUp() {
  dragging = false
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
}
</script>

<style scoped>
/* 居中场景 */
.scene {
  perspective: 800px;
  width: 200px;
  height: 200px;
  margin: 80px auto;
}

/* 玻璃立方体 */
.cube {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  cursor: grab;
}
.cube:active {
  cursor: grabbing;
}

.face {
  position: absolute;
  width: 200px;
  height: 200px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow:
    inset 0 0 15px rgba(255, 255, 255, 0.5),
    0 0 20px rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  transition: background 1s ease;   /* 平滑换色 */
}

/* 六个面位置 */
.face:nth-child(1) { transform: rotateY(0deg)   translateZ(100px); }
.face:nth-child(2) { transform: rotateY(180deg) translateZ(100px); }
.face:nth-child(3) { transform: rotateY(90deg)  translateZ(100px); }
.face:nth-child(4) { transform: rotateY(-90deg) translateZ(100px); }
.face:nth-child(5) { transform: rotateX(90deg)  translateZ(100px); }
.face:nth-child(6) { transform: rotateX(-90deg) translateZ(100px); }
</style>