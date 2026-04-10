/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Parallax } from 'react-scroll-parallax'
import {
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import './ProjectsSection.css'
import { portfolioProjects } from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

function ProjectActions({ project, compact = false }) {
  return (
    <div className={`project-card-actions${compact ? ' compact' : ''}`}>
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer"
          className="project-action-link primary"
        >
          View live <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </a>
      )}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="project-action-link"
        >
          <FontAwesomeIcon icon={faGithub} /> GitHub
        </a>
      )}
    </div>
  )
}

function FeaturedProject({ project, index = 0 }) {
  const featureRef = useRef()
  const tintVariants = [
    { glow: '150 208 255', accent: '108 196 255' },
    { glow: '124 197 255', accent: '85 168 255' },
    { glow: '116 226 255', accent: '84 194 255' },
    { glow: '171 201 255', accent: '124 168 255' },
  ]
  const tint = tintVariants[index % tintVariants.length]
  const imageSpeed = index % 2 === 0 ? -3 : 3

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(featureRef.current, {
        opacity: 0,
        y: 56,
        duration: 1.1,
        ease: 'expo.out',
        delay: index * 0.05,
        scrollTrigger: { trigger: featureRef.current, start: 'top 86%' },
      })
    }, featureRef)
    return () => ctx.revert()
  }, [index])

  return (
    <article
      ref={featureRef}
      className="featured-project"
      style={{
        '--project-glow': tint.glow,
        '--project-accent': tint.accent,
      }}
    >
      <div className="featured-project-copy">
        <div className="featured-project-kicker">
          <span className="featured-project-label">Now building</span>
          <span className="featured-project-number">{project.num}</span>
        </div>

        <h3 className="featured-project-title">{project.title}</h3>
        <p className="featured-project-summary">{project.summary}</p>
        <p className="featured-project-note">{project.note}</p>

        <div className="featured-project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="featured-project-tag">{tag}</span>
          ))}
        </div>

        <ProjectActions project={project} />
      </div>

      <Parallax speed={imageSpeed}className='featured-project-shot-parallax'>
        <div className="featured-project-shot">
          <img src={project.cover} alt={`${project.title} showcase`} loading="lazy" />
        </div>
      </Parallax>
    </article>
  )
}

export default function ProjectsSection() {
  const sectionRef = useRef()
  const labelRef = useRef()
  const headingRef = useRef()
  const introRef = useRef()
  const footerRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([labelRef.current, headingRef.current, introRef.current], {
        opacity: 0,
        y: 34,
        duration: 0.95,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
      })

      gsap.from(footerRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="projects-section" ref={sectionRef}>
      <div className="section-container">
        <div className="projects-header">
          <div className="projects-heading-block">
            <span className="section-label" ref={labelRef}>Work</span>
            <h2 className="projects-heading" ref={headingRef}>
              Selected projects
              <span className="projects-heading-accent"> made for real people and real use.</span>
            </h2>
          </div>

          <p className="projects-intro" ref={introRef}>
            A mix of product work, client builds, and personal projects that show how I approach design,
            development, and practical problem-solving.
          </p>
        </div>

        <div className="projects-stack">
          {portfolioProjects.map((project, index) => (
            <FeaturedProject key={project.num} project={project} index={index} />
          ))}
        </div>

        <div className="projects-footer" ref={footerRef}>
          <span className="projects-footer-text">More experiments, prototypes, and code in the full repository stream.</span>
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
