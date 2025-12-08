import { useRef } from 'react'
import { Text as DreiText, Center } from '@react-three/drei'
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
        <group ref={groupRef} position={[0, 0, 0]}>
          <DreiText
            fontSize={2}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            font="Arial"
            fontWeight="bold"
            outlineWidth={0.02}
            outlineColor="#8398FC"
          >
            Fausto Genga
          </DreiText>
        </group>
      </Center>
    </>
  )
}
