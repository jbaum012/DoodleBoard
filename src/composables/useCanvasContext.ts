import { onMounted, ref } from 'vue'

export default function useCanvasContext(backgroundColor: string) {
  const canvas = ref(null)
  const ctx = ref(null)
  onMounted(() => {
    clearCanvas()
  })

  function clearCanvas() {
    ctx.value = canvas.value.getContext('2d')
    ctx.value.fillStyle = backgroundColor
    ctx.value.fillRect(0, 0, canvas.value.width, canvas.value.height)
  }

  return {
    canvas,
    ctx,
    clearCanvas
  }
}
