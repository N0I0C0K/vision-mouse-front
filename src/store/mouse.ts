import { action, makeObservable, observable } from 'mobx'
import { WebSockerStore } from './base'
import { webSocketUrl } from '@/lib'
import React from 'react'
import { nanoid } from 'nanoid'
import {
  MouseLeftButton,
  MouseRightButton,
  MouseScrollDown,
  MouseScrollUp,
} from '@/components/icons'

export interface MouseAction {
  key?: string
  name: string
  time: number
  pos: {
    x: number
    y: number
  }
  icon: React.ElementType
}

class MouseActionStore extends WebSockerStore {
  actionQue: MouseAction[]
  maxSize = 5
  constructor() {
    super(webSocketUrl.mouseAction)
    this.actionQue = [
      {
        key: '1',
        name: 'Left Down',
        icon: MouseLeftButton,
        pos: {
          x: 102,
          y: 222,
        },
        time: 1212212,
      },
      {
        key: '2',
        name: 'Right Click',
        icon: MouseRightButton,
        pos: {
          x: 102,
          y: 222,
        },
        time: 1212212,
      },
      {
        key: '3',
        name: 'Scroll Down',
        icon: MouseScrollDown,
        pos: {
          x: 102,
          y: 222,
        },
        time: 1212212,
      },
      {
        key: '4',
        name: 'Scroll Up',
        icon: MouseScrollUp,
        pos: {
          x: 102,
          y: 222,
        },
        time: 1212212,
      },
    ]
    makeObservable(this, {
      actionQue: observable,
      addAction: action,
    })
  }

  addAction(action: MouseAction) {
    action.key = nanoid()
    this.actionQue = [action, ...this.actionQue].slice(0, this.maxSize)
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

export const mouseActionStore = new MouseActionStore()
