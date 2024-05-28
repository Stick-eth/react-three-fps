// App.js
import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Cube from './Cube';
import Ground from './Plane';
import FixedUIElement from './FixedUIElement';
import { useFrame } from '@react-three/fiber';

function Scene({ setCamera }) {
  const cameraRef = useRef();

  useFrame(({ camera }) => {
    setCamera(camera); // Met à jour la caméra dans le composant parent
  });

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Cube position={[0, 0.5, 0]} />
      <Ground position={[0, 0, 0]} />
      <OrbitControls />
      <perspectiveCamera ref={cameraRef} position={[10, 10, 10]} />
    </>
  );
}

function App() {
  const [camera, setCamera] = React.useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === ' ') { // Espace est enfoncée
      setMessage("'Bloc ajouté avec succès!'");
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000); // Afficher le message pendant 2 secondes
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }} onKeyDown={handleKeyPress} tabIndex={0}>
      {/* Ajoutez tabIndex={0} pour rendre le div focusable */}
      <Canvas style={{ height: '100vh' }}>
        <Scene setCamera={setCamera} />
      </Canvas>
      {camera && <FixedUIElement camera={camera} showMessage={showMessage} message={message} />}
    </div>
  );
}

export default App;
