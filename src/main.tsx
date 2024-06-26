import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.tsx'
import { SettingPage } from './pages/Setting.tsx'
import Camera from './pages/Camera.tsx'
import { Preference } from './pages/Preference.tsx'
import { DevPage } from './pages/DevTools.tsx'
import { ThemeProvider } from './components/provider/theme.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/setting',
        element: <SettingPage />,
      },
      {
        path: '/camera',
        element: <Camera />,
      },
      {
        path: '/preference',
        element: <Preference />,
      },
      {
        path: '',
        element: <Home />,
      },
    ],
  },
  {
    path: '/dev',
    element: <DevPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark'>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
