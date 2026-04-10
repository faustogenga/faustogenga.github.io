import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import './F3DGlyph.css'

const METAL_TINT = new THREE.Color('#edf3f8')
const EMISSIVE_TINT = new THREE.Color('#bfd7ff')
const CHROME_TINT = new THREE.Color('#f7fbff')

export const HERO_MATERIAL_MODES = {
  textured: 'textured',
  platinum: 'platinum',
  holographic: 'holographic',
  liquidMetal: 'liquid-metal',
}

function getMaterialConfig(sourceMaterial, materialMode) {
  const sourceColor = sourceMaterial?.color?.clone?.() ?? new THREE.Color('#ffffff')

  switch (materialMode) {
    case HERO_MATERIAL_MODES.platinum:
      return {
        color: sourceColor.lerp(METAL_TINT, 0.82),
        useTextureMaps: false,
        metalness: 0.88,
        roughness: 0.12,
        envMapIntensity: 1.85,
        clearcoat: 0.78,
        clearcoatRoughness: 0.08,
        iridescence: 0.08,
        sheen: 1,
        sheenColor: '#f7fbff',
        sheenRoughness: 0.18,
        emissive: EMISSIVE_TINT.clone(),
        emissiveIntensity: 0.025,
      }
    case HERO_MATERIAL_MODES.liquidMetal:
      return {
        color: sourceColor.lerp(CHROME_TINT, 0.92),
        useTextureMaps: false,
        metalness: 1,
        roughness: 0.055,
        envMapIntensity: 2.6,
        clearcoat: 1,
        clearcoatRoughness: 0.03,
        iridescence: 0.12,
        sheen: 0.82,
        sheenColor: '#ffffff',
        sheenRoughness: 0.08,
        emissive: new THREE.Color('#dbe8ff'),
        emissiveIntensity: 0.018,
      }
    case HERO_MATERIAL_MODES.holographic:
      return {
        color: sourceColor.lerp(new THREE.Color('#edf8ff'), 0.8),
        useTextureMaps: false,
        metalness: 0.42,
        roughness: 0.09,
        envMapIntensity: 2,
        clearcoat: 0.92,
        clearcoatRoughness: 0.06,
        iridescence: 0.68,
        sheen: 1,
        sheenColor: '#d6f6ff',
        sheenRoughness: 0.12,
        emissive: new THREE.Color('#a9d5ff'),
        emissiveIntensity: 0.03,
      }
    case HERO_MATERIAL_MODES.textured:
    default:
      return {
        color: sourceColor.lerp(METAL_TINT, 0.28),
        useTextureMaps: true,
        metalness: 0.72,
        roughness: 0.09,
        envMapIntensity: 1.78,
        clearcoat: 0.74,
        clearcoatRoughness: 0.09,
        iridescence: 0.06,
        sheen: 0.6,
        sheenColor: '#f1f8ff',
        sheenRoughness: 0.2,
        emissive: new THREE.Color('#b8d7ff'),
        emissiveIntensity: 0.016,
      }
  }
}

function finishMaterial(sourceMaterial, materialMode = HERO_MATERIAL_MODES.textured) {
  const config = getMaterialConfig(sourceMaterial, materialMode)
  const material = new THREE.MeshPhysicalMaterial({
    color: config.color,
    map: config.useTextureMaps ? sourceMaterial?.map ?? null : null,
    normalMap: config.useTextureMaps ? sourceMaterial?.normalMap ?? null : null,
    aoMap: config.useTextureMaps ? sourceMaterial?.aoMap ?? null : null,
    bumpMap: config.useTextureMaps ? sourceMaterial?.bumpMap ?? null : null,
    alphaMap: sourceMaterial?.alphaMap ?? null,
    roughnessMap: config.useTextureMaps ? sourceMaterial?.roughnessMap ?? null : null,
    metalnessMap: config.useTextureMaps ? sourceMaterial?.metalnessMap ?? null : null,
    emissiveMap: null,
    transparent: sourceMaterial?.transparent ?? false,
    opacity: sourceMaterial?.opacity ?? 1,
    side: sourceMaterial?.side ?? THREE.FrontSide,
    metalness: config.metalness,
    roughness: config.roughness,
    envMapIntensity: config.envMapIntensity,
    clearcoat: config.clearcoat,
    clearcoatRoughness: config.clearcoatRoughness,
    iridescence: config.iridescence,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [165, 390],
    emissive: config.emissive,
    emissiveIntensity: config.emissiveIntensity,
  })

  if ('specularIntensity' in material) material.specularIntensity = 1
  if ('sheen' in material) material.sheen = config.sheen
  if ('sheenColor' in material) material.sheenColor = new THREE.Color(config.sheenColor)
  if ('sheenRoughness' in material) material.sheenRoughness = config.sheenRoughness
  if ('reflectivity' in material) material.reflectivity = 1
  material.needsUpdate = true
  return material
}

function StudioReflections() {
  return (
    <Environment resolution={256}>
      <group rotation={[0, -Math.PI / 6, 0]}>
        <Lightformer form="rect" intensity={4} position={[0, 4.5, 6]} scale={[5.5, 5.5, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={3.1} position={[-4.2, 1.8, 4.5]} scale={[3.5, 5.5, 1]} color="#d8e7ff" />
        <Lightformer form="rect" intensity={2.5} position={[4.8, -0.4, 3.6]} scale={[2.8, 4.8, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={1.35} position={[0, -4.8, 2]} scale={[10, 2.4, 1]} color="#c8d4e2" />
      </group>
    </Environment>
  )
}

function GlyphModel({
  cursorRef,
  modelUrl,
  baseRotation = [0, 0, 0],
  mirrored = true,
  materialMode = HERO_MATERIAL_MODES.textured,
  danceMode = null,
  letterIndex = 0,
}) {
  const groupRef = useRef()
  const danceClockRef = useRef(null)
  const { scene } = useGLTF(modelUrl)

  const model = useMemo(() => {
    const clone = scene.clone(true)

    clone.traverse((child) => {
      if (!child.isMesh) return

      child.castShadow = true
      child.receiveShadow = true

      if (Array.isArray(child.material)) {
        child.material = child.material.map((material) => finishMaterial(material, materialMode))
        return
      }

      child.material = finishMaterial(child.material, materialMode)
    })

    const box = new THREE.Box3().setFromObject(clone)
    const size = box.getSize(new THREE.Vector3())
    const maxSize = Math.max(size.x, size.y, size.z)
    const scale = 2.72 / maxSize
    clone.scale.setScalar(scale)

    const centeredBox = new THREE.Box3().setFromObject(clone)
    const center = centeredBox.getCenter(new THREE.Vector3())
    clone.position.set(-center.x, -center.y - 0.02, -center.z)
    return clone
  }, [scene, materialMode])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const elapsed = state.clock.elapsedTime

    if (danceMode) {
      if (danceClockRef.current === null) danceClockRef.current = elapsed
      const t = elapsed - danceClockRef.current
      let tY = groupRef.current.rotation.y
      let tX = 0
      let tZ = 0

      if (danceMode === 'cascade') {
        // Staggered fast Y spins — wave of 2× 360° rolls left→right
        const lt = Math.max(0, t - letterIndex * 0.09)
        const ease = 1 - Math.pow(1 - Math.min(1, lt / 0.72), 3)
        tY = ease * Math.PI * 4

      } else if (danceMode === 'rave') {
        // Counter-rotating chaos — odd/even scissor, X/Y/Z all going
        const env = Math.min(1, t / 0.18) * (1 - Math.min(1, Math.max(0, (t - 3.0) / 0.5)))
        const dir = letterIndex % 2 === 0 ? 1 : -1
        tY = Math.sin(t * 9.0 + letterIndex * 0.55) * env * dir * 1.9
        tX = Math.sin(t * 7.2 + letterIndex * 0.85) * env * 0.55
        tZ = Math.sin(t * 5.8 + letterIndex * 1.1)  * env * 0.38

      } else if (danceMode === 'sync') {
        // All letters spin together simultaneously, one clean 360°
        const ease = 1 - Math.pow(1 - Math.min(1, t / 1.1), 3)
        tY = ease * Math.PI * 2

      } else if (danceMode === 'wave') {
        // Slow elegant Y sweep cascade — luxury showcase feel
        const phase  = ((t - letterIndex * 0.2) / 2.6) * Math.PI * 2
        const env    = Math.min(1, t / 0.7) * (1 - Math.max(0, Math.min(1, (t - 4.4) / 0.9)))
        tY = Math.sin(phase) * 0.78 * env
        tX = Math.cos(phase) * 0.11 * env
        tZ = Math.sin(phase * 0.5) * 0.055 * env
      }

      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, tX, 10, delta)
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, tY, danceMode === 'wave' ? 3 : 10, delta)
      groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, tZ, 10, delta)
      groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, 0, 5, delta)
      return
    }

    danceClockRef.current = null

    const cursorX = -cursorRef.current.x
    const cursorY = cursorRef.current.y
    const targetX = cursorY * 0.22
    const targetY = -cursorX * 0.38
    const targetZ = -cursorX * 0.04
    const targetPosY = Math.sin(elapsed * 0.8) * 0.02 + cursorY * 0.018

    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetX, 5.2, delta)
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetY, 5.2, delta)
    groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, targetZ, 5.2, delta)
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetPosY, 4.2, delta)
  })

  return (
    <group ref={groupRef}>
      <group scale={mirrored ? [-1, 1, 1] : [1, 1, 1]} rotation={baseRotation}>
        <primitive object={model} />
      </group>
    </group>
  )
}

export default function Letter3DGlyph({
  className = '',
  fallbackLetter,
  modelUrl,
  baseRotation = [0, 0, 0],
  mirrored = true,
  materialMode = HERO_MATERIAL_MODES.textured,
  title = 'Drag to rotate',
  danceMode = null,
  letterIndex = 0,
}) {
  const glyphRef = useRef()
  const cursorRef = useRef({ x: 0, y: 0 })
  const [webglSupported, setWebglSupported] = useState(false)
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const [isSwitching, setIsSwitching] = useState(false)
  const prevModeRef = useRef(materialMode)

  useEffect(() => {
    if (prevModeRef.current === materialMode) return
    prevModeRef.current = materialMode
    setIsSwitching(true)
    const t = setTimeout(() => setIsSwitching(false), 420)
    return () => clearTimeout(t)
  }, [materialMode])

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setWebglSupported(Boolean(context))
    } catch {
      setWebglSupported(false)
    }
  }, [])

  useEffect(() => {
    function handlePointerMove(event) {
      const rect = glyphRef.current?.getBoundingClientRect()
      if (!rect) return

      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const rangeX = Math.max(window.innerWidth * 0.45, 1)
      const rangeY = Math.max(window.innerHeight * 0.45, 1)

      cursorRef.current.x = THREE.MathUtils.clamp((event.clientX - centerX) / rangeX, -1, 1)
      cursorRef.current.y = THREE.MathUtils.clamp((event.clientY - centerY) / rangeY, -1, 1)
    }

    function resetPointer() {
      cursorRef.current.x = 0
      cursorRef.current.y = 0
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerleave', resetPointer)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', resetPointer)
    }
  }, [])

  useEffect(() => {
    const glyph = glyphRef.current
    if (!glyph) return undefined

    function updateTooltipPosition(event) {
      const rect = glyph.getBoundingClientRect()
      glyph.style.setProperty('--tooltip-x', `${event.clientX - rect.left}px`)
      glyph.style.setProperty('--tooltip-y', `${event.clientY - rect.top}px`)
    }

    function handlePointerEnter(event) {
      updateTooltipPosition(event)
      setIsTooltipVisible(true)
    }

    function handlePointerMove(event) {
      updateTooltipPosition(event)
    }

    function handlePointerLeave() {
      setIsTooltipVisible(false)
    }

    glyph.addEventListener('pointerenter', handlePointerEnter)
    glyph.addEventListener('pointermove', handlePointerMove)
    glyph.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      glyph.removeEventListener('pointerenter', handlePointerEnter)
      glyph.removeEventListener('pointermove', handlePointerMove)
      glyph.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  if (!webglSupported) {
    return (
      <span
        ref={glyphRef}
        className={`f3d-glyph f3d-glyph-fallback image-alphabet-glyph ${className}`.trim()}
        aria-hidden="true"
      >
        <span className="f3d-glyph-fallback-letter">{fallbackLetter}</span>
      </span>
    )
  }

  return (
    <span
      ref={glyphRef}
      className={`f3d-glyph image-alphabet-glyph ${isTooltipVisible ? 'tooltip-visible ' : ''}${isSwitching ? 'material-switching ' : ''}${className}`.trim()}
      aria-hidden="true"
    >
      <span className="f3d-glyph-tooltip">{title}</span>
      <Canvas
        camera={{ position: [0, 0, 6.1], fov: 39 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        onCreated={({ gl, scene }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 0.96
          scene.background = null
        }}
      >
        <StudioReflections />
        <ambientLight intensity={0.72} color="#f2f6fb" />
        <hemisphereLight args={['#ffffff', '#1e2732', 0.84]} />
        <directionalLight position={[6, 8, 7]} intensity={1.92} color="#ffffff" />
        <directionalLight position={[-5.5, 3, 5]} intensity={0.92} color="#d8e7ff" />
        <pointLight position={[2.2, 1.6, 4.8]} intensity={6.6} distance={11} color="#ffffff" />
        <pointLight position={[-2.8, -1.2, 4.2]} intensity={3.7} distance={9} color="#c7dcff" />
        <Suspense fallback={null}>
          <GlyphModel
            cursorRef={cursorRef}
            modelUrl={modelUrl}
            baseRotation={baseRotation}
            mirrored={mirrored}
            materialMode={materialMode}
            danceMode={danceMode}
            letterIndex={letterIndex}
          />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          dampingFactor={0.08}
          enableDamping
          rotateSpeed={0.42}
        />
      </Canvas>
    </span>
  )
}

export function preloadLetter3DGlyph(modelUrl) {
  useGLTF.preload(modelUrl)
}
