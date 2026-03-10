import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faDownload, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import ImageAlphabetText from './ImageAlphabetText'
import F3DGlyph from './F3DGlyph'
import './HeroSection.css'

export default function HeroSection() {
  const heroRef   = useRef()
  const badgeRef  = useRef()
  const row1Ref   = useRef()
  const row2Ref   = useRef()
  const bottomRef = useRef()
  const scrollRef = useRef()
  const yearRef   = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars1 = row1Ref.current?.querySelectorAll('.image-alphabet-glyph')
      const chars2 = row2Ref.current?.querySelectorAll('.image-alphabet-glyph')

      gsap.set(bottomRef.current, { opacity: 0, y: 24 })
      gsap.set(scrollRef.current, { opacity: 0 })

      const tl = gsap.timeline({ delay: 0.15 })

      tl.from(badgeRef.current, {
          opacity: 0, y: -18, duration: 0.7, ease: 'expo.out',
        })
        .from(yearRef.current, {
          opacity: 0, duration: 0.6, ease: 'expo.out',
        }, '<0.1')
        .from(chars1, {
          y: '115%',
          opacity: 0,
          stagger: 0.038,
          duration: 1.1,
          ease: 'expo.out',
        }, '-=0.3')
        .from(chars2, {
          y: '115%',
          opacity: 0,
          stagger: 0.038,
          duration: 1.1,
          ease: 'expo.out',
        }, '-=0.9')
        .to(bottomRef.current, {
          opacity: 1, y: 0, duration: 0.9, ease: 'expo.out',
        }, '-=0.6')
        .to(scrollRef.current, {
          opacity: 1, duration: 0.7, ease: 'expo.out',
        }, '-=0.4')
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-inner">

        {/* Top row */}
        <div className="hero-top">
          <div className="hero-badge" ref={badgeRef}>
            <span className="hero-badge-dot" />
            Available for opportunities
          </div>
          <span className="hero-year" ref={yearRef}>
            {new Date().getFullYear()}
          </span>
        </div>

        {/* Name */}
        <div className="hero-name-block">
          <h1 className="hero-name" aria-label="Fausto Genga">
            <span className="hero-name-row">
              <span className="hero-name-row-inner hero-name-image-row" ref={row1Ref}>
                <F3DGlyph />
                <F3DGlyph />
                <ImageAlphabetText text="austo" styles={['style-3']} />
              </span>
            </span>
            <span className="hero-name-row hero-name-second">
              <span className="hero-name-row-inner hero-name-image-row" ref={row2Ref}>
                <ImageAlphabetText text="Genga" styles={['style-3']} />
              </span>
            </span>
          </h1>
        </div>

        {/* Bottom bar */}
        <div className="hero-bottom" ref={bottomRef}>
          <div className="hero-role">
            <span className="hero-role-item">Informatics Engineer</span>
            <span className="hero-role-item">Fullstack Developer</span>
            <span className="hero-role-item">AI · Data Enthusiast</span>
          </div>

          <nav className="hero-links" aria-label="Contact links">
            <a
              href="https://github.com/faustogenga"
              target="_blank"
              rel="noreferrer"
              className="hero-link-btn"
            >
              <FontAwesomeIcon icon={faGithub} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/fausto-genga-695b68251/"
              target="_blank"
              rel="noreferrer"
              className="hero-link-btn"
            >
              <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
            </a>
            <a
              href="mailto:faustogengaalfaro@gmail.com"
              className="hero-link-btn"
            >
              <FontAwesomeIcon icon={faEnvelope} /> Email
            </a>
            <a
              href="/Fausto_Genga_Resume.pdf"
              download
              className="hero-link-btn accent"
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
