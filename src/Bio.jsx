import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

export const Bio = () => {
    return (
      <div className='ResponsiveBio col-6' style={{ fontFamily: 'RedHatDisplay-Medium', color: '#343434', textAlign: "justify" }}>
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