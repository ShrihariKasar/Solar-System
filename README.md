# 3D Solar System Simulation

This project is a **3D Solar System simulation** created using [Three.js](https://threejs.org/). It features realistic textured planets orbiting around the Sun with adjustable orbit speeds and interactive camera controls.

---

## Features

- **3D realistic Sun and planets** with textures.
- Planets orbit around the Sun at different speeds and distances.
- Adjustable speed sliders for each planet.
- Pause and resume animation.
- Interactive camera controls using mouse (OrbitControls).
- Responsive canvas sized to 80% of the browser viewport height.

---

## Technologies Used

- JavaScript (ES6 modules)
- [Three.js](https://threejs.org/) (version 0.155.0)
- WebGL rendering
- HTML & CSS for UI controls

---

## Setup & Usage

### Prerequisites

- A modern web browser with ES6 module support (Chrome, Firefox, Edge, Safari).
- Local or remote web server to serve files (due to module imports and texture loading).

### Run Locally

1. Clone or download the project folder.
2. Ensure the following structure for textures inside a `textures` folder:
   - `sun.jpg`
   - `mercury.jpg`
   - `venus.jpg`
   - `earth.jpg`
   - `mars.jpg`
   - `jupiter.jpg`
   - `saturn.jpg`
   - `uranus.jpg`
   - `neptune.jpg`
   - `ring.png` (for Saturn and Uranus rings)
3. Serve the folder using a local server (e.g., VSCode Live Server, `python -m http.server`, etc.).
4. Open `index.html` in the browser.

---

## Code Overview

- **Scene setup**: A Three.js scene with PerspectiveCamera and WebGLRenderer.
- **Lighting**: A bright PointLight at the Sun's location plus ambient light.
- **Sun**: A textured sphere mesh acting as the center.
- **Planets**: Each planet is a textured sphere mesh, positioned based on distance and angle around the Sun.
- **Animation**: Each planet orbits the Sun by updating position in a circular path with a unique speed.
- **Controls**: Sliders allow adjusting the orbital speed of each planet dynamically.
- **Pause/Resume**: Button toggles animation pause and resume.
- **OrbitControls**: User can rotate, zoom, and pan the view with mouse.

---

## Usage Instructions

- Use the sliders to increase or decrease the orbital speed of any planet.
- Click the "Pause" button to stop the animation; it toggles to "Resume" to continue.
- Click and drag the mouse on the canvas to rotate the camera view.
- Scroll to zoom in and out.
- The simulation automatically adapts to your browser window size.

---