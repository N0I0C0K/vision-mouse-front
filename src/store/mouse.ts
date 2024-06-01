import { action, makeObservable, observable } from 'mobx'
import { WebSockerStore } from './base'
import { http, webSocketUrl } from '@/lib'
import React from 'react'
import { nanoid } from 'nanoid'
import {
  MouseLeftButton,
  MouseRightButton,
  MouseScrollDown,
  MouseScrollUp,
} from '@/components/icons'

export interface Position {
  x: number
  y: number
}

type Handle = 'LeftDown' | 'LeftUp' | 'RightClick' | 'ScrollDown' | 'ScrollUp'

const ActionAndIconMappig: Record<Handle, React.ElementType> = {
  LeftDown: MouseLeftButton,
  LeftUp: MouseLeftButton,
  RightClick: MouseRightButton,
  ScrollDown: MouseScrollDown,
  ScrollUp: MouseScrollUp,
}

export interface MouseAction {
  key?: string
  name: Handle
  time: number
  pos: Position
  icon: React.ElementType
}

export interface MouseState {
  baseSpeed: number
  acceleration: number
  pos: Position
}

export async function FetchMouseState(): Promise<MouseState> {
  const res = await http.get<MouseState>('/mouse/state')
  return res.data
}

export async function UpdateMouseState(state: Partial<MouseState>) {
  const res = await http.put<MouseState>('/mouse/state', state)
  return res.data
}

class MouseStore extends WebSockerStore {
  actionQue: MouseAction[]
  maxSize = 6
  baseSpeed: number
  acceleration: number
  pos: Position

  constructor() {
    super(webSocketUrl.mouseAction)
    this.baseSpeed = 1
    this.acceleration = 1
    this.pos = {
      x: 1,
      y: 1,
    }
    this.actionQue = []
    this.updateState()
    makeObservable(this, {
      actionQue: observable,
      baseSpeed: observable,
      acceleration: observable,
      addAction: action,
      updateState: action,
    })
  }

  addAction(action: MouseAction) {
    action.key = nanoid()
    action.icon = ActionAndIconMappig[action.name]
    this.actionQue = [action, ...this.actionQue].slice(0, this.maxSize)
  }

  async updateState(state?: Partial<MouseState>) {
    const _state =
      state === undefined
        ? await FetchMouseState()
        : await UpdateMouseState(state)

    this.acceleration = _state.acceleration
    this.baseSpeed = _state.baseSpeed
  }

  startFetch() {
    this.connect(
      action((data) => {
        const t = JSON.parse(data)
        this.addAction(t)
      })
    )
  }

  stopFetch() {
    this.close()
  }
}

export const mouseStore = new MouseStore()
