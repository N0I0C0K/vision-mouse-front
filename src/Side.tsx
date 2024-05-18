import { Hand, Home, Settings, SquareKanban } from 'lucide-react'
import { ElementType, FC } from 'react'
import { SelectLink } from './components/custom/link'
import Stack from './components/custom/stack'
import { Separator } from './components/ui/separator'
import { ThemeSwitch } from './components/custom/theme'

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
  return (
    <>
      {items.map((val) => (
        <SelectLink
          className='w-[100%] px-3 py-2'
          title={val.title}
          to={val.to}
          icon={val.icon ? <val.icon className='h-4 w-4' /> : undefined}
        />
      ))}
    </>
  )
}

export const Side: FC = () => {
  return (
    <Stack direction={'column'} className='py-4 px-2 w-40' center>
      <Hand size={60} />
      <h3 className='mb-8 mt-2'>Vision Mouse</h3>
      <RenderSelectLinks items={props.sideItems} />
      <span className='flex-1' />
      <Separator className='my-2' />
      <ThemeSwitch className='w-[100%] px-3 py-2' />
      <RenderSelectLinks items={props.buttomItems} />
    </Stack>
  )
}
