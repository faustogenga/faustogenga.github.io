import { useCallback, useEffect, useRef, useState } from 'react'
import './HeroSpecialComets.css'

function rnd(min, max) {
  return min + Math.random() * (max - min)
}

const DANCES = {
  cascade: { id: 'cascade', duration: 1400 },
  rave:    { id: 'rave',    duration: 3800 },
  sync:    { id: 'sync',    duration: 1300 },
  wave:    { id: 'wave',    duration: 5500 },
}

const DANCE_KEYS = Object.keys(DANCES)

const VARIANTS = {
  ember: {
    core:  '#ffb060',
    glow:  'rgba(255, 110, 10, 0.85)',
    bloom: 'rgba(255, 50,   0, 0.4)',
    dance: 'cascade',
  },
  rave: {
    core:  '#cc55ff',
    glow:  'rgba(150, 20, 255, 0.85)',
    bloom: 'rgba(255, 0,  200, 0.4)',
    dance: 'rave',
  },
  silver: {
    core:  '#ddeeff',
    glow:  'rgba(180, 220, 255, 0.85)',
    bloom: 'rgba(140, 200, 255, 0.4)',
    dance: 'sync',
  },
  tide: {
    core:  '#30ddff',
    glow:  'rgba(0, 155, 255, 0.85)',
    bloom: 'rgba(0,  80,  210, 0.4)',
    dance: 'wave',
  },
  nova: {
    core:  '#ff3d8f',
    glow:  'rgba(255, 195, 0, 0.85)',
    bloom: 'rgba(255,  80, 0, 0.4)',
    dance: null, // random
  },
}

// nova is rarest (~1 in 13)
const VARIANT_POOL = [
  'ember', 'ember', 'ember',
  'rave',  'rave',  'rave',
  'silver','silver','silver',
  'tide',  'tide',  'tide',
  'nova',
]

function spawnComet(w, h) {
  // Any edge — top / left / right (never bottom)
  const edge = Math.random() < 0.5 ? 'top' : Math.random() < 0.5 ? 'left' : 'right'
  const speed = rnd(85, 145)
  let x, y

  if (edge === 'top') {
    x = rnd(w * 0.15, w * 0.85)
    y = -70
  } else if (edge === 'left') {
    x = -70
    y = rnd(h * 0.08, h * 0.65)
  } else {
    x = w + 70
    y = rnd(h * 0.08, h * 0.65)
  }

  // Aim loosely toward the center area; repulsion will curve it around the letters
  const tx  = rnd(w * 0.22, w * 0.78)
  const ty  = rnd(h * 0.22, h * 0.75)
  const dx  = tx - x
  const dy  = ty - y
  const len = Math.hypot(dx, dy) || 1

  return {
    id:        `sc-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    variant:   VARIANT_POOL[Math.floor(Math.random() * VARIANT_POOL.length)],
    x, y,
    vx:        (dx / len) * speed,
    vy:        (dy / len) * speed,
    travelDeg: Math.atan2(dy, dx) * (180 / Math.PI),
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Individual comet
// ─────────────────────────────────────────────────────────────────────────────

function SpecialComet({ data, containerRef, onDone, onTrigger }) {
  const elRef      = useRef(null)
  const pos        = useRef({ x: data.x, y: data.y, vx: data.vx, vy: data.vy })
  const phaseRef   = useRef('cruising')   // cruising | hovering | exiting | exploding
  const hoverSecs  = useRef(0)
  const rafRef     = useRef(null)

  const [phase,     setPhase]     = useState('cruising')
  const [particles, setParticles] = useState([])

  const cfg = VARIANTS[data.variant]

  // ── animation loop ──────────────────────────────────────────────────────────
  useEffect(() => {
    let last = performance.now()

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const p  = pos.current
      const ph = phaseRef.current

      if (ph === 'cruising' || ph === 'hovering' || ph === 'exiting') {
        p.x += p.vx * dt
        p.y += p.vy * dt

        if (elRef.current) {
          elRef.current.style.transform = `translate(${p.x}px, ${p.y}px)`
        }
      }

      // cruising → hovering once well inside the hero (not right at the edges)
      if (ph === 'cruising') {
        const cw = containerRef.current?.offsetWidth  || window.innerWidth
        const ch = containerRef.current?.offsetHeight || window.innerHeight
        if (p.x > cw * 0.28 && p.x < cw * 0.72 && p.y > ch * 0.20 && p.y < ch * 0.80) {
          phaseRef.current = 'hovering'
          setPhase('hovering')
          p.vx *= 0.28
          p.vy *= 0.28
        }
      }

      // hovering → exit if not clicked after ~5.5 s
      if (ph === 'hovering') {
        hoverSecs.current += dt
        if (hoverSecs.current > 5.5) {
          phaseRef.current = 'exiting'
          setPhase('exiting')
          p.vx *= 3.8
          p.vy *= 3.8
        }
      }

      // remove once fully off-screen
      if (ph === 'exiting' || ph === 'cruising') {
        const cw = containerRef.current?.offsetWidth  || window.innerWidth
        const ch = containerRef.current?.offsetHeight || window.innerHeight
        if (p.x < -250 || p.x > cw + 250 || p.y < -250 || p.y > ch + 250) {
          onDone(data.id)
          return
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [containerRef, data.id, onDone])

  // ── click → explosion ───────────────────────────────────────────────────────
  const handleClick = useCallback(() => {
    if (phaseRef.current === 'exploding' || phaseRef.current === 'exiting') return
    phaseRef.current = 'exploding'
    setPhase('exploding')
    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    // Burst particles
    setParticles(
      Array.from({ length: 14 }, (_, i) => {
        const angle = (i / 14) * Math.PI * 2 + rnd(-0.28, 0.28)
        const dist  = rnd(38, 90)
        return {
          id:    i,
          tx:    Math.cos(angle) * dist,
          ty:    Math.sin(angle) * dist,
          size:  rnd(3, 7),
          delay: rnd(0, 80),
        }
      })
    )

    // Fire the dance
    const danceKey = cfg.dance ?? DANCE_KEYS[Math.floor(Math.random() * DANCE_KEYS.length)]
    const { id: danceId, duration } = DANCES[danceKey]
    onTrigger(danceId, duration)

    setTimeout(() => onDone(data.id), 750)
  }, [cfg.dance, data.id, onDone, onTrigger])

  return (
    <div
      ref={elRef}
      className={`hsc-comet hsc-comet--${data.variant} hsc-comet--${phase}`}
      style={{
        transform:       `translate(${data.x}px, ${data.y}px)`,
        '--color-core':  cfg.core,
        '--color-glow':  cfg.glow,
        '--color-bloom': cfg.bloom,
        '--travel-deg':  `${data.travelDeg}deg`,
      }}
      onClick={handleClick}
    >
      {/* Tail — rotated to trail behind the head */}
      <div className="hsc-tail-wrap">
        <div className="hsc-tail-bloom" />
        <div className="hsc-tail-core"  />
      </div>

      {/* Head */}
      <div className="hsc-head" />

      {/* Explicit hit area — the comet div is 0×0 so without this nothing is clickable */}
      <div className="hsc-hit-area" />

      {/* Hover pulse ring */}
      <div className="hsc-ring" />


      {/* Explosion particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="hsc-particle"
          style={{
            '--p-tx':    `${p.tx}px`,
            '--p-ty':    `${p.ty}px`,
            '--p-size':  `${p.size}px`,
            '--p-delay': `${p.delay}ms`,
          }}
        />
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Spawn manager
// ─────────────────────────────────────────────────────────────────────────────

export default function HeroSpecialComets({ containerRef, onTrigger }) {
  const [comets, setComets] = useState([])
  const respawnTimerRef = useRef(null)

  const spawnOne = useCallback(() => {
    const cw = containerRef.current?.offsetWidth  || window.innerWidth
    const ch = containerRef.current?.offsetHeight || window.innerHeight
    setComets([spawnComet(cw, ch)])
  }, [containerRef])

  // First comet on mount
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setTimeout(spawnOne, 3000)
    return () => clearTimeout(t)
  }, [spawnOne])

  const handleDone = useCallback((id) => {
    setComets(prev => prev.filter(c => c.id !== id))
    // Respawn 3 s after any comet exits or explodes
    clearTimeout(respawnTimerRef.current)
    respawnTimerRef.current = setTimeout(spawnOne, 3000)
  }, [spawnOne])

  return (
    <div className="hsc-layer" aria-hidden="true">
      {comets.map(c => (
        <SpecialComet
          key={c.id}
          data={c}
          containerRef={containerRef}
          onDone={handleDone}
          onTrigger={onTrigger}
        />
      ))}
    </div>
  )
}
