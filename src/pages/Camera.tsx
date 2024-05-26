import Center from '@/components/custom/center'
import Container from '@/components/custom/container'
import { SampleSelect } from '@/components/custom/sample-select'
import { SettingItem } from '@/components/custom/set-item'
import { Space } from '@/components/custom/space'
import { Spin } from '@/components/custom/spin'
import Stack from '@/components/custom/stack'
import { Heading, Text } from '@/components/custom/typography'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { baseUrl } from '@/lib'
import { camera } from '@/store/camera'
import { CameraOff, Play, ScanEye, Video, VideoOff, Zap } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { FC, useEffect, useState } from 'react'
import { toast } from 'sonner'

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

const RenderCameraSwitch = observer(() => {
  const [opening, setOpening] = useState(false)
  return (
    <>
      {camera.isOpened ? (
        <Button
          onClick={async () => {
            await camera.close()
          }}
          variant={'destructive'}
        >
          Close
        </Button>
      ) : (
        <Button
          disabled={opening}
          onClick={() => {
            setOpening(true)
            camera
              .open()
              .then(() => {
                toast.success('open camera success')
                setOpening(false)
              })
              .catch((err) => {
                toast.error('failed to open camera', {
                  description: err,
                })
                setOpening(false)
              })
          }}
        >
          {opening && <Spin />}
          Open
        </Button>
      )}
    </>
  )
})

const RenderExposureSlider = observer(() => {
  const [val, setVal] = useState(camera.exposure)
  useEffect(() => {
    setVal(camera.exposure)
  }, [camera.exposure])
  return (
    <>
      <Slider
        max={20}
        value={[val + 10]}
        step={1}
        onValueChange={(vals) => {
          setVal(vals[0] - 10)
        }}
        onValueCommit={(vals) => {
          setVal(vals[0] - 10)
          camera.setExposure(vals[0] - 10)
        }}
        className='w-24 mr-2'
      />
      <Text className='w-4'>{val}</Text>
    </>
  )
})

const Camera: FC = observer(() => {
  return (
    <Stack
      direction={'column'}
      className='flex-1 gap-2 h-[100%] w-[100%] scorll'
    >
      <AspectRatio ratio={camera.size.width / camera.size.height}>
        {camera.isOpened ? <RenderCamerRealTime /> : <RenderCamerClose />}
      </AspectRatio>
      <SettingItem
        title='相机开关'
        Icon={Video}
        funcElement={<RenderCameraSwitch />}
      />
      <SettingItem
        title='相机预览源'
        description='选择实时画面预览来源'
        Icon={ScanEye}
        funcElement={
          <SampleSelect
            value='realCamer'
            className='w-[10rem]'
            placeholder='preview'
            label='预览选项'
            items={[
              {
                value: 'realCamer',
                lable: '相机实时预览',
              },
              {
                value: 'draw',
                lable: '绘制手部关键点',
              },
            ]}
          />
        }
      />
      <SettingItem
        title='快门速度'
        description='较高的快门速度可以减少拖影'
        Icon={Zap}
        funcElement={<RenderExposureSlider />}
      />
    </Stack>
  )
})

export default Camera
