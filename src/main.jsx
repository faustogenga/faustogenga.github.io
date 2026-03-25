import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ParallaxProvider } from 'react-scroll-parallax'
import PageLoader from './components/PageLoader'
import './styles/Fonts.css'
import './styles/globals.css'
import Home from './home'

const OldHome = lazy(() => import('./old/OldHome'))

const AppShell = () => (
  <>
    <PageLoader />

    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<OldHome />} />
        <Route path="/new" element={<Home />} />
        <Route path="/old" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  </>
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ParallaxProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </ParallaxProvider>
  </React.StrictMode>,
)
