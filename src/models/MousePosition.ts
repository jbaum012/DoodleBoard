export class MousePosition {
  x: number
  y: number
  oldX: number
  oldY: number

  constructor(x: number, y: number, oldX: number, oldY: number) {
    this.x = x
    this.y = y
    this.oldX = oldX
    this.oldY = oldY
  }

  setNewPosition(position: { x: number; y: number }): MousePosition {
    this.oldX = this.x
    this.oldY = this.y
    this.x = position.x
    this.y = position.y

    return this
  }
}
