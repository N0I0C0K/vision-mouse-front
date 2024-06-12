import Center from '@/components/custom/center'
import Container from '@/components/custom/container'
import Stack from '@/components/custom/stack'
import { Heading, Text } from '@/components/custom/typography'
import { Button, IconButton } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { motion } from 'framer-motion'
import { RefObject, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { RenderLandMark, RenderMouseActionQueue } from './Home'
import { Spin } from '@/components/custom/spin'
import { flowStore } from '@/store/flow'
import { landMark } from '@/store/landmark'
import { mouseStore } from '@/store/mouse'
import { Power } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

export function DevTools() {
  const goto = useNavigate()
  return (
    <Stack className='fixed top-4 right-4'>
      <Button
        onClick={() => {
          goto('/dev')
        }}
      >
        Go Dev
      </Button>
    </Stack>
  )
}

function DragPlace() {
  const containerRef = useRef(null)
  return (
    <Stack direction={'column'} className='w-full'>
      <Heading>拖拽测试</Heading>
      <Text gray>使用食指和大拇指捏合</Text>
      <Container className='h-32 border mt-4' ref={containerRef}>
        <motion.div
          className='h-20 w-20 bg-red-400 rounded-lg'
          whileDrag={{
            scale: 1.1,
          }}
          drag
          dragConstraints={containerRef}
          dragMomentum={false}
        />
      </Container>
    </Stack>
  )
}

function ClickPlace() {
  const [count, setCount] = useState(0)
  const [rightCount, setRIght] = useState(0)
  return (
    <Stack direction={'column'} className='w-full'>
      <Heading>点击测试</Heading>
      <Text gray>使用食指和大拇指捏合松开，中指捏合右键</Text>
      <Text>左键测试，点击次数 {count}</Text>
      <motion.button
        className='w-20 h-20 bg-yellow-400 mt-2 rounded-lg'
        whileTap={{
          scale: 1.2,
        }}
        onClick={() => {
          setCount((pre) => pre + 1)
        }}
      ></motion.button>
      <Text className='mt-2'>右键测试，右键次数 {rightCount}</Text>
      <motion.div
        variants={{
          init: {
            rotate: 0,
          },
          click: {
            rotate: 90,
          },
        }}
        className='w-20 h-20 bg-orange-400 mt-2 rounded-lg'
        animate={rightCount % 2 === 0 ? 'init' : 'click'}
        onContextMenu={(ev) => {
          ev.preventDefault()
          setRIght((pre) => pre + 1)
        }}
      ></motion.div>
    </Stack>
  )
}

function ScrollPlace() {
  return (
    <Stack direction={'column'} className='w-full'>
      <Heading>滚动测试</Heading>
      <Text gray>使用中指捏合下滑/上滑滚动</Text>
      <ScrollArea className='h-40 p-2 border rounded-sm mt-2'>
        {Array.from({ length: 100 }).map((_, idx) => {
          return <Text key={idx}>Item {idx}</Text>
        })}
      </ScrollArea>
    </Stack>
  )
}

function Tools() {
  const goto = useNavigate()
  const [opening, Setopening] = useState(false)
  return (
    <Stack className='fixed top-4 right-4 gap-2' direction={'column'}>
      <Button
        onClick={() => {
          goto('/home')
        }}
      >
        Back
      </Button>
      <IconButton
        Icon={opening ? Spin : Power}
        variant={'default'}
        onClick={async () => {
          if (!flowStore.running) {
            Setopening(true)
            try {
              await flowStore.start()
              landMark.startFetch()
              mouseStore.startFetch()
            } catch {
              /* empty */
            }
            Setopening(false)
          } else {
            await flowStore.stop()
            landMark.stopFetch()
            mouseStore.stopFetch()
          }
        }}
      >
        {flowStore.running ? 'Close' : 'Open'}
      </IconButton>
    </Stack>
  )
}

function RenderLandMarkLocal() {
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={{ left: 10, top: 10 }}
      className='fixed left-10 top-10'
    >
      <RenderLandMark scale={0.3} />
    </motion.div>
  )
}

export const DevPage = () => {
  return (
    <Center>
      <Stack
        direction={'column'}
        className='py-5 gap-4'
        center
        css={{
          height: '100vh',
          width: '40rem',
        }}
      >
        <Tools />
        <DragPlace />
        <Separator />
        <ClickPlace />
        <Separator />
        <ScrollPlace />
        <RenderLandMarkLocal />
      </Stack>
    </Center>
  )
}
