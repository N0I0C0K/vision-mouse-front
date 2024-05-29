import { action, computed, makeObservable, observable } from 'mobx'

export class WebSockerStore {
  webSocket: WebSocket | null = null
  webSocketUrl: string
  connected: boolean = false
  constructor(webSocketUrl: string) {
    this.webSocketUrl = webSocketUrl
    makeObservable(this, {
      connected: observable,
      isConnect: computed,
    })
  }

  get isConnect(): boolean {
    return this.connected && this.webSocket !== null
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  connect(onMessage: (data: any) => void) {
    if (this.connected) return
    this.webSocket = new WebSocket(this.webSocketUrl)
    this.connected = true
    this.webSocket.onmessage = (ev) => {
      onMessage(ev.data)
    }
    this.webSocket.onopen = action(() => {
      console.log('websocket open', this.webSocketUrl)
      this.connected = true
    })

    this.webSocket.onclose = action(() => {
      console.log('websocket close', this.webSocketUrl)
      this.connected = false
    })
  }

  close() {
    if (!this.isConnect) {
      return
    }
    this.webSocket?.close()
  }
}
