import './styles/Fonts.css';
import './styles/Responsive.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import { Bio } from './components/Bio';
import { Projects } from './components/Projects';

const Home = () => {

  return (
    <div className="elegant-background" style={{ 
      minHeight: '100vh',
      position: 'relative'
    }}>
      {/* Floating particles */}
      <div className="floating-particles">
        {[...Array(18)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${12 + Math.random() * 8}s`
          }} />
        ))}
      </div>
      
      {/* Elegant gradient header bar */}
      <div className="cool-header-bar" style={{ 
        background: "linear-gradient(90deg, #8398FC, #6C7FE3, #8398FC, #6C7FE3, #8398FC)", 
        height: "4px",
        backgroundSize: "300% 100%",
        animation: "gradientMove 3s ease infinite",
        boxShadow: '0 2px 12px rgba(131, 152, 252, 0.3), 0 0 20px rgba(131, 152, 252, 0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="header-glow" />
      </div>
      
      {/* Elegant hero section */}
      <div className='hero-section' style={{ 
        paddingTop: '60px', 
        paddingBottom: '30px',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="text-center">
          <h1 className="cool-name" style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "RedHatDisplay-Bold", sans-serif',
            fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
            margin: '0 0 8px 0',
            fontWeight: '700',
            letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #8398FC 0%, #6C7FE3 25%, #9d7fff 50%, #1a1a1a 75%, #8398FC 100%)',
            backgroundSize: '300% 300%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'gradientShift 5s ease infinite, nameGlow 3s ease-in-out infinite',
            filter: 'drop-shadow(0 2px 8px rgba(131, 152, 252, 0.2))',
            position: 'relative',
            cursor: 'default',
            display: 'inline-block'
          }}>
            Fausto Genga
            <span className="name-glow" />
          </h1>
          <p className="cool-subtitle" style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "RedHatDisplay-Regular", sans-serif',
            color: '#6b7280',
            fontSize: '0.95rem',
            margin: '0 0 20px 0',
            letterSpacing: '0.5px',
            fontWeight: '400',
            opacity: 0,
            animation: 'fadeInUp 0.8s ease 0.2s forwards'
          }}>
            Informatics Engineer · Fullstack Developer · Data Enthusiast
          </p>
          
          {/* Contact links under name */}
          <div className="hero-contact-links" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            marginTop: '20px',
            opacity: 0,
            animation: 'fadeInUp 0.8s ease 0.4s forwards'
          }}>
            <a href='https://github.com/faustogenga' target='_blank' rel="noreferrer" className="hero-link" style={{ 
              color: '#4a5568', 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.9rem',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "RedHatDisplay-Medium", sans-serif',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              padding: '8px 16px',
              borderRadius: '8px',
              position: 'relative',
              overflow: 'hidden'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.color = '#8398FC';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.background = 'rgba(131, 152, 252, 0.08)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.color = '#4a5568';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'transparent';
            }}>
              <FontAwesomeIcon icon={faGithub} /> GitHub
            </a>
            <a href='https://www.linkedin.com/in/fausto-genga-695b68251/' target='_blank' rel="noreferrer" className="hero-link" style={{ 
              color: '#4a5568', 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.9rem',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "RedHatDisplay-Medium", sans-serif',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              padding: '8px 16px',
              borderRadius: '8px',
              position: 'relative',
              overflow: 'hidden'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.color = '#8398FC';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.background = 'rgba(131, 152, 252, 0.08)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.color = '#4a5568';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'transparent';
            }}>
              <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
            </a>
            <a href='mailto:faustogengaalfaro@gmail.com' className="hero-link" style={{ 
              color: '#4a5568', 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.9rem',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "RedHatDisplay-Medium", sans-serif',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              padding: '8px 16px',
              borderRadius: '8px',
              position: 'relative',
              overflow: 'hidden'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.color = '#8398FC';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.background = 'rgba(131, 152, 252, 0.08)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.color = '#4a5568';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'transparent';
            }}>
              ✉️ Email
            </a>
            <a href='/Fausto_Genga_Resume.pdf' download className="hero-link" style={{ 
              color: '#4a5568', 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.9rem',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "RedHatDisplay-Medium", sans-serif',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              padding: '8px 16px',
              borderRadius: '8px',
              position: 'relative',
              overflow: 'hidden'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.color = '#8398FC';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.background = 'rgba(131, 152, 252, 0.08)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.color = '#4a5568';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'transparent';
            }}>
              <FontAwesomeIcon icon={faDownload} /> CV
            </a>
          </div>
        </div>
      </div>
      
      {/* Bio section */}
      <div className='d-flex justify-content-center' style={{ marginTop: '40px', marginBottom: '60px', position: 'relative', zIndex: 1 }}>
        <Bio />
      </div>
      
      {/* Projects section */}
      <div className="d-flex justify-content-center" style={{ marginTop: '50px', marginBottom: '30px', position: 'relative', zIndex: 1 }}>
        <h2 className="cool-section-title" style={{ 
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "RedHatDisplay-Bold", sans-serif', 
          color: '#1a1a1a', 
          fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', 
          margin: 0,
          fontWeight: '700',
          letterSpacing: '-0.02em',
          opacity: 0,
          animation: 'fadeInUp 0.8s ease 0.6s forwards'
        }}>Some Projects</h2>
      </div>
      <Projects />
      
      {/* Elegant footer */}
      <footer className='text-center' style={{
        padding: '40px 20px',
        marginTop: '80px',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        position: 'relative',
        zIndex: 1
      }}>
        <p style={{ 
          color: "#9ca3af", 
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "RedHatDisplay-Regular", sans-serif', 
          fontSize: "0.85rem", 
          margin: 0,
          letterSpacing: '0.3px'
        }}>
          © {new Date().getFullYear()} Fausto Genga
        </p>
      </footer>
      
    </div>
  );
};

export default Home;
