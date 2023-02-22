
import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
// import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

import { renderer, scene } from './core/renderer';
import { camera, updateCamera, cameraRotations } from './core/camera';
// import camera from './core/camera'; /* IN CASE OF export default camera */
// import { controls } from './core/orbit-control';
// import { canvas } from './core/renderer';
// import { fpsGraph, gui } from './core/gui';

import { handleImages, handleAudios, handleVideos } from './updatemedia';

import { throttle } from 'throttle-debounce';
import './style.css';


const modelUrls = [
  'https://res.cloudinary.com/dd3tumnu6/image/upload/v1676469245/tender-models/1_speicher_skm70j.glb',
  'https://res.cloudinary.com/dd3tumnu6/image/upload/v1676469245/tender-models/2_speicher_tayjkv.glb',
  'https://res.cloudinary.com/dd3tumnu6/image/upload/v1676461879/tender-models/3_promenade_lys9gr.glb',
  'https://res.cloudinary.com/dd3tumnu6/image/upload/v1676461878/tender-models/3_cross_svreqc.glb',
  'https://res.cloudinary.com/dd3tumnu6/image/upload/v1676461877/tender-models/4_hafen_jw8cvs.glb',
  'https://res.cloudinary.com/dd3tumnu6/image/upload/v1676461881/tender-models/5_kellogs_uggrea.glb',
  'https://res.cloudinary.com/dd3tumnu6/image/upload/v1676461880/tender-models/5_coffee_zwfzq8.glb',
  'https://res.cloudinary.com/dd3tumnu6/image/upload/v1676461878/tender-models/6_sand_trcsgp.glb',
  'https://res.cloudinary.com/dd3tumnu6/image/upload/v1676461879/tender-models/7_cream_g2rnvt.glb'
]

export const container = document.getElementById('webgl-container');

let animID: number;
export let elapsed = 0;
let running = false;
let ended = false;
// let _totalTime = 0;

const STEPS_PER_FRAME = 5;


// --------- UI ---------

// let loadBar: HTMLElement | null;

const loadBar = document.getElementById('loadbar');
const overlay = document.getElementById('overlay');

const startBtn = document.createElement('button');
startBtn.className = 'start';
startBtn.textContent = 'start';


const updateUI = () => {  
  // let startBtnContent = _totalTime ? 'continue' : 'start';
  if (ended) {
    startBtn.textContent = 'reload';
  } else {
    startBtn.textContent = 'continue';
  }
}

const showOverlay = () => {
  if (overlay) {
    overlay.style.display = 'block';
    // if (container?.parentElement) {
    //   container?.parentElement.appendChild(overlay);
    // }
    overlay.style.transition = '1s';
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.opacity = '1';
    }, 10);
  }
}

const hideOverlay = () => {
  overlay!.style.opacity = '0';
  setTimeout(() => {
    overlay!.style.display = 'none';
  }, 1000);
  // overlay!.style.display = 'none';
}



// --------- LOOK AROUND / CONTROLS ---------

const startAnim = () => {
  if (!ended) {
    document.body.requestPointerLock();
    loop();
    running = true;

    // clock.start();
    // in case of PointerLockControls
    // controls.lock();

    hideOverlay();
    startBtn.style.display = 'none';

    camera.rotation.set(cameraRotations.x, cameraRotations.y, 0);
  } else {
    location.reload();
  }
}


export const stopAnim = () => {
  cancelAnimationFrame(animID);
  running = false;

  // clock.stop();
  // _totalTime += _elapsed;

  showOverlay();

  startBtn.style.display = 'block';
  startBtn.style.pointerEvents = 'none';
  startBtn.style.opacity = '0.3';
  setTimeout(() => {
    startBtn.style.opacity = '1';
    startBtn.style.pointerEvents = 'auto';
  }, 1000);
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

// --- LIGHT GUI 

// const DirectionalLightFolder = gui.addFolder({
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



// -------- Loading Manager --------

const manager = new THREE.LoadingManager();

manager.onLoad = () => {
  console.log("Loading complete!");

  if (loadBar) loadBar?.remove();

  showOverlay();

  if (startBtn) startBtn.addEventListener('click', startAnim);
  container?.appendChild(startBtn);

  // renderer.render(scene, camera);
}

manager.onProgress = (_url, itemsLoaded, itemsTotal) => {
  // console.log(`loaded: ${itemsLoaded}/${itemsTotal}`);
  let ratio = itemsLoaded / itemsTotal;
  let width = window.innerWidth;
  if (loadBar) loadBar.style.width = `${(ratio * width) - 80 }px`;
}

manager.onError = (url) => console.log('error loading ' + url);



// --------- LOAD MODELS AND INIT UI ---------

// let loadmodel: GLTF | null = null;

// const modelFormatter = (data: GLTF) => {          
//   // let model = data.scene.children[0];
//   let model = data.scene;
//   return model
// }
// const allModels = modelsData.map(data => modelFormatter(data));
// allModels.forEach(elem => scene.add(elem));

const modelFormatter = (dataArr: GLTF[]) => {          
  let allModel = new Array;
  dataArr.forEach(data => allModel.push(data.scene));
  let filtered = dataArr.filter(e => e.scene.children[0].name === 'ice-cream');
  const copyOne = filtered[0].scene.clone();
  const copyTwo = filtered[0].scene.clone();
  copyOne.position.set(398, 0, -484);
  copyTwo.position.set(796, 0, -968);
  allModel.push(copyOne, copyTwo);
  // ???
  // geometries.receiveShadow = true;
  allModel.forEach(elem => scene.add(elem));
}

const loader = new GLTFLoader(manager);

let modelsData = [];

[...modelsData] = await Promise.all([
  loader.loadAsync(modelUrls[0]),
  loader.loadAsync(modelUrls[1]),
  loader.loadAsync(modelUrls[2]),
  loader.loadAsync(modelUrls[3]),
  loader.loadAsync(modelUrls[4]),
  loader.loadAsync(modelUrls[5]),
  loader.loadAsync(modelUrls[6]),
  loader.loadAsync(modelUrls[7]),
  loader.loadAsync(modelUrls[8])
]);

modelFormatter(modelsData);



// --------- LOOPING CONTROL ---------

const clock = new THREE.Clock();

export const reset = () => {
  document.exitPointerLock();
  clock.stop();
  // running = false;
  // stopAnim();
  ended = true;
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
