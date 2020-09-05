import { DoodleLine, StrokePoint } from '../models'
import { reactive, ref } from 'vue'

export default function useApplyStrokeToCanvas(ctx) {
  const history = reactive<DoodleLine[]>([])
  const activeLine = ref<DoodleLine>(null)

  function drawAllLinesFromHistory(lineHistory: DoodleLine[] = null): void {
    if (lineHistory === null) {
      lineHistory = history
    }
    let delay = 0
    lineHistory.forEach((line, index) => {
      if (index === 0) {
        drawHistoricalLine(line)
      } else {
        const previous = lineHistory[index - 1]
        delay =
          delay +
          previous.totalTime() +
          (line.firstPointEntry() - previous.finalPointEntry())
        setTimeout(() => drawHistoricalLine(line), delay)
      }
    })
  }

  function drawHistoricalLine(line: DoodleLine) {
    let delay = 0
    line.history.forEach((point, index) => {
      if (index === 0) {
        stroke(point)
      } else {
        const difference = point.entryTime - line.history[index - 1].entryTime
        delay = delay + difference
        setTimeout(() => stroke(point), delay)
      }
    })
  }

  function startNewLine(): void {
    activeLine.value = new DoodleLine(performance.now(), [])
    history.push(activeLine.value)
  }

  function stroke(point: StrokePoint, recordStroke: boolean = false): void {
    if (recordStroke) {
      activeLine.value.history.push(point)
    }
    ctx.value.beginPath()
    ctx.value.lineCap = 'round'
    ctx.value.moveTo(point.position.oldX, point.position.oldY)
    ctx.value.lineTo(point.position.x, point.position.y)
    ctx.value.strokeStyle = point.strokeStyle
    ctx.value.lineWidth = point.lineWidth
    ctx.value.stroke()
    ctx.value.closePath()
  }

  return {
    startNewLine,
    stroke,
    drawAllLinesFromHistory,
    drawHistoricalLine
  }
}
