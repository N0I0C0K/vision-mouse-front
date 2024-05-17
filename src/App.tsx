import './App.css'
import Center from '@/components/custom/center'
import Stack from '@/components/custom/stack'
import { ThemeProvider } from '@/components/provider/theme'
import Container from '@/components/custom/container'
import { Separator } from '@/components/ui/separator'
import { Outlet } from 'react-router-dom'
import { Side } from './Side'

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
          className='shadow-sm'
          border
          css={{
            width: '60rem',
            height: '36rem',
          }}
        >
          <Stack className='h-full w-full' direction={'row'}>
            <Side />
            <Separator orientation='vertical' />
            <Container className='flex-1'>
              <Outlet />
            </Container>
          </Stack>
        </Container>
      </Center>
    </ThemeProvider>
  )
}

export default App
