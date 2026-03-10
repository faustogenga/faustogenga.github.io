import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import './F3DGlyph.css'

function FModel() {
  const { scene } = useGLTF('/F_3D.glb')

  const model = useMemo(() => {
    const clone = scene.clone(true)
    const box = new THREE.Box3().setFromObject(clone)
    const size = box.getSize(new THREE.Vector3())
    const maxSize = Math.max(size.x, size.y, size.z)
    const scale = 2.8 / maxSize
    clone.scale.setScalar(scale)
    const box2 = new THREE.Box3().setFromObject(clone)
    const center2 = box2.getCenter(new THREE.Vector3())
    clone.position.set(-center2.x, -center2.y, -center2.z)
    return clone
  }, [scene])

  return <primitive object={model} />
}

export default function F3DGlyph({ className = '' }) {
  return (
    <span
      className={`f3d-glyph image-alphabet-glyph ${className}`.trim()}
      aria-hidden="true"
      title="Drag to rotate"
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 6, 5]} intensity={1.8} />
        <directionalLight position={[-4, -2, -3]} intensity={0.4} />
        <Suspense fallback={null}>
          <FModel />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          dampingFactor={0.08}
          enableDamping
          rotateSpeed={0.6}
        />
      </Canvas>
    </span>
  )
}

useGLTF.preload('/F_3D.glb')
