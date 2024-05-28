import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import helvetiker from 'three/examples/fonts/helvetiker_regular.typeface.json';

function Ground(props) {
  const { scene } = useThree();
  const planeSize = 51;
  const gridSize = 1; // Taille de chaque case du quadrillage
  const gridHeight = 0; // Hauteur du quadrillage par rapport au sol
  const gridMatrix = []; // Matrice pour stocker le quadrillage

  // Créer la matrice de quadrillage vide
  for (let i = 0; i < planeSize; i++) {
    gridMatrix.push(Array(planeSize).fill(null));
  }

  // Fonction pour créer les lignes du quadrillage
  const createGridLines = () => {
    const gridLines = [];

    // Créer les lignes horizontales
    for (let i = -planeSize / 2; i <= planeSize / 2; i += gridSize) {
      const points = [
        new THREE.Vector3(-planeSize / 2, gridHeight, i),
        new THREE.Vector3(planeSize / 2, gridHeight, i),
      ];
      gridLines.push(points);
    }

    // Créer les lignes verticales
    for (let i = -planeSize / 2; i <= planeSize / 2; i += gridSize) {
      const points = [
        new THREE.Vector3(i, gridHeight, -planeSize / 2),
        new THREE.Vector3(i, gridHeight, planeSize / 2),
      ];
      gridLines.push(points);
    }

    return gridLines;
  };

  // Fonction pour créer la lettre "N"
  const createLetterN = () => {
    const loader = new FontLoader();
    const font = loader.parse(helvetiker);

    const textGeometry = new TextGeometry('N', {
      font: font,
      size: 5,
      height: 0.5,
    });

    const textMaterial = new THREE.MeshBasicMaterial({ color: 'black' });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-30, 0.25, 2); // Positionner le "N" au centre
    textMesh.rotation.y = Math.PI / 2; // Faire pivoter de 90 degrés sur l'axe Y pour le rendre vertical

    scene.add(textMesh);

    // Nettoyer le texte lors du démontage du composant
    return () => {
      scene.remove(textMesh);
    };
  };

  // Créer les lignes du quadrillage et les ajouter à la scène
  useEffect(() => {
    const lines = createGridLines().map((points) => {
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color: 'grey' });
      const line = new THREE.Line(geometry, material);
      return line;
    });

    // Créer un plan pour le fond vert
    const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 'green', side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2; // Faire pivoter le plan pour qu'il soit parallèle au sol
    plane.position.y = gridHeight - 0.03; // Déplacer légèrement le plan vers le haut par rapport au sol
    scene.add(plane);

    // Ajouter les lignes à la scène
    scene.add(...lines);

    // Ajouter la lettre "N" à la scène
    createLetterN();

    // Nettoyer les lignes et le plan lors du démontage du composant
    return () => {
      scene.remove(plane);
      scene.remove(...lines);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null; // Ce composant ne rend rien, car les lignes sont ajoutées directement à la scène
}

export default Ground;
