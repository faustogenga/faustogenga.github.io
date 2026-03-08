import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './home'
import OldHome from './old/OldHome'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/old" element={<OldHome />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
