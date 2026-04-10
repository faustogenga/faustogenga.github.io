import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faDownload, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Parallax } from 'react-scroll-parallax'
import HeroCosmosCanvas from './HeroCosmosCanvas'
import { HeroGlyph } from './F3DGlyph'
import HeroWordmark from './HeroWordmark'
import { HERO_MATERIAL_MODES } from './Letter3DGlyph'
import './HeroSection.css'
import { HERO_GLYPH_STYLES } from '../data/heroGlyphStyles'

const HERO_WORD = [
  { id: 'F', letter: 'F', style: HERO_GLYPH_STYLES.lightBlue },
  { id: 'A', letter: 'A', style: HERO_GLYPH_STYLES.lightBlue, baseRotation: [0, -Math.PI / 2, 0], mirrored: false },
  { id: 'U', letter: 'U', style: HERO_GLYPH_STYLES.lightBlue },
  { id: 'S', letter: 'S', style: HERO_GLYPH_STYLES.lightBlue, mirrored: false },
  { id: 'T', letter: 'T', style: HERO_GLYPH_STYLES.lightBlue },
  { id: 'O', letter: 'O', style: HERO_GLYPH_STYLES.lightBlue },
]

const HERO_MATERIAL_OPTIONS = [
  { id: HERO_MATERIAL_MODES.textured, label: 'Texture', swatchClassName: 'texture' },
  { id: HERO_MATERIAL_MODES.platinum, label: 'Platinum', swatchClassName: 'platinum' },
  { id: HERO_MATERIAL_MODES.holographic, label: 'Holographic', swatchClassName: 'holographic' },
  { id: HERO_MATERIAL_MODES.liquidMetal, label: 'Liquid', swatchClassName: 'liquid-metal' },
]

export default function HeroSection() {
  const heroRef   = useRef()
  const badgeRef  = useRef()
  const monogramRef = useRef()
  const bottomRef = useRef()
  const scrollRef = useRef()
  const yearRef   = useRef()
  const [materialMode, setMaterialMode] = useState(HERO_MATERIAL_MODES.textured)
  const [letterModes, setLetterModes] = useState(() => HERO_WORD.map(() => HERO_MATERIAL_MODES.textured))
  const switchTimeoutsRef = useRef([])
  const [danceMode, setDanceMode] = useState(null)
  const danceTimerRef = useRef(null)

  const DANCE_MOVES = [
    { id: 'cascade', label: '↻', title: 'Cascade',  duration: 1400 },
    { id: 'rave',    label: '✶', title: 'Rave',      duration: 3800 },
    { id: 'sync',    label: '◎', title: 'Sync',      duration: 1300 },
    { id: 'wave',    label: '∿', title: 'Wave',      duration: 5500 },
  ]

  const MATERIAL_CYCLE = [
    HERO_MATERIAL_MODES.textured,
    HERO_MATERIAL_MODES.holographic,
    HERO_MATERIAL_MODES.platinum,
    HERO_MATERIAL_MODES.liquidMetal,
  ]

  const handleMaterialChange = (newMode, stagger = 75) => {
    if (newMode === materialMode) return
    setMaterialMode(newMode)
    switchTimeoutsRef.current.forEach(clearTimeout)
    switchTimeoutsRef.current = HERO_WORD.map((_, i) =>
      setTimeout(() => {
        setLetterModes(prev => {
          const next = [...prev]
          next[i] = newMode
          return next
        })
      }, i * stagger)
    )
  }

  const handleDance = (id, duration) => {
    // On each dance, cascade to the next material in the cycle
    const currentIdx = MATERIAL_CYCLE.indexOf(materialMode)
    const nextMaterial = MATERIAL_CYCLE[(currentIdx + 1) % MATERIAL_CYCLE.length]
    handleMaterialChange(nextMaterial, 220)

    setDanceMode(id)
    clearTimeout(danceTimerRef.current)
    danceTimerRef.current = setTimeout(() => setDanceMode(null), duration)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(monogramRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 20,
        rotate: -4,
        filter: 'blur(10px)',
        transformOrigin: '50% 50%',
      })
      gsap.set(bottomRef.current, { opacity: 0, y: 24 })
      gsap.set(scrollRef.current, { opacity: 0 })

      const tl = gsap.timeline({ delay: 0.15 })

      tl.from(badgeRef.current, {
          opacity: 0, y: -18, duration: 0.7, ease: 'expo.out',
        })
        .from(yearRef.current, {
          opacity: 0, duration: 0.6, ease: 'expo.out',
        }, '<0.1')
        .to(monogramRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          rotate: 0,
          filter: 'blur(0px)',
          duration: 1.35,
          ease: 'expo.out',
        }, '-=0.15')
        .to(bottomRef.current, {
          opacity: 1, y: 0, duration: 0.9, ease: 'expo.out',
        }, '-=0.6')
        .to(scrollRef.current, {
          opacity: 1, duration: 0.7, ease: 'expo.out',
        }, '-=0.4')

      gsap.to(monogramRef.current, {
        y: -3,
        scale: 1.008,
        duration: 3.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 1.35,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-cosmos" aria-hidden="true">
        <HeroCosmosCanvas heroRef={heroRef} attractorRef={monogramRef} />
      </div>

      <div className="hero-inner">

        {/* Top row */}
        <div className="hero-top">
          <div className="hero-top-badge-group" ref={badgeRef}>
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Contact me for collaborations
            </div>
            <div className="hero-dance-switcher" aria-label="Letter animations">
              {DANCE_MOVES.map(({ id, label, title, duration }) => (
                <button
                  key={id}
                  type="button"
                  className={`hero-dance-btn${danceMode === id ? ' active' : ''}`}
                  aria-label={title}
                  title={title}
                  onClick={() => handleDance(id, duration)}
                >
                  {label}
                </button>
              ))}
            </div>
          <div className="hero-material-switcher" aria-label="Hero letter materials">
              {HERO_MATERIAL_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`hero-material-toggle hero-material-toggle-${option.swatchClassName}${materialMode === option.id ? ' active' : ''}`}
                  aria-label={`Use ${option.label} letters`}
                  aria-pressed={materialMode === option.id}
                  title={option.label}
                  onClick={() => handleMaterialChange(option.id)}
                />
              ))}
            </div>
          </div>
          <span className="hero-year" ref={yearRef}>
            {new Date().getFullYear()}
          </span>
        </div>

        {/* Name */}
        <div className="hero-name-block">
          <div className="hero-name hero-name-single" aria-label="Fausto Genga">
            <div className="hero-name-row">
              <Parallax speed={-8} className="hero-monogram-parallax">
                <span className="hero-monogram" ref={monogramRef}>
                  {HERO_WORD.map(({ id, letter, style, baseRotation, mirrored }, i) => (
                    <HeroGlyph
                      key={id}
                      className={`hero-f-glyph hero-letter-${letter.toLowerCase()}`}
                      letter={letter}
                      style={style}
                      baseRotation={baseRotation}
                      mirrored={mirrored}
                      materialMode={letterModes[i]}
                      danceMode={danceMode}
                      letterIndex={i}
                    />
                  ))}
                </span>
              </Parallax>
            </div>
          </div>
        </div>

        <HeroWordmark />

        {/* Bottom bar */}
        <div className="hero-bottom" ref={bottomRef}>
          <div className="hero-role">
            <div className="hero-role-list">
              <span className="hero-role-item">Web App Development</span>
              <span className="hero-role-item">Informatics Engineer</span>
              <span className="hero-role-item">AI · Data Enthusiast</span>
            </div>
          </div>

          <nav className="hero-links" aria-label="Contact links">
            <a
              href="https://github.com/faustogenga"
              target="_blank"
              rel="noreferrer"
              className="hero-link-btn hero-link-btn-accent hero-link-btn-github"
            >
              <FontAwesomeIcon icon={faGithub} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/fausto-genga-695b68251/"
              target="_blank"
              rel="noreferrer"
              className="hero-link-btn hero-link-btn-accent hero-link-btn-linkedin"
            >
              <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
            </a>
            <a
              href="mailto:faustogengaalfaro@gmail.com"
              className="hero-link-btn hero-link-btn-accent hero-link-btn-email"
            >
              <FontAwesomeIcon icon={faEnvelope} /> Email
            </a>
            <a
              href="/Fausto_Genga_Resume.pdf"
              download
              className="hero-link-btn hero-link-btn-accent hero-link-btn-resume"
            >
              <FontAwesomeIcon icon={faDownload} /> Resume
            </a>
          </nav>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll" ref={scrollRef} aria-hidden="true">
        <span className="hero-scroll-label">Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  )
}
