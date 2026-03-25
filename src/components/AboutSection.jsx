import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Parallax } from 'react-scroll-parallax'
import './AboutSection.css'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef()
  const labelRef   = useRef()
  const dividerRef = useRef()
  const headingRef = useRef()
  const textRef    = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = (trigger, from, extra = {}) =>
        gsap.from(trigger, {
          ...from,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger, start: 'top 88%' },
          ...extra,
        })

      st(labelRef.current,   { opacity: 0, y: 20 })
      st(dividerRef.current, { scaleX: 0, transformOrigin: 'left center' })
      st(headingRef.current, { opacity: 0, y: 50 })

      gsap.from(Array.from(textRef.current.children), {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: { trigger: textRef.current, start: 'top 85%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="about-section" ref={sectionRef}>
      <div className="section-container">

        <span className="section-label" ref={labelRef}>About</span>
        <div className="section-divider" ref={dividerRef} style={{ marginBottom: 0 }} />

        <div className="about-grid">
          <div className="about-heading-block" ref={headingRef}>
            <Parallax speed={-4} className="about-heading-parallax">
              <h2 className="about-heading">
                Building things<br />
                <span className="about-heading-accent">that matter.</span>
              </h2>
              <p className="about-heading-note">
                I care about products that feel clear, useful, and quietly memorable.
              </p>
            </Parallax>
          </div>

          <div className="about-text" ref={textRef}>
            <div className="about-meta-pills">
              <span className="about-meta-pill about-meta-pill-greeting">
                <span className="about-meta-pill-emoji" aria-hidden="true">👋</span>
                <span>Hi there</span>
              </span>
            </div>
            <p className="about-lead">
              Product-minded engineer focused on thoughtful interfaces, useful systems, and clean execution.
            </p>
            <p className="about-body about-location">
              I&apos;m originally from{' '}
              <span className="about-country">
                <span className="about-country-flag" aria-hidden="true">🇨🇷</span>
                Costa Rica
              </span>{' '}
              &{' '}
              <span className="about-country">
                <span className="about-country-flag" aria-hidden="true">🇦🇷</span>
                Argentina
              </span>, currently living in{' '}
              <span className="about-country">
                <span className="about-country-flag" aria-hidden="true">🇧🇪</span>
                Belgium
              </span>.
            </p>
            <p className="about-body">
              I&apos;m an Informatics Engineering graduate working across data, AI, and full-stack development,
              with a strong preference for intuitive front-end experiences built with React. I&apos;m currently
              pursuing a master&apos;s in Computer Science with a specialization in AI.
            </p>
            <p className="about-body">
              I&apos;m driven by curiosity, adaptability, and a love for solving practical problems through
              technology. A multicultural background and collaborative mindset help me bring fresh
              perspective to every project.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
