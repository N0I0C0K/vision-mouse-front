import { Hand, Home, Settings, SquareKanban } from 'lucide-react'
import { ElementType, FC } from 'react'
import { SelectLink } from './components/custom/link'
import Stack from './components/custom/stack'
import { Separator } from './components/ui/separator'
import { ThemeSwitch } from './components/custom/theme'
import { observer } from 'mobx-react-lite'
import { useLocation } from 'react-router-dom'
import { camera } from './store/camera'
import { Heading } from './components/custom/typography'

export interface SideItem {
  title: string
  to: string
  icon?: ElementType
}

export interface SideProps {
  sideItems: SideItem[]
  buttomItems: SideItem[]
}

const props: SideProps = {
  sideItems: [
    {
      title: 'Home',
      to: '/home',
      icon: Home,
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
        />
      ))}
    </>
  )
}

const RenderCameraSatet = observer(() => {
  return (
    <p className='w-[100%] text-gray-400'>
      camera {camera.isOpened ? 'open' : 'close'}
    </p>
  )
})

export const Side: FC = () => {
  return (
    <Stack direction={'column'} className='py-4 px-2 w-40' center>
      <Hand size={60} />
      <Heading className='mb-8 mt-2 font-normal' level='h3' styled>
        Vision Mouse
      </Heading>
      <RenderSelectLinks items={props.sideItems} />
      <span className='flex-1' />
      <RenderCameraSatet />
      <Separator className='my-2' />
      <ThemeSwitch className='w-[100%] px-3 py-2' />
      <RenderSelectLinks items={props.buttomItems} />
    </Stack>
  )
}
