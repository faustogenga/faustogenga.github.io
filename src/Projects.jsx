import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faFutbol, faExternalLinkAlt, faServer, faBrain, faGlobe, faStethoscope, faMotorcycle } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { portfolioProjects } from './data/portfolio';

const iconMap = {
  brain: faBrain,
  comments: faComments,
  futbol: faFutbol,
  external: faExternalLinkAlt,
  server: faServer,
  globe: faGlobe,
  stethoscope: faStethoscope,
  motorcycle: faMotorcycle,
};

export const Projects = () => {
  return (
    <div className="project-grid">
      {portfolioProjects.map((project) => (
        <article className="project-card" key={project.title}>
          <div className="project-media">
            <img src={project.cover} alt={`${project.title} preview`} loading="lazy" />
            <div className="project-icon">
              <FontAwesomeIcon icon={iconMap[project.iconKey]} />
            </div>
          </div>

          <div className="project-body">
            <div className="project-title">
              <h3>{project.title}</h3>
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer" aria-label={`${project.title} live demo`} style={{ 
                  color: '#6b7280', 
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  display: 'flex',
                  alignItems: 'center'
                }} onMouseEnter={(e) => e.currentTarget.style.color = '#8398FC'} onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}>
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </a>
              )}
            </div>
            <p className="muted">{project.summary}</p>
            {project.note && <p className="project-note">{project.note}</p>}

            <div className="pill-row">
              {project.tags.map((tag) => (
                <span className="pill" key={tag}>{tag}</span>
              ))}
            </div>

            <div className="project-links">
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer" className="btn tiny">
                  Visit site
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className="btn tiny ghost">
                  <FontAwesomeIcon icon={faGithub} /> GitHub
                </a>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};
