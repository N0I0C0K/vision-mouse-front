import Container from '@/components/custom/container'
import Stack from '@/components/custom/stack'
import { Heading, Text } from '@/components/custom/typography'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { RefObject, useRef } from 'react'

export function DevTools() {
  return (
    <Stack className='fixed top-4 right-4'>
      <Button>Go Dev</Button>
    </Stack>
  )
}

export function DragBox({
  constraintsRef,
}: {
  constraintsRef?: RefObject<Element>
}) {
  return (
    <motion.div
      className='h-10 w-10 bg-red-400 rounded-sm'
      drag
      dragConstraints={constraintsRef}
      dragMomentum={false}
    />
  )
}

export function DragPlace() {
  const containerRef = useRef(null)
  return (
    <Stack direction={'column'}>
      <Heading>拖拽测试</Heading>
      <Text gray>使用食指按下来进行拖拽</Text>
      <Container className='h-32 w-[40rem] border mt-4' ref={containerRef}>
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

export function ClickPlace() {
  return (
    <Stack direction={'column'}>
      <Heading>拖拽测试</Heading>
      <Text gray>使用食指按下来进行拖拽</Text>
    </Stack>
  )
}

export const DevPage = () => {
  return (
    <Stack
      direction={'column'}
      className='py-5 gap-2'
      center
      css={{
        height: '100vh',
      }}
    >
      <Stack className='fixed top-4 right-4'>
        <Button>Back</Button>
      </Stack>
      <DragPlace />
      <ClickPlace />
    </Stack>
  )
}
