import { useState, useEffect } from 'react'
import './PageLoader.css'

const PageLoader = () => {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 1950)
    return () => clearTimeout(timer)
  }, [])

  if (done) return null

  return (
    <div className="page-loader" aria-hidden="true">
      <div className="page-loader__inner">
        <img
          className="page-loader__moon"
          src="/moonGIF.webp"
          alt="Loading"
        />
      </div>
    </div>
  )
}

export default PageLoader
