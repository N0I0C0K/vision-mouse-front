import { action, makeObservable, observable } from 'mobx'
import { WebSockerStore } from './base'
import { webSocketUrl } from '@/lib'
import React from 'react'
import { nanoid } from 'nanoid'

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
  actionQue: MouseAction[] = []
  maxSize = 5
  constructor() {
    super(webSocketUrl.mouseAction)
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
