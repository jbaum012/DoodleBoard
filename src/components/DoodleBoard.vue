<template>
  <h1>isDrawing: {{ isDrawing }}</h1>
  <button type="button" @click="redraw">Redraw</button>
  <br />
  <button
    class="bg-purple-900 text-white p-2"
    type="button"
    @click="strokeColor = 'purple'"
  >
    Purple
  </button>
  <br />
  <button
    class="bg-black text-white p-2"
    type="button"
    @click="strokeColor = 'black'"
  >
    Black
  </button>
  <br />
  <button
    class="bg-yellow-400 text-black p-2"
    type="button"
    @click="strokeColor = 'yellow'"
  >
    Yellow
  </button>
  <br />
  <input type="number" v-model="strokeSize" />
  <canvas
    id="doodle-board"
    ref="canvas"
    width="800"
    height="600"
    @mousedown="startDraw"
    @touchstart.prevent="startDraw"
    @mousemove="move"
    @touchmove.prevent="move"
    @mouseup="endDraw"
    @mouseleave="endDraw"
    @click.right="endDraw"
    @touchend.prevent="endDraw"
  ></canvas>
</template>

<script lang="ts">
import useApplyStrokeToCanvas from '../composables/useApplyStrokeToCanvas'
import useCanvasContext from '../composables/useCanvasContext'
import useRecordStrokeHistory from '../composables/useRecordStrokeHistory'
import { defineComponent, reactive, ref, readonly } from 'vue'
import { MousePosition, StrokePoint } from '../models'

export default defineComponent({
  setup() {
    const isDrawing = ref(false)
    const { canvas, ctx, clearCanvas } = useCanvasContext('white')
    const {
      startNewLine,
      stroke,
      drawAllLinesFromHistory
    } = useApplyStrokeToCanvas(ctx)

    const strokeColor = ref('black')
    const strokeSize = ref(10)

    const mouse = reactive({
      x: null,
      y: null,
      oldX: null,
      oldY: null
    }) as MousePosition

    function startDraw(e): void {
      getMouse(e)
      isDrawing.value = true
    }

    function move(e): void {
      if (isDrawing.value) {
        startNewLine()
        stroke(getStrokePoint(e), true)
      }
    }

    function endDraw(e): void {
      getMouse(e)
      isDrawing.value = false
    }

    function getMouse(e): MousePosition {
      mouse.oldX = mouse.x
      mouse.oldY = mouse.y
      mouse.x = e.clientX - canvas.value.offsetLeft
      mouse.y = e.clientY - canvas.value.offsetTop
      return mouse
    }

    function getStrokePoint(event: Event): StrokePoint {
      return new StrokePoint(
        performance.now(),
        strokeColor.value,
        strokeSize.value,
        getMouse(event)
      )
    }

    function redraw(): void {
      clearCanvas()
      drawAllLinesFromHistory()
    }

    return {
      canvas,
      isDrawing,
      startDraw,
      endDraw,
      redraw,
      move,
      strokeColor,
      strokeSize
    }
  }
})
</script>
<style>
#doodle-board {
  cursor: crosshair;
}
</style>
