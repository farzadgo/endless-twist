// import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
// import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { Clock, DirectionalLight, AmbientLight } from 'three';
import { loadModels } from './core/loader';
import { renderer, scene } from './core/renderer';
import { camera, updateCamera, cameraRotations } from './core/camera';

import {
  showOverlay,
  hideOverlay,
  updateUI,
  resetUI,
  updateDurationUI
} from './core/gui';

import {
  updateImages,
  updateAudio,
  updateVideos,
  pauseAudio,
  playAudio,
  audioElapsed
} from './content/updatemedia';

import { throttle } from 'throttle-debounce';
import './style.css';

export const isMobile = () => {
  return (( window.innerWidth <= 800 ) || ( window.innerHeight <= 600 ));
}

export const loaderDiv = document.querySelector<HTMLDivElement>('.loader');
export const spinnerDiv = document.querySelector<HTMLDivElement>('.spinner');
export const progressDiv = document.querySelector<HTMLDivElement>('.progress');


let animID: number;
let elapsed = 0;
// let elapsedV2 = 0;

let running = false;
let started = false;
let waited = true;

export const DURATION_IN_SECONDS = 1040;
const STEPS_PER_FRAME = 5;

if (!isMobile()) {
  loadModels();
} else {
  spinnerDiv?.remove();
  progressDiv!.innerHTML = 'this web installation is only <br> available on desktop devices';
}

const waiter = () => {
  waited = false;
  setTimeout(() => waited = true, 1000);
  // return waited
}


// --------- CONTROLS ---------


// interface DTObject {
//   start: number;
//   end: number;
// }

// let index = 0;
// let pauseTimes: DTObject[] = [];

// function calculateDifferenceSum(deltaObjects: DTObject[]): number {
//   let sum = 0;
//   deltaObjects.forEach((obj) => {
//     if (obj.end !== 0) {
//       const difference = obj.end - obj.start;
//       sum += difference;
//     }
//   });

//   return sum;
// }


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

    // if (pauseTimes.length) {
    //   pauseTimes[index - 1].end = clock.elapsedTime;
    // }
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

  // pauseTimes.push({
  //   start: clock.elapsedTime,
  //   end: 0
  // });
  // index += 1;
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

document.body.addEventListener('mousemove', onDocumentMouseMove);
document.addEventListener('pointerlockchange', onPointerLockChange);
// document.addEventListener("fullscreenchange", onFullscreenchange);
document.addEventListener('keyup', event => {
  if (event.code === 'Space') {
    if (running && waited) {
      // stopAnim();
      document.exitPointerLock();
      // setTimeout(() => waited = true, 1000);
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
showOverlay();

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

const clock = new Clock();

export const reset = () => {
  started = false;
  elapsed = 0;
  // elapsedV2 = 0;
  // clock.stop();
  resetUI();
  stopAnim();
}

let trigger = false;

const loop = () => {
  // fpsGraph.begin();
  const deltaTime: number = Math.min( 0.05, clock.getDelta()) / STEPS_PER_FRAME;
  
  // apparently not working well !!!
  // elapsedV2 = clock.elapsedTime - calculateDifferenceSum(pauseTimes);
  
  if (Math.abs(audioElapsed - elapsed) > 1.0 && running) {
    trigger = true;
    if (trigger === true) {
      elapsed = audioElapsed;
      console.log('synced');
      trigger = false;
    }
  }

  controlTime();
  updateUI(started);
  updateControls(deltaTime);

  for (let i = 0; i < STEPS_PER_FRAME; i++) {
    updateCamera(deltaTime, elapsed);
  }

  // fpsGraph.end();
  renderer.render(scene, camera);
  animID = requestAnimationFrame(loop);
}


const controlTime = throttle(100, () => {
  if (running) elapsed += 0.1;

  let time = Math.round(elapsed * 10) / 10;

  updateImages(time);
  updateAudio(time);
  updateVideos(time, running);

  updateDurationUI(time, running);

  // console.log(`clock: ${clock.elapsedTime} | elapsedV2: ${elapsedV2} | elapsed: ${elapsed}`);
});
