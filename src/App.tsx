import './App.css'
import { Hand, Home, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Center from '@/components/custom/center'
import Stack from './components/custom/stack'
import { ThemeProvider } from './components/provider/theme'
import Container from './components/custom/container'
import { SelectLink } from './components/custom/link'
import { Separator } from './components/ui/separator'

function App() {
  return (
    <ThemeProvider defaultTheme='light'>
      <Center
        column
        css={{
          height: '100vh',
        }}
      >
        <Container
          className='border shadow-sm'
          css={{
            width: '60rem',
            height: '36rem',
          }}
        >
          <Stack className='h-full w-full' direction={'row'}>
            <Stack direction={'column'} className='py-4 px-2 w-40' center>
              <Hand size={60} />
              <h3 className='mb-8'>Vision Mouse</h3>
              <SelectLink
                to={'/test'}
                title='Home'
                selected
                icon={<Home className='h-4 w-4' />}
              />
              <SelectLink to={'/test'} title='Test' />
              <SelectLink to={'/test'} title='Test' />
              <SelectLink to={'/test'} title='Test' />
              <span className='flex-1' />
              <Separator className='my-2' />
              <SelectLink
                to={'/setting'}
                title='Setting'
                icon={<Settings className='h-4 w-4' />}
              />
            </Stack>
            <Separator className='' orientation='vertical' />
            <Button>11</Button>
          </Stack>
        </Container>
      </Center>
    </ThemeProvider>
  )
}

export default App
