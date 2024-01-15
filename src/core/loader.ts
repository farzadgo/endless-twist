const modelUrls = [
  'https://res.cloudinary.com/dd3tumnu6/image/upload/v1676469245/tender-models/1_speicher_skm70j.glb',
  'https://res.cloudinary.com/dd3tumnu6/image/upload/v1676469245/tender-models/2_speicher_tayjkv.glb',
  'https://res.cloudinary.com/dd3tumnu6/image/upload/v1676461879/tender-models/3_promenade_lys9gr.glb',
  'https://res.cloudinary.com/dd3tumnu6/image/upload/v1676461878/tender-models/3_cross_svreqc.glb',
  'https://res.cloudinary.com/dd3tumnu6/image/upload/v1676461877/tender-models/4_hafen_jw8cvs.glb',
  'https://res.cloudinary.com/dd3tumnu6/image/upload/v1676461881/tender-models/5_kellogs_uggrea.glb',
  'https://res.cloudinary.com/dd3tumnu6/image/upload/v1676461880/tender-models/5_coffee_zwfzq8.glb',
  'https://res.cloudinary.com/dd3tumnu6/image/upload/v1676461878/tender-models/6_sand_trcsgp.glb',
];
const doublingUrl = 'https://res.cloudinary.com/dd3tumnu6/image/upload/v1676461879/tender-models/7_cream_g2rnvt.glb';


import { LoadingManager } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { scene } from '../core/renderer';
import { initGUIonLoad, progressDiv } from './gui';


export const loadModels = () => {

  // --------- loading manager ---------
  const manager = new LoadingManager();

  manager.onLoad = () => {
    console.log("Loading complete!");
    // modelsData.forEach(group => scene.add(group));
    
    // --- handle GUI on load ---
    initGUIonLoad();
  }

  manager.onProgress = (_url, itemsLoaded, _itemsTotal) => {
    // console.log(`loaded: ${itemsLoaded}/${itemsTotal}`);
    // if (progress) progress.style.width = `${(ratio * 300) - 80 }px`;
    progressDiv!.innerHTML = `${itemsLoaded} / 459`;
  }

  manager.onError = (url) => console.log('error loading ' + url);

  // --------- standard loaders ---------
  const loader = new GLTFLoader(manager);

  loader.load(modelUrls[0], gltf => scene.add(gltf.scene));
  loader.load(modelUrls[1], gltf => scene.add(gltf.scene));
  loader.load(modelUrls[2], gltf => scene.add(gltf.scene));
  loader.load(modelUrls[3], gltf => scene.add(gltf.scene));
  loader.load(modelUrls[4], gltf => scene.add(gltf.scene));
  loader.load(modelUrls[5], gltf => scene.add(gltf.scene));
  loader.load(modelUrls[6], gltf => scene.add(gltf.scene));
  loader.load(modelUrls[7], gltf => scene.add(gltf.scene));

  loader.load(
    doublingUrl,
    gltf => {
      const object = gltf.scene;
      scene.add(object);
      const copyOne = object.clone();
      const copyTwo = object.clone();
      copyOne.position.set(398, 0, -484);
      copyTwo.position.set(796, 0, -968);
      scene.add(copyOne, copyTwo)
    }
  );

}


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


// --------- COLLECTIVE WIREFRAME MODELS ---------

// const wireMaterial = new MeshBasicMaterial({ color: 0xFF4500, wireframe: true });

// // let modelsData: THREE.Group[] = [];
// modelUrls.forEach(e => {
//   loader.load(e, gltf => {
//     // modelsData.push(gltf.scene)
//     const object = gltf.scene;
//     object.traverse((node) => {
//       if (!(<THREE.Mesh> node).isMesh) return;
//       (<THREE.Mesh> node).material = wireMaterial;
//     });
//     scene.add(object)
//   })
// });

// loader.load(
//   doublingUrl,
//   gltf => {
//     const object = gltf.scene;
//     // scene.add(object);
//     // let object = gltf.scene.children[0];
//     object.traverse((node) => {
//       if (!(<THREE.Mesh> node).isMesh) return;
//       // console.log((<THREE.Mesh> node));
//       // (<THREE.Mesh> node).material.wireframe = true;
//       (<THREE.Mesh> node).material = wireMaterial;
//       scene.add(object);
//     });
//     const copyOne = object.clone();
//     const copyTwo = object.clone();
//     copyOne.position.set(398, 0, -484);
//     copyTwo.position.set(796, 0, -968);
//     scene.add(copyOne, copyTwo)
//   },
//   // xhr => console.log((xhr.loaded / xhr.total * 100) + '% loaded'),
//   // _error => console.log('model load error')
// );