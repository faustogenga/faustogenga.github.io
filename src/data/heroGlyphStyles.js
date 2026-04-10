import lightBlueAModelUrl from '../assets/hero-glyphs/light-blue/A_3D.glb?url'
import lightBlueFModelUrl from '../assets/hero-glyphs/light-blue/F_3D.glb?url'
import lightBlueOModelUrl from '../assets/hero-glyphs/light-blue/O_3D.glb?url'
import lightBlueSModelUrl from '../assets/hero-glyphs/light-blue/S_3D.glb?url'
import lightBlueTModelUrl from '../assets/hero-glyphs/light-blue/T_3D.glb?url'
import lightBlueUModelUrl from '../assets/hero-glyphs/light-blue/U_3D.glb?url'

export const HERO_GLYPH_STYLES = {
  lightBlue: 'light-blue',
}

export const heroGlyphLibrary = {
  [HERO_GLYPH_STYLES.lightBlue]: {
    label: 'Light blue',
    letters: {
      A: lightBlueAModelUrl,
      F: lightBlueFModelUrl,
      O: lightBlueOModelUrl,
      S: lightBlueSModelUrl,
      T: lightBlueTModelUrl,
      U: lightBlueUModelUrl,
    },
  },
}

export const defaultHeroGlyphSelection = {
  F: HERO_GLYPH_STYLES.lightBlue,
  A: HERO_GLYPH_STYLES.lightBlue,
  U: HERO_GLYPH_STYLES.lightBlue,
}

export function getHeroGlyphModelUrl(letter, style, { fallbackToAnyStyle = false } = {}) {
  const directMatch = heroGlyphLibrary[style]?.letters?.[letter] ?? null
  if (directMatch || !fallbackToAnyStyle) return directMatch

  for (const styleGroup of Object.values(heroGlyphLibrary)) {
    if (styleGroup.letters?.[letter]) return styleGroup.letters[letter]
  }

  return null
}
