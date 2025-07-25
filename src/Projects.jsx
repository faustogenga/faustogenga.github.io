import Slider from 'react-animated-slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDesktop, faFutbol, faComments, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';



export const Projects = () => {
  return (
    <div className='d-flex flex-column align-items-center'>
      {/*Project 1*/}
      <div className='ResponsiveProjects col-10 d-flex justify-content-center'>
        <div className='ProjectSlides w-75 text-center'>
          <div className='py-5 px-4'>
            <Slider autoplay={3000} className="slider">
              <img src="2020.jpg" alt="Project Image 1" loading="lazy" />
              <img src="1010.jpg" alt="Project Image 2" loading="lazy" />
            </Slider>
          </div>
        </div>
        <div className='ProjectInfo w-100 text-center py-5 px-4' style={{ fontFamily: 'RedHatDisplay-Regular', color: '#f5f5f5' }}>
          <div className='ProjectTitle' style={{ fontFamily: 'RedHatDisplay-Medium' }}>
            AI PDF Inquire Fullstack
            <FontAwesomeIcon className='mx-1' icon={faComments} style={{ fontSize: "20px" }} />
          </div>
          
          <div className="project-tech-stack mb-3">
            <span className="skill-badge">React</span>
            <span className="skill-badge">FastAPI</span>
            <span className="skill-badge">LLamaIndex</span>
            <span className="skill-badge">AI</span>
            <span className="skill-badge">RAG</span>
          </div>
          
          <div className='mb-3'>
            <a href='https://aipdfinquire.netlify.app/' className="project-link" target='_blank'>
              <FontAwesomeIcon icon={faExternalLinkAlt} style={{ marginRight: '8px' }} />
              Live Demo
            </a>
            <a href='https://github.com/faustogenga/AI-PDFInquire' className='project-link github-link' target='_blank'>
              <FontAwesomeIcon icon={faGithub} style={{ marginRight: '8px' }} />
              GitHub
            </a>
          </div>
          
          <div className='mx-3' style={{ textAlign: 'justify' }}>
            Developed the AI PDF Inquire Fullstack application, integrating a React frontend with a FastAPI backend to enable AI-driven PDF querying.
            Leveraged LLamaIndex for Retrieval-Augmented Generation (RAG) and natural language processing, allowing users to upload PDFs and interact with the content through AI.
            The project features a user-friendly chat interface and robust error handling.
            <br /> <br />
            Hosted the frontend on Netlify and the backend on Koyeb, demonstrating expertise in full-stack development, RESTful APIs, and AI integration.
            <br /> <br />
            This project was made for an AI Planet Assignment, not related to company or real world application.
            All resources are used for learning purposes.
          </div>
        </div>
      </div>

      {/*Project 2*/}
      <div className='ResponsiveProjects col-10 d-flex justify-content-center'>
        <div className='ProjectSlides w-75 text-center'>
          <div className='py-5 px-4'>
            <Slider autoplay={3000} className="slider">
              <img src="1.jpg" alt="Project Image 1" loading="lazy" />
              <img src="4.jpg" alt="Project Image 4" loading="lazy" />
              <img src="2.jpg" alt="Project Image 2" loading="lazy" />
              <img src="3.jpg" alt="Project Image 3" loading="lazy" />
            </Slider>
          </div>
        </div>
        <div className='ProjectInfo w-100 text-center py-5 px-4' style={{ fontFamily: 'RedHatDisplay-Regular', color: '#f5f5f5' }}>
          <div className='ProjectTitle' style={{ fontFamily: 'RedHatDisplay-Medium' }}>
            FutStore CR
            <FontAwesomeIcon className='mx-1' icon={faFutbol} style={{ fontSize: "20px" }} />
          </div>
          
          <div className="project-tech-stack mb-3">
            <span className="skill-badge">React</span>
            <span className="skill-badge">Firebase</span>
            <span className="skill-badge">Bootstrap</span>
            <span className="skill-badge">E-commerce</span>
          </div>
          
          <div className='mb-3'>
            <a href='https://crfutstore.web.app/' className="project-link" target='_blank'>
              <FontAwesomeIcon icon={faExternalLinkAlt} style={{ marginRight: '8px' }} />
              Live Demo
            </a>
            <a href='https://github.com/faustogenga/Fut-Store-CR' className='project-link github-link' target='_blank'>
              <FontAwesomeIcon icon={faGithub} style={{ marginRight: '8px' }} />
              GitHub
            </a>
          </div>
          
          <div className='mx-3' style={{ textAlign: 'justify' }}>
            Developed a college web design project with React and Firebase, presenting a prototype inspired by a fictional soccer store.
            Showcased proficiency in frontend development and successful backend integration, emphasizing dynamic functionalities and a user-friendly interface.
            <br /> <br />
            This project was made for React Web Design College Class 3CO23-160361G1 DISEÑO WEB II, ULACIT.
            All resources are used for learning / school related purposes.
          </div>
        </div>
      </div>

      {/* Project 3*/}
      <div className='ResponsiveProjects col-10 d-flex justify-content-center'>
        <div className='ProjectInfo w-100 text-center py-5 px-4' style={{ fontFamily: 'RedHatDisplay-Regular', color: '#f5f5f5' }}>
          <div className='ProjectTitle' style={{ fontFamily: 'RedHatDisplay-Medium' }}>
            ULACIT Parking Service 🚗
          </div>
          
          <div className="project-tech-stack mb-3">
            <span className="skill-badge">HTML/CSS</span>
            <span className="skill-badge">JavaScript</span>
            <span className="skill-badge">PHP</span>
            <span className="skill-badge">SQL</span>
            <span className="skill-badge">Netlify</span>
          </div>
          
          <div className='mb-3'>
            <a href='https://ulacitparking.netlify.app/' className="project-link" target='_blank'>
              <FontAwesomeIcon icon={faExternalLinkAlt} style={{ marginRight: '8px' }} />
              Live Demo
            </a>
            <a href='https://github.com/faustogenga/ULACIT-Parking-Service' className='project-link github-link' target='_blank'>
              <FontAwesomeIcon icon={faGithub} style={{ marginRight: '8px' }} />
              GitHub
            </a>
          </div>
          
          <div className='mx-3' style={{ textAlign: 'justify' }}>
            Designed a Parking Reservation Website prototype for college using JavaScript, HTML, CSS, PHP, and SQL Server.
            Hosted on Netlify for visualization, the project allows users to reserve parking spots, highlighting my proficiency in full-stack development and creating a practical and user-friendly solution.
            <br /> <br />
            Front-End hosted in Netlify with the reservation form connected to Netlify forms just as a visual test / prototype. Project provides all php and sql files in order to run with a local database, as intended.
            <br /> <br />
            This project was made for the Web Application Development class 16-5003, ULACIT.
            All resources are used for learning / school related purposes.
          </div>
        </div>
        <div className='ProjectSlides w-75 text-center'>
          <div className='py-5 px-4'>
            <Slider autoplay={4000} className="slider">
              <img src="11.jpg" alt="Project Image 1" loading="lazy" />
              <img src="22.jpg" alt="Project Image 2" loading="lazy" />
              <img src="33.jpg" alt="Project Image 3" loading="lazy" />
              <img src="44.jpg" alt="Project Image 4" loading="lazy" />
            </Slider>
          </div>
        </div>
      </div>


      {/*Project 4*/}
      <div className='ResponsiveProjects col-10 d-flex justify-content-center'>
        <div className='ProjectSlides w-75 text-center'>
          <div className='py-5 px-4'>
            <Slider autoplay={3000} className="slider">
              <img src="222.jpg" alt="Project Image 2" loading="lazy" />
              <img src="111.jpg" alt="Project Image 1" loading="lazy" />
            </Slider>
          </div>
        </div>
        <div className='ProjectInfo w-100 text-center py-5 px-4' style={{ fontFamily: 'RedHatDisplay-Regular', color: '#f5f5f5' }}>
          <div className='ProjectTitle' style={{ fontFamily: 'RedHatDisplay-Medium' }}>
            College Registration WEB API
          </div>
          
          <div className="project-tech-stack mb-3">
            <span className="skill-badge">ASP.NET</span>
            <span className="skill-badge">C#</span>
            <span className="skill-badge">SQL Server</span>
            <span className="skill-badge">Entity Framework</span>
            <span className="skill-badge">Swagger</span>
          </div>
          
          <div className='mb-3'>
            <a href='https://github.com/faustogenga/WebAPIMatricula_1C2023' className='project-link github-link' target='_blank'>
              <FontAwesomeIcon icon={faGithub} style={{ marginRight: '8px' }} />
              GitHub
            </a>
          </div>
          
          <div className='mx-3' style={{ textAlign: 'justify' }}>
            Collaboratively Developed an ASP.NET API with DTO/DAL/BLL components and authentication for our SQL Server database. The API, designed as a College Registration API, managed entities like Student, Course, Error, Professor, Residence, and Vehicle Registration.
            Thoroughly tested and seamlessly integrated with a UI, demonstrating expertise in backend development and database management.
            <br /> <br />
            This project was made for Web Service College Class, ULACIT.
            All resources are used for learning / school related purposes.
            <br /> <br />
            Rest API with Swagger UI,
            Developed with ASP.NET Core, Entity Framework, SQL Server, and Swagger.
            UI developed with JS, Bootstrap template in order to efficiently request and modify our data.
            Xamarin Mobile App connected to this API can be also found in Github.
          </div>
        </div>
      </div>
    </div>
  )
}