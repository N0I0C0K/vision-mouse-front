import './App.css'
import Center from '@/components/custom/center'
import Stack from '@/components/custom/stack'
import { ThemeProvider } from '@/components/provider/theme'
import Container from '@/components/custom/container'
import { Separator } from '@/components/ui/separator'
import { Outlet } from 'react-router-dom'
import { Side } from './Side'
import { Toaster } from './components/ui/sonner'
import { ScrollArea } from './components/ui/scroll-area'

function App() {
  return (
    <ThemeProvider defaultTheme='dark'>
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
            height: '33rem',
          }}
        >
          <Stack className='h-full w-full' direction={'row'}>
            <Side />
            <Separator orientation='vertical' />
            <Container className='flex-1 p-1'>
              <ScrollArea className='w-[100%] h-[100%] p-3 rounded-sm'>
                <Outlet />
              </ScrollArea>
            </Container>
          </Stack>
          <Toaster position='top-right' richColors />
        </Container>
      </Center>
    </ThemeProvider>
  )
}

export default App
