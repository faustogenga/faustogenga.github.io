import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

export const Bio = () => {
  return (
    <div className='ResponsiveBio col-6' style={{ fontFamily: 'RedHatDisplay-Medium', color: '#343434', textAlign: "justify" }}>
      <h5>Hi there 👋</h5>
      My name is Fausto Genga, and I&apos;m excited to share a bit about myself. Recently graduated in Informatics Engineering, I had the opportunity to refine my skills in effective communication, adaptability, and collaboration.
      One of the standout experiences of my journey was my internship at Procter and Gamble. There, I immersed myself in developing dynamic Power BI solutions, contributing to smarter, data-driven decision-making.
      <br />
      <br />
      ✨ For me, it&apos;s the perfect blend of technology and teamwork that truly sparks my passion. Collaborating with like-minded individuals to tackle challenges head-on is where I thrive.
      It&apos;s not just about being technically proficient; it&apos;s about cultivating a culture of collaboration and organization that fuels achievement.
      <br />
      <br />
      As I take the next steps in my career, I&apos;m eager to bring my skills and enthusiasm to new opportunities. Whether it&apos;s contributing to innovative projects or problem-solving with a team, I&apos;m ready to explore how I can make a meaningful impact.
      With my multicultural background enriching my perspective, I&apos;m excited to see where this journey leads and how I can contribute positively along the way.
      <div style={{ fontFamily: 'RedHatDisplay-Regular', color: '#343434' }}>
        <div className='ResponsiveBioLinks mt-3 d-flex'>
          <div className='mt-1 mx-1'>
            <FontAwesomeIcon className='link-dark' icon={faGithub} style={{ marginRight: '8px' }} />
            <a href='https://github.com/faustogenga' className='link-dark' target='_blank'>https://github.com/faustogenga</a>
          </div>
          <div className='mt-1 mx-1'>
            <FontAwesomeIcon className='link-dark' icon={faLinkedin} style={{ marginRight: '8px' }} />
            <a className='link-dark' href='https://www.linkedin.com/in/fausto-genga-695b68251/'>linkedin.com/in/fausto genga</a>
          </div>
          <div className='link-dark mt-1 mx-1'>✉️ faustogengaalfaro@gmail.com </div>
        </div>
      </div>
    </div >
  )
}