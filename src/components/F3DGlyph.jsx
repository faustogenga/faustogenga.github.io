import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import fModelUrl from '../assets/F_3D.glb?url'
import './F3DGlyph.css'

const METAL_TINT = new THREE.Color('#edf3f8')
const EMISSIVE_TINT = new THREE.Color('#bfd7ff')

function finishMaterial(sourceMaterial) {
  const baseColor = sourceMaterial?.color?.clone?.().lerp(METAL_TINT, 0.82) ?? METAL_TINT.clone()
  const material = new THREE.MeshPhysicalMaterial({
    color: baseColor,
    map: sourceMaterial?.map ?? null,
    normalMap: sourceMaterial?.normalMap ?? null,
    aoMap: sourceMaterial?.aoMap ?? null,
    bumpMap: sourceMaterial?.bumpMap ?? null,
    alphaMap: sourceMaterial?.alphaMap ?? null,
    roughnessMap: sourceMaterial?.roughnessMap ?? null,
    metalnessMap: sourceMaterial?.metalnessMap ?? null,
    emissiveMap: null,
    transparent: sourceMaterial?.transparent ?? false,
    opacity: sourceMaterial?.opacity ?? 1,
    side: sourceMaterial?.side ?? THREE.FrontSide,
    metalness: 0.98,
    roughness: 0.038,
    envMapIntensity: 2.65,
    clearcoat: 1,
    clearcoatRoughness: 0.021,
    iridescence: 0.23,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [165, 390],
    emissive: EMISSIVE_TINT.clone(),
    emissiveIntensity: 0.072,
  })

  if ('specularIntensity' in material) material.specularIntensity = 1
  if ('sheen' in material) material.sheen = 1
  if ('sheenColor' in material) material.sheenColor = new THREE.Color('#f7fbff')
  if ('sheenRoughness' in material) material.sheenRoughness = 0.1
  if ('reflectivity' in material) material.reflectivity = 1
  material.needsUpdate = true
  return material
}

function StudioReflections() {
  return (
    <Environment resolution={256}>
      <group rotation={[0, -Math.PI / 6, 0]}>
        <Lightformer
          form="rect"
          intensity={4}
          position={[0, 4.5, 6]}
          scale={[5.5, 5.5, 1]}
          color="#ffffff"
        />
        <Lightformer
          form="rect"
          intensity={3.1}
          position={[-4.2, 1.8, 4.5]}
          scale={[3.5, 5.5, 1]}
          color="#d8e7ff"
        />
        <Lightformer
          form="rect"
          intensity={2.5}
          position={[4.8, -0.4, 3.6]}
          scale={[2.8, 4.8, 1]}
          color="#ffffff"
        />
        <Lightformer
          form="rect"
          intensity={1.35}
          position={[0, -4.8, 2]}
          scale={[10, 2.4, 1]}
          color="#c8d4e2"
        />
      </group>
    </Environment>
  )
}

function FModel({ cursorRef }) {
  const groupRef = useRef()
  const { scene } = useGLTF(fModelUrl)

  const model = useMemo(() => {
    const clone = scene.clone(true)

    clone.traverse((child) => {
      if (!child.isMesh) return

      child.castShadow = true
      child.receiveShadow = true

      if (Array.isArray(child.material)) {
        child.material = child.material.map((material) => finishMaterial(material))
        return
      }

      child.material = finishMaterial(child.material)
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
  }, [scene])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const elapsed = state.clock.elapsedTime
    const cursorX = cursorRef.current.x
    const cursorY = cursorRef.current.y
    const targetX = cursorY * 0.42
    const targetY = -cursorX * 0.72
    const targetZ = -cursorX * 0.08
    const targetPosY = Math.sin(elapsed * 0.8) * 0.02 + cursorY * 0.018

    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetX, 5.2, delta)
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetY, 5.2, delta)
    groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, targetZ, 5.2, delta)
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetPosY, 4.2, delta)
  })

  return (
    <group scale={[-1, 1, 1]}>
      <group ref={groupRef}>
        <primitive object={model} />
      </group>
    </group>
  )
}

export default function F3DGlyph({ className = '' }) {
  const glyphRef = useRef()
  const cursorRef = useRef({ x: 0, y: 0 })
  const [webglSupported, setWebglSupported] = useState(false)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const context =
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl')

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

  if (!webglSupported) {
    return (
      <span
        ref={glyphRef}
        className={`f3d-glyph f3d-glyph-fallback image-alphabet-glyph ${className}`.trim()}
        aria-hidden="true"
      >
        <span className="f3d-glyph-fallback-letter">F</span>
      </span>
    )
  }

  return (
    <span
      ref={glyphRef}
      className={`f3d-glyph image-alphabet-glyph ${className}`.trim()}
      aria-hidden="true"
      title="Drag to rotate"
    >
      <Canvas
        camera={{ position: [0, 0, 6.1], fov: 39 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        onCreated={({ gl, scene }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.08
          scene.background = null
        }}
      >
        <StudioReflections />
        <ambientLight intensity={0.85} color="#f2f6fb" />
        <hemisphereLight args={['#ffffff', '#1e2732', 0.98]} />
        <directionalLight position={[6, 8, 7]} intensity={2.32} color="#ffffff" />
        <directionalLight position={[-5.5, 3, 5]} intensity={1.12} color="#d8e7ff" />
        <pointLight position={[2.2, 1.6, 4.8]} intensity={8.4} distance={11} color="#ffffff" />
        <pointLight position={[-2.8, -1.2, 4.2]} intensity={4.7} distance={9} color="#c7dcff" />
        <Suspense fallback={null}>
          <FModel cursorRef={cursorRef} />
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

useGLTF.preload(fModelUrl)
