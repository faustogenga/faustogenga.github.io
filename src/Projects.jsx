import Slider from 'react-animated-slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDesktop, faFutbol, faComments } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';



export const Projects = () => {
  return (
    <div className='d-flex flex-column align-items-center'>
      {/*Project 1*/}
      <div className='ResponsiveProjects col-10 d-flex justify-content-center'>
        <div className='ProjectSlides w-100 text-center'>
          <div className='py-5 px-4'>
            <Slider autoplay={3000} >
              <img src="1010.jpg" style={{ borderRadius: "10px" }} alt="Project Image 1" />
              <img src="2020.jpg" style={{ borderRadius: "10px" }} alt="Project Image 4" />
            </Slider>
          </div>
        </div>
        <div className='ProjectInfo w-100 text-center py-5 px-4' style={{ fontFamily: 'RedHatDisplay-Regular', color: '#343434' }}>
          <div className='ProjectTitle' style={{ fontSize: "4vh", fontFamily: 'RedHatDisplay-Medium', color: '#343434' }}>
            AI PDF Inquire Fullstack
            <FontAwesomeIcon className='mx-1' icon={faComments} style={{ fontSize: "20px" }} />
          </div>
          <div className='m-2'>
            <FontAwesomeIcon icon={faDesktop} style={{ marginRight: '8px' }} />
            <a href='https://aipdfinquire.netlify.app/' className="link-info" target='_blank'>https://aipdfinquire.netlify.app/</a>
          </div>
          <div>
            <div className='m-2'>
              <FontAwesomeIcon icon={faGithub} style={{ marginRight: '8px' }} /> <a className='link-dark' />
              <a href='https://github.com/faustogenga/AI-PDFInquire' className='link-info' target='_blank'>https://github.com/faustogenga/AI-PDFInquire</a>
            </div>
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
        <div className='ProjectSlides w-100 text-center'>
          <div className='py-5 px-4'>
            <Slider autoplay={3000} >
              <img src="1.jpg" style={{ borderRadius: "10px" }} alt="Project Image 1" />
              <img src="4.jpg" style={{ borderRadius: "10px" }} alt="Project Image 4" />
              <img src="2.jpg" style={{ borderRadius: "10px" }} alt="Project Image 2" />
              <img src="3.jpg" style={{ borderRadius: "10px" }} alt="Project Image 3" />
            </Slider>
          </div>
        </div>
        <div className='ProjectInfo w-100 text-center py-5 px-4' style={{ fontFamily: 'RedHatDisplay-Regular', color: '#343434' }}>
          <div className='ProjectTitle' style={{ fontSize: "4vh", fontFamily: 'RedHatDisplay-Medium', color: '#343434' }}>
            FutStore CR
            <FontAwesomeIcon className='mx-1' icon={faFutbol} style={{ fontSize: "20px" }} />
          </div>
          <div className='m-2'>
            <FontAwesomeIcon icon={faDesktop} style={{ marginRight: '8px' }} />
            <a href='https://crfutstore.web.app/' className="link-info" target='_blank'>https://crfutstore.web.app/</a>
          </div>
          <div>
            <div className='m-2'>
              <FontAwesomeIcon icon={faGithub} style={{ marginRight: '8px' }} /> <a className='link-dark' />
              <a href='https://github.com/faustogenga/Fut-Store-CR' className='link-info' target='_blank'>https://github.com/faustogenga/Fut-Store-CR</a>
            </div>
          </div>
          Ecommerce Website Prototype - React Project // Currently Hosted in Firebase. <br /><br />
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
        <div className='ProjectInfo w-100 text-center py-5 px-4' style={{ fontFamily: 'RedHatDisplay-Regular', color: '#343434' }}>
          <div className='ProjectTitle' style={{ fontSize: "4vh", fontFamily: 'RedHatDisplay-Medium', color: '#343434' }}>
            ULACIT Parking Service 🚗
          </div>
          <div className='m-2'>
            <FontAwesomeIcon icon={faDesktop} style={{ marginRight: '8px' }} />
            <a href='https://ulacitparking.netlify.app/' className='link-info' target='_blank'>https://ulacitparking.netlify.app/</a>
          </div>
          <div>
            <div className='m-2'>
              <FontAwesomeIcon icon={faGithub} style={{ marginRight: '8px' }} /> <a className='link-dark' />
              <a href='https://github.com/faustogenga/ULACIT-Parking-Service' className='link-info' target='_blank'>https://github.com/faustogenga/ULACIT-Parking-Service</a>
            </div>
          </div>
          Parking Reservation Website Prototype - HTML/JS/CSS/PHP/SQL - Netlify <br /><br />
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
        <div className='ProjectSlides w-100 text-center'>
          <div className='py-5 px-4'>
            <Slider autoplay={4000} >
              <img src="11.jpg" style={{ borderRadius: "10px" }} alt="Project Image 1" />
              <img src="22.jpg" style={{ borderRadius: "10px" }} alt="Project Image 2" />
              <img src="33.jpg" style={{ borderRadius: "10px" }} alt="Project Image 3" />
              <img src="44.jpg" style={{ borderRadius: "10px" }} alt="Project Image 4" />
            </Slider>
          </div>
        </div>
      </div>


      {/*Project 4*/}
      <div className='ResponsiveProjects col-10 d-flex justify-content-center'>
        <div className='ProjectSlides w-100 text-center'>
          <div className='py-5 px-4'>
            <Slider autoplay={3000} >
              <img src="222.jpg" style={{ borderRadius: "10px" }} alt="Project Image 2" />
              <img src="111.jpg" style={{ borderRadius: "10px" }} alt="Project Image 1" />
            </Slider>
          </div>
        </div>
        <div className='ProjectInfo w-100 text-center py-5 px-4' style={{ fontFamily: 'RedHatDisplay-Regular', color: '#343434' }}>
          <div className='ProjectTitle' style={{ fontSize: "4vh", fontFamily: 'RedHatDisplay-Medium', color: '#343434' }}>
            College Registration WEB API
          </div>
          <div>
            <div className='m-2' style={{ overflow: 'auto' }}>
              <FontAwesomeIcon icon={faGithub} style={{ marginRight: '8px' }} />
              <a href='https://github.com/faustogenga/WebAPIMatricula_1C2023' className='link-info overflow-auto' target='_blank'>https://github.com/faustogenga/WebAPIMatricula_1C2023</a>
            </div>
          </div>
          Web Service API on ASP.NET Prototype <br /><br />
          <div className='mx-3' style={{ textAlign: 'justify' }}>
            Collaboratively Developed an ASP.NET API with DTO/DAL/BLL components and authentication for our SQL Server database. The API, designed as a College Registration API, managed entities like Student, Course, Error, Professor, Residence, and Vehicle Registration.
            Thoroughly tested and seamlessly integrated with a UI, demonstrating expertise in backend development and database management.
            <br /> <br />
            This project was made for Web Service College Class , ULACIT.
            All resources are used for learning / school related purposes.
            <br /> <br />
            Rest API with Swagger UI,
            Developed with ASP.NET Core, Entity Framework, SQL Server, and Swagger.
            UI developed with JS, Bootstrap template in order to efficiently request and modify our data
            Xamarin Mobile App conected to this API can be also found in Github.
          </div>
        </div>
      </div>
    </div >
  )
}