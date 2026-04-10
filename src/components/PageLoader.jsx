import { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'
import './PageLoader.css'

const MIN_MS = 900   // moon plays for at least this long
const MAX_MS = 10000 // safety: always dismiss after this

export default function PageLoader() {
  const { progress, active, total } = useProgress()
  const [minDone,      setMinDone]      = useState(false)
  const [loadStarted,  setLoadStarted]  = useState(false)
  const [done,         setDone]         = useState(false)

  // Minimum display time
  useEffect(() => {
    const t = setTimeout(() => setMinDone(true), MIN_MS)
    return () => clearTimeout(t)
  }, [])

  // Safety: always dismiss after MAX_MS
  useEffect(() => {
    const t = setTimeout(() => setDone(true), MAX_MS)
    return () => clearTimeout(t)
  }, [])

  // Track when Three.js loading actually starts
  useEffect(() => {
    if (active || total > 0) setLoadStarted(true)
  }, [active, total])

  // Dismiss when min time has passed and assets are ready
  useEffect(() => {
    if (!minDone) return

    if (loadStarted) {
      // Wait for all 3D assets to finish
      if (!active && progress >= 100) {
        const t = setTimeout(() => setDone(true), 150)
        return () => clearTimeout(t)
      }
    } else {
      // No 3D assets on this route — dismiss shortly after min time
      const t = setTimeout(() => setDone(true), 200)
      return () => clearTimeout(t)
    }
  }, [minDone, active, progress, loadStarted])

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
