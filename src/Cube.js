// Cube.js
import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useSpring, animated } from '@react-spring/three';
import { Box } from '@react-three/drei';

const Cube = forwardRef((props, ref) => {
  const localRef = useRef();
  const [targetPosition, setTargetPosition] = useState([0, 0, 0]);

  useImperativeHandle(ref, () => ({
    getPosition: () => localRef.current.position,
  }));

  const { animatedPosition } = useSpring({
    animatedPosition: targetPosition,
    config: { tension: 500, friction: 20 },
  });

  const handleKeyPress = (event) => {
    const speed = 1;
    switch (event.key) {
      case 'ArrowRight':
        setTargetPosition((prevPosition) => [prevPosition[0], prevPosition[1], Math.max(prevPosition[2] - speed, -25)]);
        break;
      case 'ArrowLeft':
        setTargetPosition((prevPosition) => [prevPosition[0], prevPosition[1], Math.min(prevPosition[2] + speed, 25)]);
        break;
      case 'ArrowUp':
        setTargetPosition((prevPosition) => [Math.max(prevPosition[0] - speed, -25), prevPosition[1], prevPosition[2]]);
        break;
      case 'ArrowDown':
        setTargetPosition((prevPosition) => [Math.min(prevPosition[0] + speed, 25), prevPosition[1], prevPosition[2]]);
        break;
      case 'p':
      case 'P':
        console.log("Position actuelle du cube :", animatedPosition.get());
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <animated.group position={animatedPosition}>
      <Box ref={localRef} {...props}>
        <meshBasicMaterial attach="material" color="orange" />
      </Box>
    </animated.group>
  );
});

export default Cube;
