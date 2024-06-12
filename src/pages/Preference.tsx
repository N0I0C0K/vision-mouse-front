import { SampleSlider } from '@/components/custom/samle-slider'
import { SampleSelect } from '@/components/custom/sample-select'
import { ExpandSettingItem, SettingItem } from '@/components/custom/set-item'
import { Space } from '@/components/custom/space'
import Stack, { AnimateStack } from '@/components/custom/stack'
import { Text, Heading } from '@/components/custom/typography'
import { Button } from '@/components/ui/button'
import { connectStore, ConnectPair } from '@/store/connect'
import { mouseStore } from '@/store/mouse'
import {
  FastForward,
  Move,
  Link,
  CirclePlus,
  CircleMinus,
  Save,
} from 'lucide-react'
import { toast } from 'sonner'
import { observer } from 'mobx-react-lite'
import { FC, useEffect, useMemo, useState } from 'react'

const RenderGestureAndCursorMapppingItem: FC<
  {
    gestureMatches: string[]
    cursorHandlers: string[]
    matchFuncs: string[]
    onPairChange?: (data: ConnectPair) => void
    onDel?: () => void
  } & ConnectPair
> = ({
  gestureMatches,
  cursorHandlers,
  matchFuncs,
  handle,
  match,
  matchFunc,
  onPairChange,
  onDel,
}) => {
  const [tmatch, SetMatch] = useState(match)
  const [tmatchFunc, SetMatchFunc] = useState(matchFunc)
  const [thandle, SetHandle] = useState(handle)

  useEffect(() => {
    onPairChange?.({
      match: tmatch,
      handle: thandle,
      matchFunc: tmatchFunc,
    })
  }, [tmatch, tmatchFunc, thandle])

  return (
    <AnimateStack
      center
      className='gap-2 w-full'
      initial={{
        y: -100,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
    >
      <SampleSelect
        placeholder='选择手势识别'
        label='全部'
        items={gestureMatches.map((val) => ({ lable: val, value: val }))}
        value={tmatch}
        onValueChange={(val) => SetMatch(val)}
        defaultValue={match}
      />
      +
      <SampleSelect
        placeholder='检测函数'
        label='全部'
        items={matchFuncs.map((val) => ({ lable: val, value: val }))}
        value={tmatchFunc}
        onValueChange={(val) => SetMatchFunc(val)}
        defaultValue={matchFunc}
      />
      <Space />
      =
      <Space />
      <SampleSelect
        placeholder='鼠标处理'
        label='全部'
        items={cursorHandlers.map((val) => ({ lable: val, value: val }))}
        value={thandle}
        onValueChange={(val) => SetHandle(val)}
        defaultValue={handle}
      />
      <Button variant={'ghost'} size='icon' onClick={onDel}>
        <CircleMinus />
      </Button>
    </AnimateStack>
  )
}

const RenderGestureAndCursorMapppingItems = observer(() => {
  const [connects, setConnects] = useState<(ConnectPair & { key?: string })[]>(
    connectStore.connect
  )
  const cursorHandlers = useMemo(
    () => connectStore.cursorHandlers,
    [connectStore.cursorHandlers]
  )
  const gestureMatches = useMemo(
    () => connectStore.gestureMatches,
    [connectStore.gestureMatches]
  )
  return (
    <Stack direction={'column'} center className='gap-2 mt-4 p-2'>
      {connects.map((val, idx) => (
        <RenderGestureAndCursorMapppingItem
          cursorHandlers={cursorHandlers}
          gestureMatches={gestureMatches}
          matchFuncs={connectStore.matchFuncs}
          handle={val.handle}
          match={val.match}
          matchFunc={val.matchFunc}
          key={idx}
          onPairChange={(data) => {
            setConnects(
              connects.map((val, idx1) => {
                if (idx1 != idx) {
                  return val
                }
                return data
              })
            )
          }}
          onDel={() => {
            setConnects(connects.filter((_, idx1) => idx != idx1))
          }}
        />
      ))}
      <Stack>
        <Button
          variant={'ghost'}
          size={'icon'}
          onClick={() => {
            setConnects([
              ...connects,
              {
                match: gestureMatches[0],
                matchFunc: 'JumpTrue',
                handle: cursorHandlers[0],
              },
            ])
          }}
        >
          <CirclePlus />
        </Button>
        <Button
          size='icon'
          variant={'ghost'}
          onClick={() => {
            connectStore.updateConnect(connects).catch((err) => {
              toast.error('保存失败', {
                description: err.message,
              })
            })
          }}
        >
          <Save />
        </Button>
      </Stack>
    </Stack>
  )
})

const RenderGestureAndCursorMapping = observer(() => {
  useEffect(() => {
    connectStore.update()
  }, [])
  return (
    <ExpandSettingItem
      Icon={Link}
      title='手势和鼠标控制'
      description='配置手势和鼠标控制的联系'
    >
      <RenderGestureAndCursorMapppingItems />
    </ExpandSettingItem>
  )
})

const RenderMouseSpeedSlider = observer(() => {
  return (
    <SampleSlider
      range={{
        max: 0.2,
        min: 0,
      }}
      value={[mouseStore.baseSpeed]}
      step={0.01}
      onValueCmt={(val) => {
        mouseStore.updateState({
          baseSpeed: val[0],
        })
      }}
    />
  )
})

const RenderMouseAcceleration = observer(() => {
  return (
    <SampleSlider
      range={{
        max: 0.2,
        min: 0,
      }}
      value={[mouseStore.acceleration]}
      step={0.01}
      onValueCmt={(val) => {
        mouseStore.updateState({
          acceleration: val[0],
        })
      }}
    />
  )
})

export const Preference: FC = () => {
  return (
    <Stack direction={'column'} className='gap-2'>
      <Stack direction={'column'} className='mb-4'>
        <Heading>个性化设置</Heading>
        <Text level='s' gray>
          包含鼠标、手势控制绑定等设置
        </Text>
      </Stack>
      <SettingItem
        title='鼠标移动速度'
        description='鼠标基础跟随手部的移动速度'
        Icon={Move}
        funcElement={<RenderMouseSpeedSlider />}
      />
      <SettingItem
        title='鼠标移动加速度'
        description='手部移动越快鼠标所具有的加速度'
        Icon={FastForward}
        funcElement={<RenderMouseAcceleration />}
      />
      <RenderGestureAndCursorMapping />
    </Stack>
  )
}
