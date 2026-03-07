import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import './ProjectsSection.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    num: '01',
    title: 'Animal Image Classification',
    year: '2024',
    tags: ['Python', 'PyTorch', 'ML'],
    cover: '/animal-classification.png',
    github: 'https://github.com/faustogenga/VUB-Machine-Learning-project-Animal-Classification',
  },
  {
    num: '02',
    title: 'AI PDF Inquire',
    year: '2024',
    tags: ['React', 'FastAPI', 'RAG'],
    cover: '/ai-pdf-inquire.jpg',
    github: 'https://github.com/faustogenga/AI-PDFInquire',
  },
  {
    num: '03',
    title: 'FutStore CR',
    year: '2023',
    tags: ['React', 'Firebase'],
    cover: '/futstore-cr.jpg',
    github: 'https://github.com/faustogenga/Fut-Store-CR',
    live: 'https://crfutstore.web.app/',
  },
  {
    num: '04',
    title: 'ULACIT Parking Service',
    year: '2023',
    tags: ['JavaScript', 'PHP', 'SQL'],
    cover: '/ulacit-parking.jpg',
    github: 'https://github.com/faustogenga/ULACIT-Parking-Service',
    live: 'https://ulacitparking.netlify.app/',
  },
  {
    num: '05',
    title: 'College Registration API',
    year: '2022',
    tags: ['ASP.NET', 'C#', 'SQL'],
    cover: '/college-registration-api.jpg',
    github: 'https://github.com/faustogenga/WebAPIMatricula_1C2023',
  },
]

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
      <a
        href={project.live || project.github}
        target="_blank"
        rel="noreferrer"
        className="project-row-link"
      >
        <div className="project-row-inner">
          <span className="project-row-num">{project.num}</span>
          <h3 className="project-row-title">{project.title}</h3>
          <div className="project-row-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="project-row-tag">{tag}</span>
            ))}
          </div>
          <span className="project-row-year">{project.year}</span>
          <div className="project-row-actions">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="project-action-btn"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${project.title} live demo`}
              >
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="project-action-btn"
              onClick={(e) => e.stopPropagation()}
              aria-label={`${project.title} GitHub`}
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </div>
      </a>

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
          {projects.map((project, i) => (
            <ProjectRow key={project.num} project={project} index={i} />
          ))}
        </div>

        <div className="projects-footer" ref={footerRef}>
          <span className="projects-footer-text">More on GitHub</span>
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
