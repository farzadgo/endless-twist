import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { camera } from './camera';
import { renderer } from './renderer';

export const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.05;
// controls.screenSpacePanning = false;
// controls.minDistance = 100;
// controls.maxDistance = 500;


// A THREE.JS WAY OF CONTROLS:
// const controls = new PointerLockControls(camera, renderer.domElement);
// // --- START
// controls.addEventListener('lock', () => {
//   renderer.domElement.addEventListener('mousemove', onDocumentMouseMove);
//   // camera.rotation.set(camRX, camRY, 0);
//   loop();
// })
// // --- PAUSE
// controls.addEventListener('unlock', () => {
//   renderer.domElement.removeEventListener('mousemove', onDocumentMouseMove);
//   stopAnim();
// })

// ALTERNATIVELY IN CASE OF `controls = new PointerLockControls()`
// POSSIBLE TO USE `controls.lock()` inside `startAnim` function!

// ALSO IN THE MAIN LOOPING FUNCTION (which contains `requestAnimationFrame`)
// (IN CASE OF EXPORTING `controls` TO `main.js`)
// `controls.update()` AND/OR
// `controls(deltaTime)` INSIDE `for (let i = 0; i < STEPS_PER_FRAME; i++) {}`
// MUST/CAN BE CALLED