import React from 'react'
import {
  BrowserRouter as Router,
  useLocation,
  useRoutes
} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import Pricing from './pages/Pricing'
import Profiling from './pages/Profiling'
import './styles/style.css'
import Home from './pages/Home'
import HeaderBar from './components/HeaderBar'
import { Box, ThemeProvider, useMediaQuery } from '@mui/material'
import Sidebar from './components/common/Sidebar'
import { theme } from './providers/Theme'
import Comparison from './pages/Comparison'
import Scenario from './pages/Scenario'
import Glosary from './pages/Glosary'
import ServicePreferred from './pages/ServicePreferred'
import Login from './components/LogIn'
import Callback from './helpers/Callback'

function isAuthenticated() {
  // return true
  return !!localStorage.getItem('sessionToken')
}

const App = () => {
  const location = useLocation()
  const lScreen = useMediaQuery('(max-width:1919px)')

  const routing = useRoutes([
    {
      path: import.meta.env.VITE_BASE_URL2,
      element: <Login />
    },
    {
      path: import.meta.env.VITE_BASE_URL2 + 'callback',
      element: <Callback />
    },
    {
      path: import.meta.env.VITE_BASE_URL2 + 'home',
      element: isAuthenticated() ? <Home /> : <Login />
    },
    {
      path: import.meta.env.VITE_BASE_URL2 + 'pricing',
      element: isAuthenticated() ? (
        <>
          <Pricing />
        </>
      ) : (
        <Login />
      )
    },
    {
      path: import.meta.env.VITE_BASE_URL2 + 'profiling',
      element: isAuthenticated() ? (
        <>
          <Profiling />
        </>
      ) : (
        <Login />
      )
    },
    {
      path: import.meta.env.VITE_BASE_URL2 + 'comparison',
      element: isAuthenticated() ? <Comparison /> : <Login />
    },
    {
      path: import.meta.env.VITE_BASE_URL2 + 'scenario',
      element: isAuthenticated() ? <Scenario /> : <Login />
    },
    {
      path: import.meta.env.VITE_BASE_URL2 + 'service-preferred',
      element: isAuthenticated() ? <ServicePreferred /> : <Login />
    },
    {
      path: import.meta.env.VITE_BASE_URL2 + 'glossary',
      element: isAuthenticated() ? <Glosary /> : <Login />
    }
  ])

  return (
    <Box display='grid' gridTemplateRows={'auto 1fr'}>
      {isAuthenticated() &&
        (location.pathname === import.meta.env.VITE_BASE_URL2 ||
          location.pathname !== import.meta.env.VITE_BASE_URL2) && (
          <Box>
            <HeaderBar />
          </Box>
        )}
      <Box display='flex' width={lScreen ? '100vw' : '100vw'}>
        {isAuthenticated() &&
          location.pathname !== import.meta.env.VITE_BASE_URL2 &&
          location.pathname !== '/home' && <Sidebar />}
        <Box
          width={lScreen ? '100vw' : '100vw'}
          ml={
            isAuthenticated() &&
            location.pathname !== import.meta.env.VITE_BASE_URL2 &&
            location.pathname !== '/home' &&
            '38px'
          }
          bgcolor={'#F2FCFF'}
        >
          {routing}
        </Box>
      </Box>
    </Box>
  )
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>
)
