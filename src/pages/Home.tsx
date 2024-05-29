import { Spin } from '@/components/custom/spin'
import Stack from '@/components/custom/stack'
import { Heading, Text } from '@/components/custom/typography'
import { MouseLeftButton } from '@/components/icons'
import { Button, IconButton } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { flowStore } from '@/store/flow'
import { landMark } from '@/store/landmark'
import { CircleOff, ExternalLink, Mouse, Power } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { Stage, Circle, Layer } from 'react-konva'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { nanoid } from 'nanoid'
import { ScrollArea } from '@/components/ui/scroll-area'
import Container from '@/components/custom/container'
import { MouseAction, mouseActionStore } from '@/store/mouse'

const RenderLandMarkNoConnect: FC<{ width: number; height: number }> = observer(
  ({ width, height }) => {
    return (
      <Stack
        direction={'column'}
        center
        className='bg-muted rounded-sm justify-center'
        style={{
          width,
          height,
        }}
      >
        <CircleOff size={40} />
        <Text className='mt-2' gray>
          还没有打开
        </Text>
      </Stack>
    )
  }
)

const RenderLandMarkDraw: FC<{ width: number; height: number; scale: number }> =
  observer(({ width, height, scale }) => {
    return (
      <Stage
        width={width}
        height={height}
        className={cn(
          'border rounded-sm shadow-sm bg-muted',
          `w-[${width}]`,
          `h-[${height}]`
        )}
        scale={{
          x: scale,
          y: scale,
        }}
      >
        <Layer>
          {landMark.allHand.map((val, idx) => {
            return (
              <>
                {val.map((pos, idx1) => (
                  <Circle
                    x={pos.x}
                    y={pos.y}
                    radius={10}
                    fill='green'
                    key={(idx + 1) * 100 + idx1 + 1}
                  />
                ))}
              </>
            )
          })}
        </Layer>
      </Stage>
    )
  })

const RenderLandMark = observer(() => {
  const scale = 0.44
  return landMark.connected ? (
    <RenderLandMarkDraw
      width={landMark.width * scale}
      height={landMark.height * scale}
      scale={scale}
    />
  ) : (
    <RenderLandMarkNoConnect
      width={landMark.width * scale}
      height={landMark.height * scale}
    />
  )
})

const RenderColumnButton = observer(() => {
  const [opening, Setopening] = useState(false)
  const goto = useNavigate()
  return (
    <Stack direction={'column'} className='gap-2'>
      <IconButton
        Icon={opening ? Spin : Power}
        variant={'default'}
        onClick={async () => {
          if (!flowStore.running) {
            Setopening(true)
            try {
              await flowStore.start()
              landMark.startFetch()
              //mouseActionStore.startFetch()
            } catch {
              /* empty */
            }
            Setopening(false)
          } else {
            await flowStore.stop()
            landMark.stopFetch()
            //mouseActionStore.stopFetch()
          }
        }}
      >
        {flowStore.running ? 'Close' : 'Open'}
      </IconButton>
      <IconButton
        Icon={ExternalLink}
        variant={'outline'}
        onClick={() => {
          goto('/preference')
        }}
      >
        配置
      </IconButton>
    </Stack>
  )
})

const RenderGestureItem: FC<
  {
    die?: boolean
  } & MouseAction
> = ({ die = false }) => {
  return (
    <motion.div
      variants={{
        die: {
          x: 100,
          opacity: 0,
        },
        show: {
          x: 0,
          opacity: 1,
        },
        init: {
          x: -100,
          opacity: 0,
        },
      }}
      transition={{}}
      layout
      initial={'init'}
      animate={die ? 'die' : 'show'}
      className='border p-2 rounded-md w-28 h-28 relative overflow-hidden shadow-md'
    >
      <Text>左按下</Text>
      <MouseLeftButton className='w-24 h-24 absolute -bottom-8 -right-8' />
    </motion.div>
  )
}

const RenderMouseActionEmpty = () => {
  return (
    <Stack direction={'column'} className='justify-center mt-10' center>
      <Mouse size={40} />
      <Text gray>还没有鼠标事件</Text>
    </Stack>
  )
}

const RenderMouseActionQueue = observer(() => {
  return (
    <>
      <Stack className='gap-2 w-[46rem]'>
        {mouseActionStore.actionQue.map((val, index) => (
          <RenderGestureItem
            key={val.key}
            die={index === mouseActionStore.maxSize - 1}
            {...val}
          />
        ))}
      </Stack>
    </>
  )
})

const RenderMouseAction = observer(() => {
  return mouseActionStore.actionQue.length === 0 ? (
    <RenderMouseActionEmpty />
  ) : (
    <RenderMouseActionQueue />
  )
})

const Home: FC = observer(() => {
  return (
    <Stack direction={'column'} className='gap-2 max-w-full'>
      <Stack direction={'row'} className='gap-4'>
        <RenderLandMark />
        <Stack direction={'column'} className='gap-1 flex-1'>
          <Heading>预览</Heading>
          <Text level='s' gray>
            实时预览手势识别
          </Text>
          <Separator className='my-2' />
          <RenderColumnButton />
        </Stack>
      </Stack>
      <Separator />
      <RenderMouseAction />
    </Stack>
  )
})

export default Home
