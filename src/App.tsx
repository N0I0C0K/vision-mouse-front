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
import { isTauri } from './lib/utils'
import { Button } from './components/ui/button'
import { X, Minus, Maximize } from 'lucide-react'

import { DevTools } from './pages/DevTools'
import { appWindow } from '@tauri-apps/api/window'

function AppContent() {
  return (
    <>
      <Stack className='h-full w-full' direction={'row'}>
        <Side />
        <Separator orientation='vertical' />
        <Container className='flex-1 p-1 w-full h-full'>
          <TauriAppBar />
          <ScrollArea className='w-full h-full p-3 rounded-sm'>
            <Outlet />
          </ScrollArea>
        </Container>
      </Stack>
      <Toaster position='top-right' richColors closeButton />
    </>
  )
}

function TauriAppBar() {
  return (
    <Stack
      direction={'rowr'}
      className='pr-2 pt-1 gap-1'
      data-tauri-drag-region=''
    >
      <Button
        className='w-4 h-4 rounded-full bg-red-500'
        size={'icon'}
        variant={'default'}
        onClick={() => {
          appWindow.close()
        }}
      >
        <X size={13} strokeWidth={3} />
      </Button>
      <Button
        className='w-4 h-4 rounded-full bg-yellow-500'
        size={'icon'}
        variant={'default'}
        onClick={() => {
          appWindow.maximize()
        }}
      >
        <Maximize size={10} strokeWidth={3} />
      </Button>
      <Button
        className='w-4 h-4 rounded-full bg-green-500'
        size={'icon'}
        variant={'default'}
        onClick={() => {
          appWindow.minimize()
        }}
      >
        <Minus size={13} strokeWidth={3} />
      </Button>
    </Stack>
  )
}

function App() {
  return (
    <Center
      column
      css={{
        height: '100vh',
      }}
    >
      {isTauri ? (
        <Stack className='h-full w-full shadow-lg' direction={'column'}>
          <AppContent />
        </Stack>
      ) : (
        <>
          <Container
            className='shadow-sm'
            border
            css={{
              width: '60rem',
              height: '33rem',
            }}
          >
            <AppContent />
          </Container>
          <DevTools />
        </>
      )}
    </Center>
  )
}

export default App
