import { Canvas } from '@react-three/fiber';
import { Text3D } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faDesktop, faFutbol } from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';
import SplitTextJS from 'split-text-js';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import './Fonts.css';



const Text = () => {
  const [rotation, setRotation] = useState([0, 0, 0]);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const mouseX = (clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(clientY / window.innerHeight) * 2 + 1;

    const newRotation = [0 - (0.2 * mouseY), 0 + (0.1 * mouseX), 0];

    setRotation(newRotation);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <Text3D
        position={[-1.7, -0.3, 0]}
        rotation={rotation}
        letterSpacing={0}
        size={0.35}
        font={"/Inter_Bold (1).json"}
      >
        Fausto Genga
        <meshBasicMaterial
        color='#343434'
        // eslint-disable-next-line react/no-unknown-property
        wireframe={true}
        
        />
      </Text3D>

    </>
  );
};

const Bio = () => {
  return (
    <div className='col-6' style={{ fontFamily: 'RedHatDisplay-Medium', color: '#343434', textAlign: "justify" }}>
      <h5>Hi there 👋</h5>
      <br />
      My name is Fausto Genga, a recent graduate in Informatics Engineering, where I refined my skills in effective communication, adaptability, and collaboration.
      During my internship at Procter and Gamble, I showcased my expertise by developing dynamic Power BI solutions, contributing to enhanced data-driven decision-making.
      I am passionate about leveraging technology and teamwork to tackle challenges in innovative environments. Ready to bring my skills and enthusiasm to new opportunities.
      <br />
      <br />
      ✨ What sets me apart is not just technical proficiency but also a deep-seated commitment to fostering effective teamwork and organization.
      Excited to contribute to the success of a forward-thinking organization through creativity, adaptability, and a collaborative approach.
      Enriched by a multicultural background and perspective, I bring a unique blend of skills and experiences to drive positive outcomes.
      <div style={{ fontFamily: 'RedHatDisplay-Regular', color: '#343434' }}>
        <div className='mt-3'>
          <FontAwesomeIcon className='link-dark' icon={faGithub} style={{ marginRight: '8px' }}  />
          <a href='https://github.com/faustogenga' className='link-dark' target='_blank'>https://github.com/faustogenga</a>
        </div>
        <div className='mt-3'>
          <FontAwesomeIcon className='link-dark' icon={faLinkedin} style={{ marginRight: '8px' }} /> <a className='link-dark' href='https://www.linkedin.com/in/fausto-genga-695b68251/'>linkedin.com/in/fausto genga</a>
        </div>
        <div className='mt-3'>✉️ faustogengaalfaro@gmail.com </div>
      </div>
    </div >
  )
}

const Projects = () => {

  return (
    <div className='d-flex flex-column align-items-center'>
      {/*Project 1*/}
      <div className='col-10 d-flex justify-content-center'>
        <div className='w-100 text-center'>
          <div className='py-5 px-4'>
            <Slider autoplay={3000} >
              <img src="/public/1.jpg" style={{ borderRadius: "10px" }} alt="Project Image 1" />
              <img src="/public/4.jpg" style={{ borderRadius: "10px" }} alt="Project Image 4" />
              <img src="/public/2.jpg" style={{ borderRadius: "10px" }} alt="Project Image 2" />
              <img src="/public/3.jpg" style={{ borderRadius: "10px" }} alt="Project Image 3" />
            </Slider>
          </div>
        </div>
        <div className='w-100 text-center py-5 px-4' style={{ fontFamily: 'RedHatDisplay-Regular', color: '#343434' }}>
          <div style={{ fontSize: "4vh", fontFamily: 'RedHatDisplay-Medium', color: '#343434' }}>
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

      {/* Project 2*/}
      <div className='col-10 d-flex justify-content-center'>
        <div className='w-100 text-center py-5 px-4' style={{ fontFamily: 'RedHatDisplay-Regular', color: '#343434' }}>
          <div style={{ fontSize: "4vh", fontFamily: 'RedHatDisplay-Medium', color: '#343434' }}>
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
        <div className='w-100 text-center'>
          <div className='py-5 px-4'>
            <Slider autoplay={4000} >
              <img src="/public/11.jpg" style={{ borderRadius: "10px" }} alt="Project Image 1" />
              <img src="/public/22.jpg" style={{ borderRadius: "10px" }} alt="Project Image 2" />
              <img src="/public/33.jpg" style={{ borderRadius: "10px" }} alt="Project Image 3" />
              <img src="/public/44.jpg" style={{ borderRadius: "10px" }} alt="Project Image 4" />
            </Slider>
          </div>
        </div>
      </div>
      {/*Project 3*/}
      <div className='col-10 d-flex justify-content-center'>
        <div className='w-100 text-center'>
          <div className='py-5 px-4'>
            <Slider autoplay={3000} >
              <img src="/public/222.jpg" style={{ borderRadius: "10px" }} alt="Project Image 2" />
              <img src="/public/111.jpg" style={{ borderRadius: "10px" }} alt="Project Image 1" />
            </Slider>
          </div>
        </div>
        <div className='w-100 text-center py-5 px-4' style={{ fontFamily: 'RedHatDisplay-Regular', color: '#343434' }}>
          <div style={{ fontSize: "4vh", fontFamily: 'RedHatDisplay-Medium', color: '#343434' }}>
            College Registration WEB API
          </div>
          <div>
            <div className='m-2'>
              <FontAwesomeIcon icon={faGithub} style={{ marginRight: '8px' }} />
              <a href='https://github.com/faustogenga/WebAPIMatricula_1C2023' className='link-info' target='_blank'>https://github.com/faustogenga/WebAPIMatricula_1C2023</a>
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

const Home = () => {

  useEffect(() => {

    const titles = gsap.utils.toArray('h4');
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

    titles.forEach((title) => {

      const splitText = new SplitTextJS(title);

      tl.from(
        splitText.chars, {
        opacity: 0,
        y: 20,
        rotateX: -80,
        stagger: 0.05,
        duration: 1,
      },
        "<"
      ).to(
        splitText.chars, {
        opacity: 0,
        y: -20,
        rotateX: 80,
        stagger: 0.05,
        duration: 1,
      },
        ">"
      );
    });
  }, []);




  return (
    <div style={{ backgroundColor: "#FAFAFA" }}>
      <div style={{ backgroundColor: "#8398FC", height: "1vh" }} className='' />
      <div className='align-content-center'>
        <Canvas orthographic camera={{ position: [0, 0, 100], zoom: 100 }} style={{ height: "15vh" }}>
          <Text />
        </Canvas>
      </div>
      <div className='d-flex justify-content-center' style={{ fontFamily: 'RedHatDisplay-Regular', color: '#343434' }}>
        <div className='col-3 text-center' style={{ borderTop: "0.1px solid black" }}>
          <div className='text-wrapper m-4'>
            <h4 className="m-0" style={{ fontFamily: 'RedHatDisplay-Bold', color: '#343434', cursor: 'default', lineHeight: 0 }}>PORTFOLIO</h4>
            <h4 className="m-0" style={{ fontFamily: 'RedHatDisplay-Bold', color: '#343434', cursor: 'default', lineHeight: 0 }}>PROJECTS</h4>
            <h4 className="m-0" style={{ fontFamily: 'RedHatDisplay-Bold', color: '#343434', cursor: 'default', lineHeight: 0 }}>RESUME</h4>
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-center text-justify'>
        <Bio />
      </div>
      <div className="d-flex justify-content-center mt-4">
        <p style={{ fontFamily: "RedHatDisplay-Regular", borderBottom: "2px solid", borderColor: "#8398FC" }} className='p-1'>Some College Projects 👇</p>
      </div>
      <Projects />
      <div className='text-center p-4 bg-black' style={{ color: "whitesmoke", fontFamily: "RedHatDisplay-Bold" }}>
        <FontAwesomeIcon icon={faGithub} style={{ marginRight: '8px' }} />
        <a href='https://github.com/faustogenga' className='link-light' target='_blank'>Find more Projects on my Github</a>
      </div>
    </div>
  );
};

export default Home;
