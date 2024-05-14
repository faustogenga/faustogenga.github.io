import { useEffect, useState } from 'react';
import { Text3D } from '@react-three/drei';

export const Text = () => {
    const [rotation, setRotation] = useState([0, 0, 0]);
  
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const mouseX = (clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(clientY / window.innerHeight) * 2 + 1;
  
      const newRotation = [0 - (0.2 * mouseY), 0 + (0.1 * mouseX), 0];
  
      setRotation(newRotation);
    };
  
    useEffect(() => {
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, []);
  
    return (
      <>
        <Text3D
          position={[-1.7, -0.3, 0]}
          rotation={rotation}
          letterSpacing={0}
          size={0.35}
          font={"/Inter_Bold (1).json"}
        >
          Fausto Genga
          <meshBasicMaterial
          color='#343434'
          // eslint-disable-next-line react/no-unknown-property
          wireframe={true}
          />
        </Text3D>
  
      </>
    );
  };