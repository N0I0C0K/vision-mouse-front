import { makeAutoObservable } from 'mobx'

export interface HandPos {
  x: number
  y: number
}

export type HandInfo = HandPos[]

class LandMarkStore {
  all_hand: HandInfo[] = []
  current_hand: HandInfo = []
  width: number = 1280
  height: number = 720

  constructor() {
    makeAutoObservable(this)
  }
}
