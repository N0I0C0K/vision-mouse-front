import { http } from '@/lib'
import { makeAutoObservable, reaction } from 'mobx'
import { camera } from './camera'

export interface FlowState {
  running: boolean
}

class FlowStore {
  running: boolean = false
  constructor() {
    makeAutoObservable(this)
  }

  _update_state(state: FlowState) {
    Object.assign(this, state)
  }

  async refresh_state() {
    const res = await http.get<FlowState>('/flow/state')
    this._update_state(res.data)
  }

  async start() {
    const res = await http.get<FlowState>('/flow/start')
    this._update_state(res.data)
  }

  async stop() {
    const res = await http.get<FlowState>('/flow/stop')
    this._update_state(res.data)
  }
}

export const flowStore = new FlowStore()

reaction(
  () => flowStore.running,
  (running) => {
    camera.isOpened = running
  }
)
