import { useRef } from 'react';
import { Text3D, Center } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const Text = () => {
  const groupRef = useRef();
  const { mouse } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      // Directly use mouse values to adjust rotation.
      // Multiply by a factor (e.g., 0.5) to control the intensity.
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.5, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.5, 0.1);
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <Center>
        <group ref={groupRef}>
          <Text3D
            font={"/Inter_Bold (1).json"}
            size={0.9}
            height={0.2}
            curveSegments={24}
            bevelEnabled={true}
            bevelThickness={0.03}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={10}
            letterSpacing={0.05}
          >
            Fausto Genga
            <meshBasicMaterial
              color="#8398FC"
              wireframe={true}
              transparent={true}
              opacity={0.6}
              side={THREE.BackSide}
            />
          </Text3D>
        </group>
      </Center>
    </>
  );
};
