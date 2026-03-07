import './styles/Fonts.css'
import './styles/globals.css'

import { useLenis } from './hooks/useLenis'
import CustomCursor    from './components/CustomCursor'
import NoiseOverlay    from './components/NoiseOverlay'
import HeroSection     from './components/HeroSection'
import MarqueeStrip    from './components/MarqueeStrip'
import AboutSection    from './components/AboutSection'
import ProjectsSection from './components/ProjectsSection'

const Home = () => {
  useLenis()

  return (
    <>
      <CustomCursor />
      <NoiseOverlay />

      <main>
        <HeroSection />
        <MarqueeStrip />
        <AboutSection />
        <ProjectsSection />

        <footer className="site-footer">
          <div className="section-container">
            <div className="footer-inner">
              <p className="footer-copy">© {new Date().getFullYear()} Fausto Genga</p>
              <p className="footer-tagline">Informatics Engineer · Fullstack Developer</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}

export default Home
