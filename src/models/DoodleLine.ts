import { StrokePoint } from './StrokePoint'

export class DoodleLine {
  startTime: number

  history: StrokePoint[]

  constructor(startTime: number, history: StrokePoint[]) {
    this.startTime = startTime
    this.history = history
  }

  totalTime(): number {
    if (this.history.length > 0) {
      return (
        this.history[this.history.length - 1].entryTime -
        this.history[0].entryTime
      )
    } else {
      return 0
    }
  }

  timeDifference(time: number): number {
    return this.startTime - time
  }

  firstPointEntry(): number {
    return this.history[0].entryTime
  }

  finalPointEntry(): number {
    return this.history[this.history.length - 1].entryTime
  }
}
