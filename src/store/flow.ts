import { makeAutoObservable } from 'mobx'

class FlowStore {
  running: boolean = false
  constructor() {
    makeAutoObservable(this)
  }

  async refresh_state() {}
}
