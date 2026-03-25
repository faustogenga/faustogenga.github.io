import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faDownload, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Parallax } from 'react-scroll-parallax'
import F3DGlyph, { A3DGlyph } from './F3DGlyph'
import './HeroSection.css'

export default function HeroSection() {
  const heroRef   = useRef()
  const badgeRef  = useRef()
  const monogramRef = useRef()
  const bottomRef = useRef()
  const scrollRef = useRef()
  const yearRef   = useRef()

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
      <div className="hero-inner">

        {/* Top row */}
        <div className="hero-top">
          <div className="hero-badge" ref={badgeRef}>
            <span className="hero-badge-dot" />
            Contact me for collaborations
          </div>
          <span className="hero-year" ref={yearRef}>
            {new Date().getFullYear()}
          </span>
        </div>

        {/* Name */}
        <div className="hero-name-block">
          <h1 className="hero-name hero-name-single" aria-label="Fausto Genga">
            <span className="hero-name-row">
              <Parallax speed={-8} className="hero-monogram-parallax">
                <span className="hero-monogram" ref={monogramRef}>
                  <F3DGlyph className="hero-f-glyph" />
                  <A3DGlyph className="hero-f-glyph hero-a-glyph" />
                </span>
              </Parallax>
              <span className="hero-last-name">Genga</span>
            </span>
          </h1>
        </div>

        {/* Bottom bar */}
        <div className="hero-bottom" ref={bottomRef}>
          <div className="hero-role">
            <span className="hero-role-kicker">Current focus</span>
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
