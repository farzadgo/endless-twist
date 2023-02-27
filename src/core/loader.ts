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


import { LoadingManager, Group} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { scene } from '../core/renderer';
import { showOverlay } from './gui';


const spinner = document.querySelector('.spinner');
const progress = document.querySelector('.progress');


// -------- Loading Manager --------

export const manager = new LoadingManager();

manager.onLoad = () => {
  console.log("Loading complete!");
  // console.log(modelsData);

  modelsData.forEach(group => scene.add(group));

  // // TO_DO: deal with loading bar UI ---
  progress?.remove();
  spinner?.remove();

  // // TO_DO: init 3D related UI <start-continue-restart Button> ---
  showOverlay();
  // if (startBtn) startBtn.addEventListener('click', startAnim);
  // container?.appendChild(startBtn);

  // // TO_DO: start the loop/animate/renderer.render BUT wait for the button to start the camera meove etc.
  // renderer.render(scene, camera);
  
}

manager.onProgress = (_url, itemsLoaded, _itemsTotal) => {
  // console.log(`loaded: ${itemsLoaded}/${itemsTotal}`);
  // if (progress) progress.style.width = `${(ratio * 300) - 80 }px`;
  progress!.innerHTML = `${itemsLoaded} / 459`;
}

// manager.onError = (url) => console.log('error loading ' + url);



// --------- LOAD MODELS AND INIT UI ---------

// let loadmodel: GLTF | null = null;

// const modelFormatter = (data: GLTF) => {          
//   // let model = data.scene.children[0];
//   let model = data.scene;
//   return model
// }
// const allModels = modelsData.map(data => modelFormatter(data));
// allModels.forEach(elem => scene.add(elem));

// --- THIS WORKS but ESNEXT issue !!!

// const modelFormatter = (dataArr: GLTF[]) => {          
//   let allModel = new Array;
//   dataArr.forEach(data => allModel.push(data.scene));
//   let filtered = dataArr.filter(e => e.scene.children[0].name === 'ice-cream');
//   const copyOne = filtered[0].scene.clone();
//   const copyTwo = filtered[0].scene.clone();
//   copyOne.position.set(398, 0, -484);
//   copyTwo.position.set(796, 0, -968);
//   allModel.push(copyOne, copyTwo);
//   // ???
//   // geometries.receiveShadow = true;
//   allModel.forEach(elem => scene.add(elem));
// }


const loader = new GLTFLoader(manager);

// let modelsData = [];

// [...modelsData] = await Promise.all([
//   loader.loadAsync(modelUrls[0]),
//   loader.loadAsync(modelUrls[1]),
//   loader.loadAsync(modelUrls[2]),
//   loader.loadAsync(modelUrls[3]),
//   loader.loadAsync(modelUrls[4]),
//   loader.loadAsync(modelUrls[5]),
//   loader.loadAsync(modelUrls[6]),
//   loader.loadAsync(modelUrls[7]),
//   loader.loadAsync(modelUrls[8])
// ]);

// const modelData1 = await loader.loadAsync(modelUrls[0]);

// modelFormatter(modelsData);


// --- This works as well
let modelsData: Group[] = [];

modelUrls.forEach(e => {
  loader.load(e, gltf => {
    modelsData.push(gltf.scene)
  })
});
// --- until here and loader complete


// loader.load(modelUrls[0], gltf => scene.add(gltf.scene));
// loader.load(modelUrls[1], gltf => scene.add(gltf.scene));
// loader.load(modelUrls[2], gltf => scene.add(gltf.scene));
// loader.load(modelUrls[3], gltf => scene.add(gltf.scene));
// loader.load(modelUrls[4], gltf => scene.add(gltf.scene));
// loader.load(modelUrls[5], gltf => scene.add(gltf.scene));
// loader.load(modelUrls[6], gltf => scene.add(gltf.scene));
// loader.load(modelUrls[7], gltf => scene.add(gltf.scene));
// loader.load(
//   modelUrls[8],
//   gltf => {
//     let gltfScene = gltf.scene;
//     scene.add(gltfScene)
//     const copyOne = gltfScene.clone();
//     const copyTwo = gltfScene.clone();
//     copyOne.position.set(398, 0, -484);
//     copyTwo.position.set(796, 0, -968);
//     scene.add(copyOne, copyTwo)
//   },
//   xhr => console.log((xhr.loaded / xhr.total * 100) + '% loaded'),
//   _error => console.log('model load error')
// );
