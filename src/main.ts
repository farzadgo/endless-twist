import './costyles.css';
import './style.css';

import { Clock, DirectionalLight, AmbientLight } from 'three';
import { loadModels } from './core/loader';
import { renderer, scene } from './core/renderer';
import { camera, updateCamera, cameraRotations, resetCamera } from './core/camera';
import { initGUI, showOverlay, hideOverlay, updateGUI } from './core/gui';
import {
  updateImages,
  updateAudio,
  updateVideos,
  pauseAudio,
  playAudio,
  audioElapsed,
  resetAudio
} from './content/updatemedia';

import { throttle } from 'throttle-debounce';

export const isMobile = () => {
  // return (( window.innerWidth <= 800 ) || ( window.innerHeight <= 600 ));
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return true;
  } else {
    return false;
  }
}

export const loaderDiv = document.querySelector<HTMLDivElement>('.loader');
export const spinnerDiv = document.querySelector<HTMLDivElement>('.spinner');
export const progressDiv = document.querySelector<HTMLDivElement>('.progress');


let animID: number;
let elapsed = 0;

let running = false;
let started = false;
let waited = true;

export const DURATION_IN_SECONDS = 1040;
export const FORWARD_DURATION = 60;
const STEPS_PER_FRAME = 5;

if (!isMobile()) {
  loadModels();
} else {
  spinnerDiv?.remove();
  progressDiv!.innerHTML = 'the web installation is only <br> available on desktop devices';
}

const waiter = () => {
  waited = false;
  setTimeout(() => waited = true, 1000);
  // return waited
}



// --------- CONTROLS ---------

export const startAnim = () => {
  if (!started) {
    started = true;
    // clock.start();
  }

  if (!isMobile()) {
    document.body.requestPointerLock();
    // document.body.requestFullscreen();
    loop();
    running = true;
    camera.rotation.set(cameraRotations.x, cameraRotations.y, 0);
    hideOverlay();
    waiter();
    playAudio();
  } else {
    window.alert("please check the work on a desktop device!");
    return
  }
}

export const stopAnim = () => {
  document.exitPointerLock();
  // document.exitFullscreen();
  cancelAnimationFrame(animID);
  running = false;
  showOverlay();
  waiter();
  pauseAudio();
}

const onPointerLockChange = () => {
  if (document.pointerLockElement !== document.body) {
    stopAnim();
  }
}

let inertia: number;
let movementX: number;
let movementY: number;

const onDocumentMouseMove = (event: {
  movementY: number; movementX: number; 
}) => {
  // // 0.05 and (inertia / 50) also good
  inertia = 0.1;
  movementX = event.movementX;
  movementY = event.movementY;
  // camera.rotation.y -= event.movementX * 0.0002;
  // camera.rotation.x -= event.movementY * 0.0002;
}

const updateControls = (dt: number) => {
  inertia -= dt;
  if (inertia < 0) {
    inertia = 0;
  }
  camera.rotation.y -= movementX * (inertia / 1500);
  camera.rotation.x -= movementY * (inertia / 1500);
}

document.addEventListener('mousemove', onDocumentMouseMove);
document.addEventListener('pointerlockchange', onPointerLockChange);
// document.addEventListener("fullscreenchange", onFullscreenchange);

document.addEventListener('keyup', event => {
  if (event.code === 'Space') {
    if (running && waited) {
      document.exitPointerLock();
    }
    if (!running && waited) {
      startAnim();
    }
  }
});


// --------- LIGHTS ---------

const ambientLight = new AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new DirectionalLight('#ffffff', 1);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.normalBias = 0.05;
directionalLight.position.set(50, 50, 50);

scene.add(directionalLight);


// --------- init GUI ---------

initGUI();


// --------- LOOPING CONTROL ---------

const clock = new Clock();

export const reset = () => {
  started = false;
  elapsed = 0;
  resetCamera();
  resetAudio();
}

let trigger = false;

const loop = () => {
  const deltaTime: number = Math.min( 0.05, clock.getDelta()) / STEPS_PER_FRAME;
  
  if (Math.abs(audioElapsed - elapsed) > 1.0 && running) {
    trigger = true;
    if (trigger === true) {
      elapsed = audioElapsed;
      console.log('synced');
      trigger = false;
    }
  }

  controlTime();
  updateControls(deltaTime);

  for (let i = 0; i < STEPS_PER_FRAME; i++) {
    updateCamera(deltaTime);
  }

  renderer.render(scene, camera);
  animID = requestAnimationFrame(loop);
}


const controlTime = throttle(100, () => {
  if (running) elapsed += 0.1;
  let time = Math.round(elapsed * 10) / 10;

  updateAudio();
  updateImages(time);
  updateVideos(time, running);
  updateGUI(time, running, started);

  // let roundedFraction = Math.round(fraction * 100000) / 100000;
  // console.log(`fraction: ${roundedFraction} | elapsed: ${time} | audioElapsed: ${audioElapsed}`);
});
