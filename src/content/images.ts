import { ImageDataObject } from '../content/types';

// --------- IMPORT LOCAL IMAGES ---------

import render_01 from './assets/01-render-cJustus-1.jpg';
import render_02 from './assets/01-render-cJustus-2.jpg';
import render_03 from './assets/01-render-cJustus-3.jpg';
import render_04 from './assets/01-render-cJustus-4.jpg';
import render_05 from './assets/01-render-cJustus-5.jpg';
import render_06 from './assets/01-render-cJustus-6.jpg';
import render_07 from './assets/01-render-cJustus-7.jpg';
import render_08 from './assets/01-render-cJustus-8.jpg';
import render_09 from './assets/01-render-cJustus-9.jpg';
import render_10 from './assets/01-render-cJustus-10.jpg';
import render_11 from './assets/01-render-cJustus-11.jpg';
import archihand from './assets/04-architect-justus.jpg';
import museum_fun_1 from './assets/07-hafenmuseum-Daniela-Buchholz-03.jpg';
import museum_fun_2 from './assets/08-hafenmuseum-Daniela-Buchholz-02.jpg';
import museum_fun_3 from './assets/09-hafenmuseum-Daniela-Buchholz-01.jpg';
import hafen_storch from './assets/06-hafen-Brockmoeller-Kulturhaus-Walle.jpg';
import museum_master from './assets/13-master.jpg';
import postcard_render_1 from './assets/14-postcard-reuse.jpg'; 
import landvalue from './assets/16-landlord-henry-geoge.jpg';
import fabric_1 from './assets/18-fabric-ation.jpg';
import fabric_2 from './assets/19-fabric-ation.jpg';
import fabric_3 from './assets/20-fabric-ation.jpg';
import watersand_1 from './assets/22-water-sand.jpg';
import watersand_2 from './assets/23-water-sand.jpg';
import sand_fill_1 from './assets/24-sand-fill.jpg';
import sand_fill_2 from './assets/25-sand-fill.jpg';
import seehausen_1 from './assets/Seehausen-2.jpg';
import seehausen_2 from './assets/Seehausen-3.jpg';
import seehausen_3 from './assets/Seehausen-4.jpg';
import seehausen_4 from './assets/Seehausen-5.jpg';
import seehausen_5 from './assets/Seehausen-6.jpg';
import seehausen_6 from './assets/Seehausen-8.jpg';
import postcard_render_2 from './assets/27-postcard-europa.jpg';
import postcard_render_3 from './assets/28-postcard-unreal.jpg';
import i_wonder_text from './assets/conversation-01.png';
import as_i_walk_text from './assets/conversation-02.png';
import this_area_text from './assets/conversation-03.png';


// --------- CREATE IMAGE DATA ARRAY ---------

export const importedImages: ImageDataObject[] = [

  {image: i_wonder_text, t1: 12, t2: 42},
  
  // --- ARCHITECTURE // 54"
  {image: render_01, t1: 225, t2: 235},
  {image: render_02, t1: 229, t2: 239},
  {image: render_03, t1: 233, t2: 243},
  {image: render_04, t1: 237, t2: 247},
  {image: render_05, t1: 241, t2: 251},
  {image: render_06, t1: 245, t2: 255},
  {image: render_07, t1: 249, t2: 259},
  {image: render_08, t1: 253, t2: 263},
  {image: render_09, t1: 257, t2: 267},
  {image: render_10, t1: 261, t2: 271},
  {image: render_11, t1: 265, t2: 275},
  {image: archihand, t1: 269, t2: 279},
  
  // --- HAFENMUSEUM // 35"
  {image: museum_fun_1, t1: 321, t2: 350},
  {image: museum_fun_2, t1: 328, t2: 352},
  {image: museum_fun_3, t1: 334, t2: 354},
  {image: hafen_storch, t1: 339, t2: 356},
  // 45"
  {image: museum_master, t1: 437, t2: 467},
  {image: postcard_render_1, t1: 455, t2: 472},
  {image: postcard_render_2, t1: 463, t2: 477},
  {image: postcard_render_3, t1: 471, t2: 482},
  
  {image: landvalue, t1: 490, t2: 515},
  
  // --- CONSTRUCTION // 20"
  {image: fabric_1, t1: 601, t2: 617},
  {image: fabric_2, t1: 606, t2: 619},
  {image: fabric_3, t1: 611, t2: 621},
  // 28"
  {image: watersand_1, t1: 638, t2: 653},
  {image: watersand_2, t1: 644, t2: 658},
  {image: sand_fill_1, t1: 647, t2: 662},
  {image: sand_fill_2, t1: 655, t2: 666},
  // 39"
  {image: seehausen_1, t1: 705, t2: 720},
  {image: seehausen_2, t1: 709, t2: 723},
  {image: seehausen_3, t1: 713, t2: 726},
  {image: seehausen_4, t1: 717, t2: 729},
  {image: seehausen_5, t1: 721, t2: 732},
  {image: seehausen_6, t1: 725, t2: 735},

  {image: as_i_walk_text, t1: 738, t2: 784},

  {image: this_area_text, t1: 988, t2: 1030}
]


// --------- METHODS ---------

const genID = () => {
  let uuid = Math.random().toString(36).slice(-6);
  return uuid
}

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getPosDims = () => {
  let wWidth = window.innerWidth;
  let wHeight = window.innerHeight;
  const width = randomIntFromInterval(wWidth * 0.3, wWidth * 0.38);
  const widthRange: number = wWidth - (width * 1.2);
  const heightRange: number = wHeight - 600;
  const xPos = (Math.random() * widthRange) + (width * 0.1);
  const yPos = Math.random() * heightRange;

  return {
    width, xPos, yPos
  }
}


const createImageElement = (data: ImageDataObject) => {
  const imageContainer: HTMLDivElement = document.createElement('div');
  imageContainer.classList.value = 'modal';
  
  imageContainer.style.left = `${getPosDims().xPos}px`;
  imageContainer.style.top = `${getPosDims().yPos}px`;
  imageContainer.style.width = `${getPosDims().width}px`;
  imageContainer.style.opacity = '0';
  
  const imageElement: HTMLImageElement = document.createElement('img');
  imageElement.style.width = '100%';
  imageElement.loading = 'lazy';
  imageElement.src = data.image;
  
  imageContainer.setAttribute('id', genID());
  imageContainer.appendChild(imageElement);
  
  return {
    container: imageContainer,
    image: imageElement
  }
}


// --------- EXPORT IMAGE ELEMENTS ---------

export const images: any = [];

importedImages.forEach(dt => {
  return images.push({
    elements: createImageElement(dt),
    data: dt
  });
});


export const outroImages: any = [];

importedImages.forEach(dt => {  
  // FILTERING TEXT IMAGES OUT
  if (dt.t1 !== 12 && dt.t1 !== 742 && dt.t1 !== 1030) {
    return outroImages.push({ elements: createImageElement(dt) })
  }
});
