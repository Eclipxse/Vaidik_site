<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = withDefaults(
  defineProps<{
    quantity?: number
    staticity?: number
    ease?: number
    color?: string
  }>(),
  {
    quantity: 45,
    staticity: 50,
    ease: 50,
    color: '#ff4136',
  }
)

const canvasRef = ref<HTMLCanvasElement | null>(null)
const canvasContainerRef = ref<HTMLDivElement | null>(null)

interface Circle {
  x: number
  y: number
  translateX: number
  translateY: number
  size: number
  alpha: number
  targetAlpha: number
  dx: number
  dy: number
  magnetism: number
}

let context: CanvasRenderingContext2D | null = null
let circles: Circle[] = []
let mouse = { x: 0, y: 0 }
let canvasSize = { w: 0, h: 0 }
const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
let animationFrameId: number

onMounted(() => {
  if (canvasRef.value) {
    context = canvasRef.value.getContext('2d')
  }
  initCanvas()
  animate()
  window.addEventListener('resize', initCanvas)
  window.addEventListener('mousemove', onMouseMove)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', initCanvas)
  window.removeEventListener('mousemove', onMouseMove)
  cancelAnimationFrame(animationFrameId)
})

function initCanvas() {
  if (!canvasContainerRef.value || !canvasRef.value || !context) return
  circles = []
  canvasSize.w = canvasContainerRef.value.offsetWidth
  canvasSize.h = canvasContainerRef.value.offsetHeight
  canvasRef.value.width = canvasSize.w * dpr
  canvasRef.value.height = canvasSize.h * dpr
  canvasRef.value.style.width = `${canvasSize.w}px`
  canvasRef.value.style.height = `${canvasSize.h}px`
  context.scale(dpr, dpr)
  drawParticles()
}

function onMouseMove(e: MouseEvent) {
  if (!canvasContainerRef.value) return
  const rect = canvasContainerRef.value.getBoundingClientRect()
  const { clientX, clientY } = e
  const x = clientX - rect.left
  const y = clientY - rect.top
  const inside = x < canvasSize.w && x > 0 && y < canvasSize.h && y > 0
  if (inside) {
    mouse.x = x
    mouse.y = y
  }
}

function circleParams(): Circle {
  const x = Math.floor(Math.random() * canvasSize.w)
  const y = Math.floor(Math.random() * canvasSize.h)
  const translateX = 0
  const translateY = 0
  const size = Math.floor(Math.random() * 2) + 1
  const alpha = 0
  const targetAlpha = parseFloat((Math.random() * 0.5 + 0.1).toFixed(2))
  const dx = (Math.random() - 0.5) * 0.2
  const dy = (Math.random() - 0.5) * 0.2
  const magnetism = 0.1 + Math.random() * 4
  return { x, y, translateX, translateY, size, alpha, targetAlpha, dx, dy, magnetism }
}

function drawParticles() {
  for (let i = 0; i < props.quantity; i++) {
    circles.push(circleParams())
  }
}

function animate() {
  if (!context) return
  context.clearRect(0, 0, canvasSize.w, canvasSize.h)

  circles.forEach((circle, i) => {
    // Handle edge collision & fading
    const edge = [
      circle.x + circle.translateX - circle.size,
      canvasSize.w - (circle.x + circle.translateX + circle.size),
      circle.y + circle.translateY - circle.size,
      canvasSize.h - (circle.y + circle.translateY + circle.size),
    ]
    const closestEdge = Math.min(...edge)
    const remapClosestEdge = parseFloat((closestEdge / 20).toFixed(2))

    if (remapClosestEdge > 1) {
      circle.alpha += 0.02
      if (circle.alpha > circle.targetAlpha) circle.alpha = circle.targetAlpha
    } else {
      circle.alpha = circle.targetAlpha * remapClosestEdge
    }

    circle.x += circle.dx
    circle.y += circle.dy
    circle.translateX += (mouse.x / (props.staticity / circle.magnetism) - circle.translateX) / props.ease
    circle.translateY += (mouse.y / (props.staticity / circle.magnetism) - circle.translateY) / props.ease

    if (
      circle.x < -circle.size ||
      circle.x > canvasSize.w + circle.size ||
      circle.y < -circle.size ||
      circle.y > canvasSize.h + circle.size
    ) {
      circles[i] = circleParams()
    }

    context.beginPath()
    context.arc(circle.x + circle.translateX, circle.y + circle.translateY, circle.size, 0, 2 * Math.PI)
    context.fillStyle = props.color
    context.globalAlpha = circle.alpha
    context.fill()
  })

  animationFrameId = requestAnimationFrame(animate)
}
</script>

<template>
  <div ref="canvasContainerRef" class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <canvas ref="canvasRef" class="block" />
  </div>
</template>
