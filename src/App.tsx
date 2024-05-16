import './App.css'
import { Button } from '@/components/ui/button'
import Center from '@/components/custom/center'
import Stack from './components/custom/stack'
import { ThemeProvider } from './components/provider/theme'
import Container from './components/custom/container'

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
          <Stack
            direction={'column'}
            css={{
              width: '100px',
              gap: '1rem',
            }}
          >
            <Button>text</Button>
            <Button>text</Button>
            <Button>text</Button>
          </Stack>
        </Container>
      </Center>
    </ThemeProvider>
  )
}

export default App
