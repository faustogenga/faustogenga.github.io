/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import './ProjectsSection.css'
import { portfolioProjects } from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

function ProjectRow({ project, index }) {
  const rowRef = useRef()
  const imgRef = useRef()

  useEffect(() => {
    gsap.from(rowRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.9,
      ease: 'expo.out',
      delay: index * 0.06,
      scrollTrigger: { trigger: rowRef.current, start: 'top 88%' },
    })

    gsap.set(imgRef.current, { opacity: 0, scale: 0.92 })
  }, [index])

  const onEnter = () => {
    gsap.to(imgRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: 'expo.out' })
  }

  const onLeave = () => {
    gsap.to(imgRef.current, { opacity: 0, scale: 0.92, duration: 0.35, ease: 'expo.out' })
  }

  return (
    <article
      ref={rowRef}
      className="project-row"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="project-row-inner">
        <span className="project-row-num">{project.num}</span>

        <div className="project-row-copy">
          <a
            href={project.live || project.github}
            target="_blank"
            rel="noreferrer"
            className="project-row-title-link"
          >
            <h3 className="project-row-title">{project.title}</h3>
          </a>
          <p className="project-row-summary">{project.summary}</p>
          <p className="project-row-note">{project.note}</p>
        </div>

        <div className="project-row-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-row-tag">{tag}</span>
          ))}
        </div>

        <span className="project-row-meta">{project.meta}</span>

        <div className="project-row-actions">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="project-action-btn"
              aria-label={`${project.title} live demo`}
            >
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="project-action-btn"
              aria-label={`${project.title} GitHub`}
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          )}
        </div>
      </div>

      {/* Hover image */}
      <div ref={imgRef} className="project-hover-img" aria-hidden="true">
        <img src={project.cover} alt="" />
      </div>
    </article>
  )
}

export default function ProjectsSection() {
  const sectionRef  = useRef()
  const labelRef    = useRef()
  const headingRef  = useRef()
  const footerRef   = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(labelRef.current, {
        opacity: 0, y: 20, duration: 0.8, ease: 'expo.out',
        scrollTrigger: { trigger: labelRef.current, start: 'top 88%' },
      })
      gsap.from(headingRef.current, {
        opacity: 0, y: 50, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 88%' },
      })
      gsap.from(footerRef.current, {
        opacity: 0, y: 30, duration: 0.8, ease: 'expo.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="projects-section" ref={sectionRef}>
      <div className="section-container">

        <div className="projects-header">
          <span className="section-label" ref={labelRef}>Work</span>
          <h2 className="projects-heading" ref={headingRef}>Selected projects</h2>
        </div>

        <div className="projects-list">
          {portfolioProjects.map((project, i) => (
            <ProjectRow key={project.num} project={project} index={i} />
          ))}
        </div>

        <div className="projects-footer" ref={footerRef}>
          <span className="projects-footer-text">More open-source work on GitHub</span>
          <a
            href="https://github.com/faustogenga"
            target="_blank"
            rel="noreferrer"
            className="projects-github-link"
          >
            <FontAwesomeIcon icon={faGithub} />
            faustogenga
          </a>
        </div>

      </div>
    </section>
  )
}
