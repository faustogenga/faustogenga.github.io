import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faFutbol, faExternalLinkAlt, faServer, faBrain } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const projects = [
  {
    title: 'Animal Image Classification Challenge',
    icon: faBrain,
    cover: 'animal-classification.png',
    summary:
      'Image classification pipeline for 12 animal classes using deep learning (PyTorch CNNs with transfer learning) and traditional ML (VBoW + Scikit-Learn with feature extraction).',
    tags: ['Python', 'PyTorch', 'Scikit-Learn', 'OpenCV', 'Jupyter', 'Machine Learning', 'Deep Learning'],
    github: 'https://github.com/faustogenga/VUB-Machine-Learning-project-Animal-Classification',
    note: 'Complete ML workflow with data analysis, preprocessing, Log Loss evaluation, error analysis, and hyperparameter tuning.'
  },
  {
    title: 'AI PDF Inquire',
    icon: faComments,
    cover: 'ai-pdf-inquire.jpg',
    summary:
      'Full-stack PDF assistant that lets users chat with documents. React frontend, FastAPI backend, and LLamaIndex for RAG make answers grounded in the uploaded files.',
    tags: ['React', 'FastAPI', 'LLamaIndex', 'AI', 'RAG'],
    github: 'https://github.com/faustogenga/AI-PDFInquire',
    note: 'Built as an AI Planet assignment; frontend hosted on Netlify, backend on Koyeb.'
  },
  {
    title: 'FutStore CR',
    icon: faFutbol,
    cover: 'futstore-cr.jpg',
    summary:
      'E-commerce prototype for a soccer store built with React and Firebase. Focused on clean product flows, cart interactions, and reliable data sync for a class project.',
    tags: ['React', 'Firebase', 'Bootstrap', 'E-commerce'],
    live: 'https://crfutstore.web.app/',
    github: 'https://github.com/faustogenga/Fut-Store-CR',
    note: 'College web design project exploring modern store UX.'
  },
  {
    title: 'ULACIT Parking Service',
    icon: faExternalLinkAlt,
    cover: 'ulacit-parking.jpg',
    summary:
      'Reservation prototype where students book parking spots. Mixes HTML/CSS/JS with PHP and SQL Server to manage bookings and validations.',
    tags: ['JavaScript', 'PHP', 'SQL', 'Netlify'],
    live: 'https://ulacitparking.netlify.app/',
    github: 'https://github.com/faustogenga/ULACIT-Parking-Service',
    note: 'Front-end demo hosted on Netlify; full stack runs locally with provided PHP and SQL files.'
  },
  {
    title: 'College Registration API',
    icon: faServer,
    cover: 'college-registration-api.jpg',
    summary:
      'ASP.NET Core API with DTO/DAL/BLL layers, authentication, and Swagger UI. Manages students, courses, and supporting entities with Entity Framework and SQL Server.',
    tags: ['ASP.NET', 'C#', 'SQL Server', 'Entity Framework', 'Swagger'],
    github: 'https://github.com/faustogenga/WebAPIMatricula_1C2023',
    note: 'Collaborative build; paired with a JS UI and Xamarin mobile app that consume the API.'
  }
];

export const Projects = () => {
  return (
    <div className="project-grid">
      {projects.map((project) => (
        <article className="project-card" key={project.title}>
          <div className="project-media">
            <img src={`/${project.cover}`} alt={`${project.title} preview`} loading="lazy" />
            <div className="project-icon">
              <FontAwesomeIcon icon={project.icon} />
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
                  Live demo
                </a>
              )}
              <a href={project.github} target="_blank" rel="noreferrer" className="btn tiny ghost">
                <FontAwesomeIcon icon={faGithub} /> GitHub
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};
