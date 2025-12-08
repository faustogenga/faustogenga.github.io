import { useRef } from 'react'
import { Text3D, Center } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export const Text = () => {
  const groupRef = useRef()
  const { mouse } = useThree()

  useFrame(() => {
    if (groupRef.current) {
      // Invert mouse.y for a more natural tilt:
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouse.y * 0.2,
        0.1
      )
      // If you want to invert X as well, add a minus here:
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.2,
        0.1
      )
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <Center>
        <group ref={groupRef} position={[3, 0, 0]}>
          <Text3D
            font="/Inter_Bold.json" 
            size={1}
            height={0.2}
            curveSegments={32}
            bevelEnabled={true}
            bevelThickness={0.03}
            bevelSize={0.05}
            bevelOffset={0}
            bevelSegments={10}
            position={[-3, 0, 0]}
          >
            Fausto Genga
            <meshStandardMaterial
              color="#ffffff"
              emissive="#8398FC"
              emissiveIntensity={0.6}
              metalness={0.2}
              roughness={0.3}
            />
          </Text3D>
        </group>
      </Center>
    </>
  )
}
