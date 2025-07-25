import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

export const Bio = () => {
  // Define your skills
  const skills = [
    "React", "JavaScript", "HTML/CSS", "Power BI", 
    "Data Analysis", "ASP.NET", "SQL", "API Development"
  ];

  return (
    <div className='ResponsiveBio col-8' style={{ fontFamily: 'RedHatDisplay-Medium', color: '#f5f5f5', textAlign: "justify" }}>
      <div className="bio-header">
        <h2 style={{ fontFamily: 'RedHatDisplay-Bold', marginBottom: '1rem', color: '#f5f5f5' }}>About Me</h2>
      </div>
      
      <div className="bio-content">
        <p className="bio-greeting">Hi there 👋</p>
        <p>
          My name is Fausto Genga, and I&apos;m excited to share a bit about myself. Recently graduated in Informatics Engineering, 
          I had the opportunity to refine my skills in effective communication, adaptability, and collaboration.
        </p>
        <p>
          One of the standout experiences of my journey was my internship at Procter and Gamble. There, I immersed myself in 
          developing dynamic Power BI solutions, contributing to smarter, data-driven decision-making.
        </p>
        
        <p>
          <span className="highlight-text">✨ For me, it&apos;s the perfect blend of technology and teamwork that truly sparks my passion.</span> Collaborating with 
          like-minded individuals to tackle challenges head-on is where I thrive.
          It&apos;s not just about being technically proficient; it&apos;s about cultivating a culture of collaboration and 
          organization that fuels achievement.
        </p>
        
        <p>
          As I take the next steps in my career, I&apos;m eager to bring my skills and enthusiasm to new opportunities. 
          Whether it&apos;s contributing to innovative projects or problem-solving with a team, I&apos;m ready to explore 
          how I can make a meaningful impact.
          With my multicultural background enriching my perspective, I&apos;m excited to see where this journey leads and 
          how I can contribute positively along the way.
        </p>
      </div>
      
      {/* Skills section */}
      <div className="skills-section mt-4 mb-3">
        <h3 style={{ fontFamily: 'RedHatDisplay-Bold', color: '#f5f5f5' }}>Skills</h3>
        <div className="skills-container">
          {skills.map((skill, index) => (
            <span key={index} className="skill-badge">{skill}</span>
          ))}
        </div>
      </div>
      
      <div className="bio-contact" style={{ fontFamily: 'RedHatDisplay-Regular', color: '#f5f5f5' }}>
        <div className='ResponsiveBioLinks mt-4 d-flex'>
          <div className='contact-item mt-1 mx-1'>
            <FontAwesomeIcon className='link-dark' icon={faGithub} style={{ marginRight: '8px' }} />
            <a href='https://github.com/faustogenga' className='link-dark' target='_blank'>github.com/faustogenga</a>
          </div>
          <div className='contact-item mt-1 mx-1'>
            <FontAwesomeIcon className='link-dark' icon={faLinkedin} style={{ marginRight: '8px' }} />
            <a className='link-dark' href='https://www.linkedin.com/in/fausto-genga-695b68251/'>linkedin.com/in/fausto-genga</a>
          </div>
          <div className='contact-item link-dark mt-1 mx-1'>✉️ faustogengaalfaro@gmail.com </div>
        </div>
      </div>
    </div>
  )
}