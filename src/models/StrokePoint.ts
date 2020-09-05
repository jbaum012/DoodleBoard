import { MousePosition } from './MousePosition'
export class StrokePoint {
  entryTime: number
  strokeStyle: string
  lineWidth: number
  position: MousePosition

  constructor(
    entryTime: number,
    style: string,
    width: number,
    position: MousePosition
  ) {
    this.entryTime = entryTime
    this.strokeStyle = style
    this.lineWidth = width
    this.position = new MousePosition(
      position.x,
      position.y,
      position.oldX,
      position.oldY
    )
  }
}
