import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './CustomCursor.css'

export default function CustomCursor() {
  const dotRef = useRef()
  const ringRef = useRef()

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 })

    const onMove = (e) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.06, ease: 'power3.out' })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.22, ease: 'power3.out' })
    }

    const onEnter = () => {
      gsap.to(ring, { scale: 2.2, borderColor: 'rgba(206,255,94,0.3)', duration: 0.4, ease: 'expo.out' })
      gsap.to(dot, { scale: 0.3, duration: 0.3, ease: 'expo.out' })
    }

    const onLeave = () => {
      gsap.to(ring, { scale: 1, borderColor: 'rgba(206,255,94,0.7)', duration: 0.4, ease: 'expo.out' })
      gsap.to(dot, { scale: 1, duration: 0.3, ease: 'expo.out' })
    }

    const onMouseDown = () => {
      gsap.to([dot, ring], { scale: 0.7, duration: 0.15, ease: 'expo.out' })
    }

    const onMouseUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.3, ease: 'spring(1, 80, 10)' })
      gsap.to(ring, { scale: 1, duration: 0.4, ease: 'expo.out' })
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    // Attach to interactables
    const attach = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    attach()
    // Re-attach on DOM changes
    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
