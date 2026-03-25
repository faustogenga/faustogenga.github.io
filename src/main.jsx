import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ParallaxProvider } from 'react-scroll-parallax'

const Home = lazy(() => import('./home'))
const OldHome = lazy(() => import('./old/OldHome'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ParallaxProvider>
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<OldHome />} />
            <Route path="/new" element={<Home />} />
            <Route path="/old" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ParallaxProvider>
  </React.StrictMode>,
)
