import * as THREE from 'https://esm.sh/three@0.155.0';
import { OrbitControls } from 'https://esm.sh/three@0.155.0/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight * 0.8), 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight * 0.8);
document.getElementById('solarSystem').appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 50, 150);
controls.update();

const pointLight = new THREE.PointLight(0xffffff, 2);
scene.add(pointLight);
scene.add(new THREE.AmbientLight(0xffffff, 0.3));

const loader = new THREE.TextureLoader();

const planetData = [
  { name: 'Mercury', size: 1, distance: 10, speed: 0.02, texture: 'textures/mercury.jpg' },
  { name: 'Venus', size: 2, distance: 15, speed: 0.015, texture: 'textures/venus.jpg' },
  { name: 'Earth', size: 2.2, distance: 20, speed: 0.01, texture: 'textures/earth.jpg' },
  { name: 'Mars', size: 1.8, distance: 25, speed: 0.008, texture: 'textures/mars.jpg' },
  { name: 'Jupiter', size: 4.5, distance: 32, speed: 0.005, texture: 'textures/jupiter.jpg' },
  { name: 'Saturn', size: 4, distance: 40, speed: 0.004, texture: 'textures/saturn.jpg', hasRing: true },
  { name: 'Uranus', size: 3, distance: 47, speed: 0.003, texture: 'textures/uranus.jpg', hasRing: true },
  { name: 'Neptune', size: 3, distance: 54, speed: 0.002, texture: 'textures/neptune.jpg' }
];

const planets = [];

const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ map: loader.load('textures/sun.jpg') });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

planetData.forEach((planet) => {
  const geometry = new THREE.SphereGeometry(planet.size, 32, 32);
  const texture = loader.load(planet.texture, undefined, undefined, () => {
    console.error(`Texture not found: ${planet.texture}`);
  });
  const material = new THREE.MeshStandardMaterial({ map: texture });
  const mesh = new THREE.Mesh(geometry, material);

  if (planet.hasRing) {
    const ringGeometry = new THREE.RingGeometry(planet.size + 0.8, planet.size + 2.5, 64);
    const ringTexture = loader.load('textures/ring.png');
    const ringMaterial = new THREE.MeshBasicMaterial({
      map: ringTexture,
      side: THREE.DoubleSide,
      transparent: true
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = -Math.PI / 2;
    mesh.add(ring);
  }

  scene.add(mesh);
  planets.push({ mesh, angle: Math.random() * Math.PI * 2, ...planet });
});

const speeds = {};
planetData.forEach(p => speeds[p.name] = p.speed);

const speedControls = document.getElementById('speedControls');
planetData.forEach(p => {
  const label = document.createElement('label');
  label.textContent = `${p.name} Speed`;
  const input = document.createElement('input');
  input.type = 'range';
  input.min = 0.001;
  input.max = 0.05;
  input.step = 0.001;
  input.value = p.speed;
  input.addEventListener('input', () => {
    speeds[p.name] = parseFloat(input.value);
  });
  speedControls.appendChild(label);
  speedControls.appendChild(input);
});

let isPaused = false;
document.getElementById('toggleBtn').addEventListener('click', () => {
  isPaused = !isPaused;
  document.getElementById('toggleBtn').textContent = isPaused ? 'Resume' : 'Pause';
});

function animate() {
  requestAnimationFrame(animate);

  if (!isPaused) {
    planets.forEach(p => {
      p.angle += speeds[p.name];
      p.mesh.position.set(
        Math.cos(p.angle) * p.distance,
        0,
        Math.sin(p.angle) * p.distance
      );
    });
  }

  controls.update();
  renderer.render(scene, camera);
}

animate();