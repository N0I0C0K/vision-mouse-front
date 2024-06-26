import { Spin } from '@/components/custom/spin'
import Stack from '@/components/custom/stack'
import { Heading, Text } from '@/components/custom/typography'
import { IconButton } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { flowStore } from '@/store/flow'
import { HandInfo, landMark } from '@/store/landmark'
import { CircleOff, ExternalLink, Mouse, Power } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { Stage, Circle, Layer } from 'react-konva'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MouseAction, mouseStore } from '@/store/mouse'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Container from '@/components/custom/container'

const RenderLandMarkNoConnect: FC = observer(() => {
  return (
    <Stack
      direction={'column'}
      center
      className='bg-muted rounded-sm justify-center w-full h-full'
    >
      <CircleOff size={40} />
      <Text className='mt-2' gray>
        还没有打开
      </Text>
    </Stack>
  )
})

function RenderHand({
  handInfo,
  pkey,
  color,
}: {
  handInfo: HandInfo
  pkey: number
  color?: string
}) {
  return (
    <>
      {handInfo.map((pos, idx1) => (
        <Circle
          x={pos.x}
          y={pos.y}
          radius={10}
          fill={color ?? 'green'}
          key={(pkey + 1 * 1000) ^ (idx1 + 1)}
        />
      ))}
    </>
  )
}

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
            return <RenderHand key={idx} handInfo={val} pkey={idx} />
          })}
          <RenderHand pkey={1273} handInfo={landMark.currentHand} color='red' />
        </Layer>
      </Stage>
    )
  })

export const RenderLandMark: FC<{
  scale?: number
}> = observer(({ scale: scaled }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [resizeSig, setSig] = useState(0)
  const resizeObserver = useMemo(() => {
    return new ResizeObserver(() => setSig((x) => x + 1))
  }, [])
  useEffect(() => {
    if (containerRef.current) resizeObserver.observe(containerRef.current)
  }, [containerRef.current])
  const size = useMemo(() => {
    return containerRef.current === null
      ? {
          width: landMark.width,
          height: landMark.height,
        }
      : {
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        }
  }, [containerRef.current, landMark, resizeSig])
  const scale = useMemo(() => {
    return size.width / landMark.width
  }, [size])
  return (
    <Container className='flex-1'>
      <AspectRatio ratio={landMark.width / landMark.height} ref={containerRef}>
        {landMark.connected ? (
          <RenderLandMarkDraw
            width={size.width}
            height={size.height}
            scale={scale}
          />
        ) : (
          <RenderLandMarkNoConnect />
        )}
      </AspectRatio>
    </Container>
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
> = ({ die = false, name, icon: Icon, pos, time }) => {
  return (
    <motion.div
      variants={{
        die: {
          x: 100,
          width: 0,
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
      className='border p-2 rounded-md w-32 h-32 relative overflow-hidden shadow-md flex flex-col items-end'
    >
      <Text className='font-semibold'>{name}</Text>
      <Text level='xs' gray>{`${pos.x},${pos.y}`}</Text>
      <Icon className='w-24 h-24 absolute -bottom-6 -left-6' />
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

export const RenderMouseActionQueue = observer(() => {
  return (
    <>
      <Stack className='gap-2 w-full justify-center' center>
        {mouseStore.actionQue.map((val, index) => (
          <RenderGestureItem
            key={val.key}
            die={index === mouseStore.maxSize - 1}
            icon={val.icon}
            name={val.name}
            pos={val.pos}
            time={val.time}
          />
        ))}
      </Stack>
    </>
  )
})

const RenderMouseAction = observer(() => {
  return mouseStore.actionQue.length === 0 ? (
    <RenderMouseActionEmpty />
  ) : (
    <RenderMouseActionQueue />
  )
})

const Home: FC = observer(() => {
  return (
    <Stack direction={'column'} className='gap-2 max-w-full h-full'>
      <Stack direction={'row'} className='gap-4 h-full'>
        <RenderLandMark />
        <Stack direction={'column'} className='gap-1 w-[10rem]'>
          <Heading>预览</Heading>
          <Text level='s' gray>
            实时预览手势识别
          </Text>
          <Separator className='my-2' />
          <RenderColumnButton />
        </Stack>
      </Stack>
      <Separator className='my-2' />
      <RenderMouseAction />
    </Stack>
  )
})

export default Home
