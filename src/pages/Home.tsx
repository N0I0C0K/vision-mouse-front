import Center from '@/components/custom/center'
import Container from '@/components/custom/container'
import { Spin } from '@/components/custom/spin'
import Stack from '@/components/custom/stack'
import { Button } from '@/components/ui/button'
import { FC } from 'react'

const Home: FC = () => {
  return (
    <Stack direction={'column'} className='flex-1 p-4 gap-2 h-[100%]'>
      <Container border className='flex-1  shadow-sm'>
        <Center column className='bg-muted'>
          <Spin className='w-20 h-20' />
        </Center>
      </Container>
      <Stack direction={'row'}>
        <Button>Connect</Button>
      </Stack>
    </Stack>
  )
}

export default Home
