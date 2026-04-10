import Letter3DGlyph, { preloadLetter3DGlyph } from './Letter3DGlyph'
import {
  HERO_GLYPH_STYLES,
  defaultHeroGlyphSelection,
  getHeroGlyphModelUrl,
  heroGlyphLibrary,
} from '../data/heroGlyphStyles'

export function HeroGlyph({
  className = '',
  letter,
  style = HERO_GLYPH_STYLES.lightBlue,
  baseRotation = [0, 0, 0],
  mirrored = true,
}) {
  const modelUrl = getHeroGlyphModelUrl(letter, style, { fallbackToAnyStyle: true })

  return (
    <Letter3DGlyph
      className={className}
      fallbackLetter={letter}
      modelUrl={modelUrl}
      baseRotation={baseRotation}
      mirrored={mirrored}
    />
  )
}

export default function F3DGlyph({ className = '' }) {
  return <HeroGlyph className={className} letter="F" style={defaultHeroGlyphSelection.F} />
}

export function A3DGlyph({ className = '' }) {
  return (
    <HeroGlyph
      className={className}
      letter="A"
      style={defaultHeroGlyphSelection.A}
      baseRotation={[0, -Math.PI / 2, 0]}
      mirrored={false}
    />
  )
}

export function U3DGlyph({ className = '' }) {
  return <HeroGlyph className={className} letter="U" style={defaultHeroGlyphSelection.U} />
}

Object.values(heroGlyphLibrary).forEach((styleGroup) => {
  Object.values(styleGroup.letters).forEach((modelUrl) => {
    preloadLetter3DGlyph(modelUrl)
  })
})
