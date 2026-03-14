import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './AboutSection.css'
import { portfolioProjects, portfolioSkills } from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: `${portfolioProjects.length}+`, label: 'Projects shipped' },
  { value: 'MSc', label: 'CS with AI focus' },
  { value: '3', label: 'Client platforms live' },
]

export default function AboutSection() {
  const sectionRef = useRef()
  const labelRef   = useRef()
  const dividerRef = useRef()
  const headingRef = useRef()
  const textRef    = useRef()
  const statsRef   = useRef()
  const skillsRef  = useRef()

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

      gsap.from(Array.from(statsRef.current.children), {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.85,
        ease: 'expo.out',
        scrollTrigger: { trigger: statsRef.current, start: 'top 85%' },
      })

      gsap.from(Array.from(skillsRef.current.children), {
        opacity: 0,
        scale: 0.85,
        stagger: 0.035,
        duration: 0.6,
        ease: 'expo.out',
        scrollTrigger: { trigger: skillsRef.current, start: 'top 88%' },
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
          <h2 className="about-heading" ref={headingRef}>
            Building things<br />
            <span className="about-heading-accent">that matter.</span>
          </h2>

          <div className="about-text" ref={textRef}>
            <p className="about-greeting">
              Hi there <span aria-hidden="true">👋</span>
            </p>
            <p>
              My name is <strong>Fausto Genga</strong>.
            </p>
            <p className="about-location">
              I&apos;m from{' '}
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
            <p>
              I&apos;m an Informatics Engineering graduate passionate about data,
              AI, and full-stack development. I especially enjoy building
              intuitive and engaging front-end experiences with React.
              Currently doing a master&apos;s in Computer Science with a
              specialization in AI.
            </p>
            <p>
              I&apos;m driven by curiosity, creativity, and a love for solving
              problems through technology. With strong communication skills,
              adaptability, and a collaborative mindset, I thrive in
              team-oriented, innovative environments. My multicultural
              background helps me bring fresh perspectives to every project.
            </p>
          </div>
        </div>

        <div className="about-stats" ref={statsRef}>
          {stats.map(({ value, label }) => (
            <div className="about-stat" key={label}>
              <div className="about-stat-value">{value}</div>
              <div className="about-stat-label">{label}</div>
            </div>
          ))}
        </div>

        <div className="about-skills">
          <p className="about-skills-title">Tech stack</p>
          <div className="about-skills-grid" ref={skillsRef}>
            {portfolioSkills.map((s) => (
              <span key={s} className="about-skill-tag">{s}</span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
