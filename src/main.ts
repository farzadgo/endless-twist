
import * as THREE from 'three';
// import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
// import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { manager } from './core/loader';
import { renderer, scene } from './core/renderer';
import { camera, updateCamera, cameraRotations } from './core/camera';
import { handleImages, handleAudios, handleVideos } from './updatemedia';
import { showOverlay, hideOverlay, updateUI } from './core/gui';

import { throttle } from 'throttle-debounce';
import './style.css';

const isMobile = () => {
  return (( window.innerWidth <= 800 ) || ( window.innerHeight <= 600 ));
}

export const container = document.getElementById('webgl-container');

let animID: number;
export let elapsed = 0;
let running = false;
let ended = false;
// let _totalTime = 0;

const STEPS_PER_FRAME = 5;

manager.onError = (url) => console.log('error loading ' + url);



// --------- CONTROLS ---------

export const startAnim = () => {
  if (ended) {
    ended = false;
    // clock.start();
  }

  if (!isMobile()) {
    document.body.requestPointerLock();
    // document.body.requestFullscreen();
    loop();
    running = true;
    
    camera.rotation.set(cameraRotations.x, cameraRotations.y, 0);
    hideOverlay();
  } else {
    window.alert("please check the work on desktop device!");
    return
  }
  // // in case of PointerLockControls
  // controls.lock();
}


export const stopAnim = () => {  
  cancelAnimationFrame(animID);
  // document.exitFullscreen();
  running = false;
  // _totalTime += _elapsed;
  showOverlay();
}


const onPointerLockChange = () => {
  if (document.pointerLockElement !== document.body) {
    stopAnim();
  }
}

const onDocumentMouseMove = (event: {
  movementY: number; movementX: number; 
}) => {
  camera.rotation.y -= event.movementX * 0.0002;
  camera.rotation.x -= event.movementY * 0.0002;
}

document.body.addEventListener('mousemove', onDocumentMouseMove);
document.addEventListener('pointerlockchange', onPointerLockChange);

// const controls = new PointerLockControls(camera, renderer.domElement);
// // --- START
// controls.addEventListener('lock', () => {
//   // works without this as well !!!
//   renderer.domElement.addEventListener('mousemove', onDocumentMouseMove);
//   // camera.rotation.set(camRX, camRY, 0);
//   loop();
// })
// // --- PAUSE
// controls.addEventListener('unlock', () => {
//   // works without this as well !!!
//   renderer.domElement.removeEventListener('mousemove', onDocumentMouseMove);
//   stopAnim();
// })



// --------- LIGHTS ---------

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.normalBias = 0.05;
directionalLight.position.set(50, 50, 50);

scene.add(directionalLight)

// const helper = new THREE.DirectionalLightHelper(directionalLight, 100);
// scene.add(helper);


// const DirectionalLightFolder = paneGui.addFolder({
//   title: 'Directional Light',
// })

// Object.keys(directionalLight.position).forEach(key => {
//   DirectionalLightFolder.addInput(
//     directionalLight.position,
//     key as keyof THREE.Vector3,
//     {
//       min: -100,
//       max: 100,
//       step: 1
//     },
//   )
// })



// --------- LOOPING CONTROL ---------

const clock = new THREE.Clock();

export const reset = () => {
  ended = true;
  elapsed = 0;
  // clock.stop();
  document.exitPointerLock();
}


const loop = () => {
  // fpsGraph.begin();
  controlTime();
  updateUI();

  const deltaTime: number = Math.min( 0.05, clock.getDelta()) / STEPS_PER_FRAME;

  // controls.update();
  for (let i = 0; i < STEPS_PER_FRAME; i ++) {
    // controls(deltaTime);
    updateCamera(deltaTime);
  }

  // fpsGraph.end();
  renderer.render(scene, camera);
  animID = requestAnimationFrame(loop);
}



const controlTime = throttle(1000, () => {
  // console.log(elapsed);
  
  if (running) {
    elapsed += 1;
  }
  
  handleImages(elapsed);
  handleAudios(elapsed, running);
  handleVideos(elapsed, running);

  // // in case of Clock START/STOP
  // _elapsed = Math.round(clock.elapsedTime);
  // let totalElapsed = _elapsed + time;
  // if (running) handleImages(totalElapsed);
});
