import { http } from '@/lib'
import { makeAutoObservable } from 'mobx'

interface Size {
  width: number
  height: number
}
interface CameraState {
  isOpened: boolean
  size: Size
  exposure: number
}

interface CameraSetting {
  exposure?: number
}

class CameraStore {
  isOpened: boolean = false
  size: Size = {
    width: 1280,
    height: 720,
  }
  exposure: number = 0

  constructor() {
    makeAutoObservable(this)
    this.updateState()
  }

  _updateState(data: CameraState) {
    Object.assign(this, data)
  }

  async open() {
    const res = await http.get<CameraState>('/camera/open')
    const data = res.data
    if (data.isOpened !== true) throw new Error('open camera failed')
    this._updateState(data)
  }

  async close() {
    const res = await http.get<CameraState>('/camera/close')
    const data = res.data
    if (data.isOpened !== false) throw new Error('close camera failed')
    this._updateState(data)
  }

  async updateSetting(setting: CameraSetting) {
    const res = await http.put<CameraState>('/camera/setting', setting)
    const data = res.data
    this._updateState(data)
  }

  async setExposure(exposure: number) {
    await this.updateSetting({
      exposure,
    })
  }

  async updateState() {
    const res = await http.get<CameraState>('/camera/state')
    const data = res.data
    this._updateState(data)
  }
}

export const camera = new CameraStore()
