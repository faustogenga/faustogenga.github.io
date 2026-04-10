import { useEffect, useRef } from 'react'

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

function createStar(width, height) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: randomBetween(0.45, 1.85),
    alpha: randomBetween(0.16, 0.72),
    twinkleSpeed: randomBetween(0.6, 1.7),
    twinkleOffset: Math.random() * Math.PI * 2,
    driftX: randomBetween(-10, 10),
    driftY: randomBetween(-8, 8),
  }
}

function createComet(width, height) {
  const angle = randomBetween(-0.6, -0.18)
  const speed = randomBetween(45, 95)
  return {
    x: randomBetween(-width * 0.18, width * 1.08),
    y: randomBetween(0, height),
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    length: randomBetween(22, 62),
    thickness: randomBetween(0.8, 1.8),
    alpha: randomBetween(0.18, 0.72),
  }
}

export default function HeroCosmosCanvas({ heroRef, attractorRef }) {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const heroElement = heroRef.current

    if (!canvas || !heroElement) {
      return undefined
    }

    const context = canvas.getContext('2d')

    if (!context) {
      return undefined
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    const starCount = prefersReducedMotion ? 48 : isCoarsePointer ? 68 : 112
    const cometCount = prefersReducedMotion ? 4 : isCoarsePointer ? 6 : 10

    let width = 0
    let height = 0
    let dpr = 1
    let animationFrameId = 0
    let stars = []
    let comets = []
    let lastTime = performance.now()
    const resizeCanvas = () => {
      const bounds = heroElement.getBoundingClientRect()
      width = Math.max(bounds.width, 1)
      height = Math.max(bounds.height, 1)
      dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      stars = Array.from({ length: starCount }, () => createStar(width, height))
      comets = Array.from({ length: cometCount }, () => createComet(width, height))
    }

    const renderFrame = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.033)
      lastTime = time

      context.clearRect(0, 0, width, height)

      const attractorBounds = attractorRef.current?.getBoundingClientRect()
      const heroBounds = heroElement.getBoundingClientRect()
      const centerX = attractorBounds
        ? attractorBounds.left - heroBounds.left + attractorBounds.width / 2
        : width / 2
      const centerY = attractorBounds
        ? attractorBounds.top - heroBounds.top + attractorBounds.height / 2
        : height / 2

      const gravityRange = Math.min(width, height) * 0.5

      for (const star of stars) {
        const gravityDx = centerX - star.x
        const gravityDy = centerY - star.y
        const gravityDistance = Math.hypot(gravityDx, gravityDy) || 1
        const gravityStrength = Math.max(0, 1 - gravityDistance / gravityRange) * 2.8

        let offsetX = (gravityDx / gravityDistance) * gravityStrength
        let offsetY = (gravityDy / gravityDistance) * gravityStrength

        const driftScale = Math.sin(time * 0.0006 * star.twinkleSpeed + star.twinkleOffset)
        const drawX = star.x + star.driftX * driftScale + offsetX
        const drawY = star.y + star.driftY * driftScale + offsetY
        const alpha = star.alpha * (0.58 + 0.42 * Math.sin(time * 0.0012 * star.twinkleSpeed + star.twinkleOffset) ** 2)

        context.beginPath()
        context.fillStyle = `rgba(255, 255, 255, ${alpha})`
        context.shadowColor = 'rgba(255, 255, 255, 0.32)'
        context.shadowBlur = star.radius < 1 ? 0 : 6
        context.arc(drawX, drawY, star.radius, 0, Math.PI * 2)
        context.fill()
      }

      context.shadowBlur = 0

      for (const comet of comets) {
        comet.x += comet.vx * dt
        comet.y += comet.vy * dt

        const gravityDx = centerX - comet.x
        const gravityDy = centerY - comet.y
        const gravityDistance = Math.hypot(gravityDx, gravityDy) || 1
        const gravityStrength = Math.max(0, 1 - gravityDistance / gravityRange) * 3.5
        comet.vx += (gravityDx / gravityDistance) * gravityStrength * dt * 12
        comet.vy += (gravityDy / gravityDistance) * gravityStrength * dt * 12

        if (
          comet.x > width + comet.length * 2 ||
          comet.x < -width * 0.25 ||
          comet.y < -height * 0.25 ||
          comet.y > height + height * 0.25
        ) {
          Object.assign(comet, createComet(width, height))
          comet.x = randomBetween(-width * 0.18, width * 0.22)
          comet.y = randomBetween(0, height)
        }

        const angle = Math.atan2(comet.vy, comet.vx)
        const tailX = Math.cos(angle) * comet.length
        const tailY = Math.sin(angle) * comet.length

        const gradient = context.createLinearGradient(comet.x - tailX, comet.y - tailY, comet.x, comet.y)
        gradient.addColorStop(0, 'rgba(255,255,255,0)')
        gradient.addColorStop(1, `rgba(255,255,255,${comet.alpha})`)

        context.beginPath()
        context.strokeStyle = gradient
        context.lineWidth = comet.thickness
        context.lineCap = 'round'
        context.moveTo(comet.x - tailX, comet.y - tailY)
        context.lineTo(comet.x, comet.y)
        context.stroke()

        context.beginPath()
        context.fillStyle = `rgba(255,255,255,${Math.min(1, comet.alpha + 0.18)})`
        context.arc(comet.x, comet.y, comet.thickness * 1.15, 0, Math.PI * 2)
        context.fill()
      }

      animationFrameId = window.requestAnimationFrame(renderFrame)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    animationFrameId = window.requestAnimationFrame(renderFrame)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [attractorRef, heroRef])

  return <canvas ref={canvasRef} className="hero-cosmos-canvas" aria-hidden="true" />
}
