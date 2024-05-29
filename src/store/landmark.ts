import { webSocketUrl } from '@/lib'
import { action, makeObservable, observable } from 'mobx'
import { WebSockerStore } from './base'

export interface HandPos {
  x: number
  y: number
}

export type HandInfo = HandPos[]

function ParseHandInfoString(src: string): HandInfo {
  return src.split('/').map((val) => {
    const p = val.split(',')
    return {
      x: parseInt(p[0]),
      y: parseInt(p[1]),
    }
  })
}

class LandMarkStore extends WebSockerStore {
  allHand: HandInfo[] = []
  currentHand: HandInfo = []
  width: number = 1280
  height: number = 720

  constructor() {
    super(webSocketUrl.landMark)
    makeObservable(this, {
      allHand: observable,
      currentHand: observable,
      width: observable,
      height: observable,
      startFetch: action,
      stopFetch: action,
    })
  }

  startFetch() {
    if (this.connected) return
    this.connect(
      action((data) => {
        const msg: {
          allHand: string
          currentHand: string
          width: number
          height: number
        } = JSON.parse(data)
        if (msg.allHand !== undefined) {
          this.allHand = msg.allHand
            .split('|')
            .map((val) => ParseHandInfoString(val))
        }
        if (msg.currentHand !== undefined) {
          this.currentHand = ParseHandInfoString(msg.currentHand)
          this.width = msg.width
          this.height = msg.height
        }
      })
    )
  }

  stopFetch() {
    this.close()
  }
}

export const landMark = new LandMarkStore()
