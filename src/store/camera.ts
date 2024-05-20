import { http } from '@/lib'
import { makeAutoObservable } from 'mobx'

interface Size {
  width: number
  height: number
}
interface CameraState {
  isOpened: boolean
  size: Size
}

export class CameraStore {
  isOpened: boolean = false
  size: Size = {
    width: 1280,
    height: 720,
  }

  constructor() {
    makeAutoObservable(this)
  }

  async open() {
    const res = await http.get<CameraState>('/camera/open')
    this.isOpened = res.data.isOpened
  }

  async close() {
    const res = await http.get<CameraState>('/camera/close')
    this.isOpened = res.data.isOpened
    this.size = res.data.size
  }
}

export const camera = new CameraStore()
