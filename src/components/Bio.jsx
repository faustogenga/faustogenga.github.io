export const Bio = () => {
  const skills = [
    "React", "JavaScript", "HTML/CSS", "Power BI", 
    "Data Analysis", "SQL", "APIs",
    "MongoDB", "Node", "Python", "Jupyter", "PyTorch"
  ];

  return (
    <div className="cool-bio-card" style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "RedHatDisplay-Regular", sans-serif', 
      color: '#1a1a1a', 
      maxWidth: '900px',
      borderRadius: '24px',
      background: 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(131, 152, 252, 0.08) inset',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: 0,
      animation: 'fadeInUp 0.8s ease 0.4s forwards',
      overflow: 'hidden'
    }}>
      {/* Main content section */}
      <div className="bio-content-section" style={{
        padding: '40px 40px 30px 40px'
      }}>
        <div className="bio-greeting" style={{
          marginBottom: '24px',
          paddingBottom: '20px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
        }}>
          <p style={{ 
            margin: '0', 
            fontSize: '1.2rem',
            fontWeight: '500',
            color: '#1a1a1a'
          }}>Hi there 👋</p>
        </div>
        
        <div className="bio-text-section" style={{
          marginBottom: '30px'
        }}>
          <p style={{ 
            margin: '0 0 18px 0',
            lineHeight: '1.8',
            fontSize: '1rem',
            color: '#4a5568'
          }}>
            I&apos;m Fausto Genga, an Informatics Engineering graduate passionate about data, AI, and full-stack development. I especially enjoy building intuitive and engaging front-end experiences with React. Currently doing a master&apos;s in Computer Science with a specialization in AI.
          </p>
          <p style={{ 
            margin: '0',
            lineHeight: '1.8',
            fontSize: '1rem',
            color: '#4a5568'
          }}>
            I&apos;m driven by curiosity, creativity, and a love for solving problems through technology. With strong communication skills, adaptability, and a collaborative mindset, I thrive in team-oriented, innovative environments. My multicultural background helps me bring fresh perspectives to every project.
          </p>
        </div>
      </div>

      {/* Skills section at bottom */}
      <div className="bio-skills-section" style={{
        padding: '30px 40px 40px 40px',
        background: 'linear-gradient(180deg, rgba(131, 152, 252, 0.03), rgba(108, 127, 227, 0.03))',
        borderTop: '1px solid rgba(0, 0, 0, 0.06)'
      }}>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '0.7rem'
        }}>
          {skills.map((skill, index) => (
            <span 
              key={index} 
              className="cool-pill-grid"
              style={{
                display: 'block',
                padding: '0.5rem 0.9rem',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, rgba(131, 152, 252, 0.1), rgba(108, 127, 227, 0.1))',
                border: '1px solid rgba(131, 152, 252, 0.2)',
                color: '#4a5568',
                fontSize: '0.85rem',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "RedHatDisplay-Medium", sans-serif',
                fontWeight: '500',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
                textAlign: 'center',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(131, 152, 252, 0.18), rgba(108, 127, 227, 0.18))';
                e.currentTarget.style.borderColor = 'rgba(131, 152, 252, 0.35)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(131, 152, 252, 0.2)';
                e.currentTarget.style.color = '#8398FC';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(131, 152, 252, 0.1), rgba(108, 127, 227, 0.1))';
                e.currentTarget.style.borderColor = 'rgba(131, 152, 252, 0.2)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.color = '#4a5568';
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
