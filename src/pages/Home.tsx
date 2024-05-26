import Stack from '@/components/custom/stack'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { Stage } from 'react-konva'

const RenderLandMark = () => {
  return <Stage></Stage>
}

const Home: FC = observer(() => {
  return <Stack direction={'column'} className='flex-1 gap-2 h-[100%]'></Stack>
})

export default Home
