import fModelUrl from '../assets/F_3D.glb?url'
import aModelUrl from '../assets/A_3D.glb?url'
import Letter3DGlyph, { preloadLetter3DGlyph } from './Letter3DGlyph'

export default function F3DGlyph({ className = '' }) {
  return <Letter3DGlyph className={className} fallbackLetter="F" modelUrl={fModelUrl} />
}

export function A3DGlyph({ className = '' }) {
  return (
    <Letter3DGlyph
      className={className}
      fallbackLetter="A"
      modelUrl={aModelUrl}
      baseRotation={[0, -Math.PI / 2, 0]}
      mirrored={false}
    />
  )
}

preloadLetter3DGlyph(fModelUrl)
preloadLetter3DGlyph(aModelUrl)
