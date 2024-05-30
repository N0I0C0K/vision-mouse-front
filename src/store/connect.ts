import { http } from '@/lib'
import { makeAutoObservable } from 'mobx'

export interface ConnectPair {
  match: string
  matchFunc: string
  handle: string
}

export interface GestureAndCursorMapping {
  gestureMatches: string[]
  cursorHandlers: string[]
  connect: ConnectPair[]
}

export async function GetGestureAndCursorMapping(): Promise<GestureAndCursorMapping> {
  const res = await http.get<GestureAndCursorMapping>('/flow/connects')
  return res.data
}

class ConnectStore {
  gestureMatches: string[] = []
  cursorHandlers: string[] = []
  connect: ConnectPair[] = []
  constructor() {
    makeAutoObservable(this)
  }
  async update() {
    const data = await GetGestureAndCursorMapping()
    this.connect = data.connect
    this.cursorHandlers = data.cursorHandlers
    this.gestureMatches = data.gestureMatches
  }
}

export const connectStore = new ConnectStore()
