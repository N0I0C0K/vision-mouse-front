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

async function UpdateGestureAndCursorMapping(connects: ConnectPair[]): Promise<{
  connect: ConnectPair[]
}> {
  VerifyConnectPair(connects)
  const res = await http.put<GestureAndCursorMapping>('/flow/connects', {
    data: connects,
  })
  return res.data
}

function VerifyConnectPair(connects: ConnectPair[]) {
  const set = new Set<string>()

  for (const cns of connects) {
    if (set.has(cns.match + cns.matchFunc)) {
      throw new Error(`verify pair failed ${cns.match + cns.matchFunc}`)
    }
    set.add(cns.match + cns.matchFunc)
  }
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

  async updateConnect(connects: ConnectPair[]) {
    this.connect = (await UpdateGestureAndCursorMapping(connects)).connect
  }
}

export const connectStore = new ConnectStore()
