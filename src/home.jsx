import { Canvas } from '@react-three/fiber';
import { useEffect } from 'react';
import gsap from 'gsap';
import SplitTextJS from 'split-text-js';
import 'react-animated-slider/build/horizontal.css';
import './Fonts.css';
import './Responsive.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

import { Text } from './Text';
import { Bio } from './Bio';
import { Projects } from './Projects';

const Home = () => {

  useEffect(() => {
    // Clear any existing animations first
    gsap.killTweensOf('h4 .char');
    
    const titles = gsap.utils.toArray('h4');
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

    titles.forEach((title) => {
      // Make sure the title is visible before splitting
      gsap.set(title, { opacity: 1 });
      
      try {
        const splitText = new SplitTextJS(title);
        
        tl.fromTo(
          splitText.chars, 
          {
            opacity: 0,
            y: 20,
            rotateX: -80,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.03,
            duration: 0.8,
            ease: "power2.out"
          },
          "+=0.3"
        ).to(
          splitText.chars, 
          {
            opacity: 0,
            y: -20,
            rotateX: 80,
            stagger: 0.03,
            duration: 0.8,
            ease: "power2.in"
          },
          "+=1"
        );
      } catch (error) {
        console.error("Error with SplitTextJS:", error);
      }
    });
    
    return () => {
      gsap.killTweensOf('h4 .char');
    };
  }, []);

  return (
    <div style={{ backgroundColor: "#FAFAFA" }}>
      {/* Modern gradient header bar with animation */}
      <div style={{ 
        background: "linear-gradient(90deg, #8398FC, #6C7FE3, #8398FC)", 
        height: "0.5vh",
        backgroundSize: "200% 100%",
        animation: "gradientMove 3s ease infinite"
      }} className='' />
      
      {/* Hero section with precisely controlled spacing */}
      <div className='hero-section position-relative'>
        {/* Decorative floating shapes for extra flair */}
        <div className="floating-shapes" />
        {/* 3D Text */}
        <Canvas 
          orthographic 
          camera={{ position: [0, 0, 100], zoom: 100 }} 
          style={{ 
            height: "35vh", 
            marginBottom: '-30px' // No margin after canvas
          }}
        >
          <Text/>
        </Canvas>
        
        {/* Background pattern */}
        <div className="animated-bg-pattern"></div>
        
        {/* Tagline with precise spacing */}
        <div className="text-center" style={{ marginBottom: '30px' }}>
          <p className="tagline" style={{
            fontFamily: 'RedHatDisplay-Medium',
            color: '#f5f5f5',
            padding: '0',
            margin: '0',
            fontWeight: '600',
            letterSpacing: '1.5px'
          }}>
            INFORMATICS ENGINEER | FRONTEND DEVELOPER | DATA ENTHUSIAST
          </p>
        </div>
      </div>
      
      {/* Section divider - with ONLY ONE border line */}
      <div className='d-flex justify-content-center' style={{ 
        fontFamily: 'RedHatDisplay-Regular',
        color: '#f5f5f5',
        marginBottom: '30px'
      }}>
        {/* This div has the ONLY border */}
        <div className='ResponsiveSubHeading col-3 text-center' style={{ 
          borderTop: "2px solid #8398FC",
          position: "relative" 
        }}>
          <div className='text-wrapper m-2'>
            <h4 style={{ 
              fontFamily: 'RedHatDisplay-Bold', 
              color: '#f5f5f5',
              cursor: 'default',
              opacity: 1, // Ensure it's always visible
              transform: 'none' // Remove any transform that might be applied
            }}>PORTFOLIO</h4>
          </div>
        </div>
      </div>
      
      {/* Bio section with controlled spacing */}
      <div className='d-flex justify-content-center text-justify' style={{ marginTop: '0px' }}>
        <Bio />
      </div>
      
      {/* Projects section with better heading */}
      <div className="d-flex justify-content-center mt-5 mb-4">
        <div className="section-heading">
          <h2 style={{ fontFamily: "RedHatDisplay-Bold", color: "#f5f5f5" }}>Featured Projects</h2>
          <div className="heading-underline"></div>
        </div>
      </div>
      <Projects />
      
      {/* Improved footer */}
      <footer className='p-4 text-center' style={{
        background: "linear-gradient(135deg, #2c2c2c, #000)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Add cool background pattern to footer */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          opacity: 0.2,
          zIndex: 0
        }}></div>
        
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="row">
            <div className="col-12 mb-3">
              <p style={{ color: "whitesmoke", fontFamily: "RedHatDisplay-Medium", fontSize: "1.2rem" }}>Let's connect!</p>
            </div>
            <div className="col-12 social-links">
              <a href='https://github.com/faustogenga' className='btn btn-outline-light mx-2' target='_blank'>
                <FontAwesomeIcon icon={faGithub} /> GitHub
              </a>
              <a href='https://www.linkedin.com/in/fausto-genga-695b68251/' className='btn btn-outline-light mx-2' target='_blank'>
                <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
              </a>
              <a href='mailto:faustogengaalfaro@gmail.com' className='btn btn-outline-light mx-2'>
                ✉️ Email
              </a>
            </div>
            <div className="col-12 mt-3">
              <p style={{ color: "#aaa", fontFamily: "RedHatDisplay-Regular", fontSize: "0.9rem" }}>
                © {new Date().getFullYear()} Fausto Genga. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Add a "back to top" button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #8398FC, #6C7FE3)",
          color: "white",
          border: "none",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          zIndex: 1000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
          cursor: "pointer",
          transition: "all 0.3s ease"
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 8px 15px rgba(0,0,0,0.3)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
        }}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  );
};

export default Home;
