import Container from '@/components/custom/container'
import Stack from '@/components/custom/stack'
import { Button } from '@/components/ui/button'
import { FC } from 'react'

const Home: FC = () => {
  return (
    <Stack direction={'column'} className='flex-1 p-4 gap-2 h-[100%]'>
      <Container border className='flex-1 bg-muted shadow-sm' />
      <Stack direction={'row'}>
        <Button>Connect</Button>
      </Stack>
    </Stack>
  )
}

export default Home
