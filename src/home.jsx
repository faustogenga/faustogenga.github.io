import { Canvas } from '@react-three/fiber';
import { useEffect } from 'react';
import gsap from 'gsap';
import SplitTextJS from 'split-text-js';
import 'react-animated-slider/build/horizontal.css';
import './Fonts.css';
import './Responsive.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { Text } from './Text';
import { Bio } from './Bio';
import { Projects } from './Projects';

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
          <Text/>
        </Canvas>
      </div>
      <div className='d-flex justify-content-center' style={{ fontFamily: 'RedHatDisplay-Regular', color: '#343434' }}>
        <div className='ResponsiveSubHeading col-3 text-center' style={{ borderTop: "0.1px solid black" }}>
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
