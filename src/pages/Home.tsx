import { Space } from '@/components/custom/space'
import Center from '@/components/custom/center'
import Container from '@/components/custom/container'
import { Spin } from '@/components/custom/spin'
import Stack from '@/components/custom/stack'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { baseUrl } from '@/lib'
import { camera } from '@/store/camera'
import { CameraOff, Video, VideoOff } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { FC, useEffect, useRef } from 'react'

function RenderCamerClose() {
  return (
    <Stack
      direction={'column'}
      center
      className='h-[100%] justify-center bg-muted rounded-sm shadow-sm'
    >
      <CameraOff size={40} />
      <p>Camera is closed</p>
    </Stack>
  )
}

const RenderCamerRealTime = observer(() => {
  return (
    <img
      src={`http://${baseUrl}/camera/feed`}
      className='w-[100%] h-auto rounded-sm'
    />
  )
})

const RenderButtons = observer(() => {
  return (
    <Stack direction={'rowr'} className='gap-2'>
      <Button
        onClick={async () => {
          await camera.open()
        }}
      >
        <Video className='mr-2' />
        Open
      </Button>
      <Button
        onClick={async () => {
          await camera.close()
        }}
        variant={'secondary'}
      >
        <VideoOff className='mr-2' />
        Close
      </Button>
    </Stack>
  )
})

const Home: FC = observer(() => {
  return (
    <Stack direction={'column'} className='flex-1 gap-2 h-[100%]'>
      <AspectRatio ratio={camera.size.width / camera.size.height}>
        {camera.isOpened ? <RenderCamerRealTime /> : <RenderCamerClose />}
      </AspectRatio>
      <Space />
      <RenderButtons />
    </Stack>
  )
})

export default Home
