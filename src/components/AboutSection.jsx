import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './AboutSection.css'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '5+',  label: 'Projects built' },
  { value: 'MSc', label: 'CS with AI focus' },
  { value: '2',   label: 'Languages spoken' },
]

const skills = [
  'React', 'JavaScript', 'TypeScript', 'Python', 'SQL',
  'Node.js', 'MongoDB', 'FastAPI', 'PyTorch', 'C#',
  'ASP.NET', 'Firebase', 'Power BI', 'Git',
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
            <p>
              I&apos;m Fausto Genga — an Informatics Engineering graduate with
              a passion for data, AI, and full-stack development. I love building
              intuitive, engaging experiences with React.
            </p>
            <p>
              Currently pursuing a Master&apos;s in Computer Science with a
              specialization in AI. Driven by curiosity, creativity, and a love
              for solving problems through technology.
            </p>
            <p>
              My multicultural background gives me fresh perspectives and helps
              me thrive in team-oriented, innovative environments.
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
            {skills.map((s) => (
              <span key={s} className="about-skill-tag">{s}</span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
