import { Dot, Hand, Home, Settings, SquareKanban, Webcam } from 'lucide-react'
import { ElementType, FC, ReactElement } from 'react'
import { SelectLink } from './components/custom/link'
import Stack from './components/custom/stack'
import { Separator } from './components/ui/separator'
import { ThemeSwitch } from './components/custom/theme'
import { observer } from 'mobx-react-lite'
import { useLocation } from 'react-router-dom'
import { camera } from './store/camera'
import { Heading } from './components/custom/typography'
import { cn } from './lib/utils'

export interface SideItem {
  title: string
  to: string
  icon?: ElementType
  right?: ReactElement
}

export interface SideProps {
  sideItems: SideItem[]
  buttomItems: SideItem[]
}

const RenderCameraOpenState = observer(() => {
  return (
    <>
      <Dot
        strokeWidth={3}
        className={cn(
          'ml-[-1rem]',
          camera.isOpened ? 'text-green-500' : 'text-red-500'
        )}
      />
    </>
  )
})

const props: SideProps = {
  sideItems: [
    {
      title: 'Home',
      to: '/home',
      icon: Home,
    },
    {
      title: 'Camera',
      to: '/camera',
      icon: Webcam,
      right: <RenderCameraOpenState />,
    },
    {
      title: 'Preference',
      to: '/preference',
      icon: SquareKanban,
    },
  ],
  buttomItems: [
    {
      title: 'Setting',
      to: '/setting',
      icon: Settings,
    },
  ],
}

const RenderSelectLinks: FC<{
  items: SideItem[]
}> = ({ items }) => {
  const loc = useLocation()
  return (
    <>
      {items.map((val) => (
        <SelectLink
          key={val.to}
          className='w-[100%] px-3 py-2'
          title={val.title}
          to={val.to}
          selected={loc.pathname.startsWith(val.to)}
          icon={val.icon ? <val.icon className='h-4 w-4' /> : undefined}
          style={{
            fontFamily: 'Poetsen One',
          }}
          rightElement={val.right}
        />
      ))}
    </>
  )
}

export const Side: FC = () => {
  return (
    <Stack direction={'column'} className='py-4 px-2 w-40' center>
      <Hand size={60} className='my-2 min-h-10' />
      <Heading className='mb-8 mt-2 font-normal' level='h4' styled>
        Vision Mouse
      </Heading>
      <RenderSelectLinks items={props.sideItems} />
      <span className='flex-1' />
      <Separator className='my-2' />
      <ThemeSwitch className='w-[100%] px-3 py-2' />
      <RenderSelectLinks items={props.buttomItems} />
    </Stack>
  )
}
