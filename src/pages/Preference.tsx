import { SampleSelect } from '@/components/custom/sample-select'
import { SettingItem } from '@/components/custom/set-item'
import { Space } from '@/components/custom/space'
import Stack, { AnimateStack } from '@/components/custom/stack'
import { Text, Heading } from '@/components/custom/typography'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { connectStore, ConnectPair } from '@/store/connect'
import { FastForward, Move, Link, CirclePlus } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { FC, useEffect } from 'react'

const RenderGestureAndCursorMapppingItem: FC<
  {
    gestureMatches: string[]
    cursorHandlers: string[]
  } & ConnectPair
> = ({ gestureMatches, cursorHandlers, handle, match, matchFunc }) => {
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
        defaultValue={match}
      />
      +
      <SampleSelect
        placeholder='检测函数'
        label='全部'
        items={[
          {
            lable: '跳变到真',
            value: 'JumpTrue',
          },
          {
            lable: '跳变到假',
            value: 'JumpFalse',
          },
        ]}
        defaultValue={matchFunc}
      />
      <Space />
      =
      <Space />
      <SampleSelect
        placeholder='鼠标处理'
        label='全部'
        items={cursorHandlers.map((val) => ({ lable: val, value: val }))}
        defaultValue={handle}
      />
    </AnimateStack>
  )
}

const RenderGestureAndCursorMapppingItems = observer(() => {
  return (
    <Stack direction={'column'} center className='gap-2 mt-4 p-2'>
      {connectStore.connect.map((val) => (
        <RenderGestureAndCursorMapppingItem
          cursorHandlers={connectStore.cursorHandlers}
          gestureMatches={connectStore.gestureMatches}
          handle={val.handle}
          match={val.match}
          matchFunc={val.matchFunc}
          key={val.match + val.matchFunc}
        />
      ))}
      <Button variant={'ghost'} size={'icon'}>
        <CirclePlus />
      </Button>
    </Stack>
  )
})

const RenderGestureAndCursorMapping = observer(() => {
  useEffect(() => {
    connectStore.update()
  }, [])
  return (
    <>
      <Accordion type='single' collapsible className='w-full'>
        <AccordionItem
          value='item-1'
          className='border px-4 rounded-md shadow-sm'
        >
          <AccordionTrigger>
            <Stack center>
              <Link className='mr-5 w-5 h-5' />
              <Stack direction={'column'} className='items-start'>
                <Text>手势和鼠标控制</Text>
                <Text gray level='xs'>
                  配置手势和鼠标控制的联系
                </Text>
              </Stack>
            </Stack>
          </AccordionTrigger>
          <AccordionContent>
            <Separator />
            <RenderGestureAndCursorMapppingItems />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
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
        funcElement={<></>}
      />
      <SettingItem
        title='鼠标移动加速度'
        description='手部移动越快鼠标所具有的加速度'
        Icon={FastForward}
        funcElement={<></>}
      />
      <RenderGestureAndCursorMapping />
    </Stack>
  )
}
