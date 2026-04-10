import { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'
import './PageLoader.css'

const MIN_MS   = 1500  // moon plays for at least this long
const FADE_MS  = 550   // must match CSS transition duration
const MAX_MS   = 12000 // safety: always dismiss after this

export default function PageLoader() {
  const { progress, active, total } = useProgress()
  const [minDone,     setMinDone]     = useState(false)
  const [fontsDone,   setFontsDone]   = useState(false)
  const [loadStarted, setLoadStarted] = useState(false)
  const [exiting,     setExiting]     = useState(false)
  const [done,        setDone]        = useState(false)

  // Minimum display time
  useEffect(() => {
    const t = setTimeout(() => setMinDone(true), MIN_MS)
    return () => clearTimeout(t)
  }, [])

  // Wait for web fonts
  useEffect(() => {
    let cancelled = false
    document.fonts.ready.then(() => { if (!cancelled) setFontsDone(true) })
    return () => { cancelled = true }
  }, [])

  // Safety: always start exit after MAX_MS
  useEffect(() => {
    const t = setTimeout(() => startExit(), MAX_MS)
    return () => clearTimeout(t)
  }, [])

  // Track when Three.js loading actually starts
  useEffect(() => {
    if (active || total > 0) setLoadStarted(true)
  }, [active, total])

  function startExit() {
    setExiting(true)
    setTimeout(() => setDone(true), FADE_MS)
  }

  // Dismiss when all conditions are met
  useEffect(() => {
    if (!minDone || !fontsDone) return

    if (loadStarted) {
      if (!active && progress >= 100) {
        const t = setTimeout(startExit, 150)
        return () => clearTimeout(t)
      }
    } else {
      // No 3D assets on this route — dismiss shortly after min time
      const t = setTimeout(startExit, 200)
      return () => clearTimeout(t)
    }
  }, [minDone, fontsDone, active, progress, loadStarted])

  if (done) return null

  return (
    <div className={`page-loader${exiting ? ' page-loader--exiting' : ''}`} aria-hidden="true">
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
