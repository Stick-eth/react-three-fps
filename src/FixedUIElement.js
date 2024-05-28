import React, { useRef, useState, useEffect } from 'react';

function FixedUIElement({ camera, showMessage, message }) {
  const arrowRef = useRef();
  const circleRef = useRef();
  const [circleSize, setCircleSize] = useState({ width: 0, height: 0 });
  const [cameraAngle, setCameraAngle] = useState(0);

  useEffect(() => {
    // Récupérer les dimensions du cercle noir
    const circleWidth = circleRef.current.clientWidth;
    const circleHeight = circleRef.current.clientHeight;
    setCircleSize({ width: circleWidth, height: circleHeight });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!camera || !arrowRef.current) return;

      const cameraX = camera.position.x;
      const cameraZ = camera.position.z;

      // Calcul de l'angle entre le vecteur de la caméra et l'axe des x positifs
      let angle = Math.atan2(cameraZ, cameraX);

      // Conversion de l'angle de radians à degrés
      angle *= 180 / Math.PI;

      // Correction pour assurer que l'angle est dans la plage [0, 360]
      if (angle < 0) {
        angle += 360;
      }

      // Rotation de la flèche autour du centre du cercle noir
      const arrow = arrowRef.current;
      arrow.style.transformOrigin = `50% ${circleSize.height / 2}px`;
      arrow.style.transform = `translateY(-50%) rotate(${angle}deg)`;

      // Mettre à jour l'angle de la caméra affiché
      setCameraAngle(angle);
    }, 100); // Actualisation toutes les 100 millisecondes

    return () => clearInterval(intervalId);
  }, [camera, circleSize]);

  const circleStyle = {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    width: '80px', // Modifie la taille du cercle
    height: '80px', // Modifie la taille du cercle
    backgroundColor: 'black',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const arrowStyle = {
    width: '40px', // Modifie la taille du triangle
    height: '40px', // Modifie la taille du triangle
    fill: 'red',
  };

  const messageStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'transparent',
    padding: '10px',
    borderRadius: '5px',
    fontSize: '32px', // Taille de police grande
    color: ' Black',   // Couleur verte
    fontWeight: 'bold', // Optionnel, pour rendre le texte en gras
    textAlign: 'center' // Optionnel, pour centrer le texte
  };

  return (
    <div>
      <div style={circleStyle} ref={circleRef}>
        {/* Arrow SVG */}
        <svg viewBox="0 0 10 10" style={arrowStyle} ref={arrowRef}>
          <path d="M0 5l5-5 5 5H0z" />
        </svg>
      </div>
      {showMessage && (
        <div style={messageStyle}>
          {message}
        </div>
      )}
      <div style={{ position: 'absolute', top: '10px', left: '10px', color: 'black' }}>
        Camera Angle: {cameraAngle}°
      </div>
    </div>
  );
}

export default FixedUIElement;
