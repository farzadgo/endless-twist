import { container } from './main';
const audioUrl = 'https://cloud.disorient.xyz/s/GJ7Cd5ABkJmNAig/download/web-endless-twist_final.mp3';

// --- Photo imports
import render_1 from './images/01-render-cJustus-1.jpg';
import render_2 from './images/01-render-cJustus-2.jpg';
import render_3 from './images/01-render-cJustus-3.jpg';
import render_4 from './images/01-render-cJustus-4.jpg';
import render_5 from './images/01-render-cJustus-5.jpg';
import render_6 from './images/01-render-cJustus-6.jpg';
import render_7 from './images/01-render-cJustus-7.jpg';
import render_8 from './images/01-render-cJustus-8.jpg';
import render_9 from './images/01-render-cJustus-9.jpg';
import render_10 from './images/01-render-cJustus-10.jpg';
import render_11 from './images/01-render-cJustus-11.jpg';
import archihand from './images/04-architect-justus.jpg';

import museum_fun_1 from './images/07-hafenmuseum-Daniela-Buchholz-03.jpg';
import museum_fun_2 from './images/08-hafenmuseum-Daniela-Buchholz-02.jpg';
import museum_fun_3 from './images/09-hafenmuseum-Daniela-Buchholz-01.jpg';
import hafen_storch from './images/06-hafen-Brockmoeller-Kulturhaus-Walle.jpg';
// import museum_web_1 from './images/10-hafenmuseum-architect.jpg';
// import museum_web_2 from './images/11-hafenmuseum-future.jpg';
// import museum_devplan from './images/12-hafenmuseum-master-alt.jpg';
import museum_master from './images/13-master.jpg';
import postcard_render_1 from './images/14-postcard-reuse.jpg'; 
// import postcard_landmark from './images/15-postcard-landmark.jpg';
import landvalue from './images/16-landlord-henry-geoge.jpg';
// import containerPlus from './images/17-container-A.jpg';

import fabric_1 from './images/18-fabric-ation.jpg';
import fabric_2 from './images/19-fabric-ation.jpg';
import fabric_3 from './images/20-fabric-ation.jpg';
// import land_sand from './images/21-land-sand.jpg';
import watersand_1 from './images/22-water-sand.jpg';
import watersand_2 from './images/23-water-sand.jpg';
import sandfill_1 from './images/24-sand-fill.jpg';
import sandfill_2 from './images/25-sand-fill.jpg';

import seehausen_1 from './images/Seehausen-2.jpg';
import seehausen_2 from './images/Seehausen-3.jpg';
import seehausen_3 from './images/Seehausen-4.jpg';
import seehausen_4 from './images/Seehausen-5.jpg';
import seehausen_5 from './images/Seehausen-6.jpg';
import seehausen_6 from './images/Seehausen-8.jpg';

import postcard_beach from './images/26-postcard-beach.jpg';
import postcard_render_2 from './images/27-postcard-europa.jpg';
import postcard_render_3 from './images/28-postcard-unreal.jpg';
// import london_bremen from './images/29-place-holder.jpg';
// import insideout_1 from './images/30-inside-out.jpg';
// import insideout_2 from './images/31-inside-out.jpg';
// import einmal_alles from './images/34-fabric.jpg';
import conversation_farzi_1 from './images/conversation-01.png';
// import conversation_farzi_2 from './images/conversation-02.png';
import conversation_gabi from './images/conversation-03.png';


// --- Video imports
// s: 512
const topViewConstructing = 'https://cloud.disorient.xyz/s/KfpKkN4BRexJcP8/download/overthesee_1.mp4';
// s: 
const laterlMove = 'https://cloud.disorient.xyz/s/ZpRkGx679QNmdJ6/download/overthesee_2.mov';
// s: 
const skyMove = 'https://cloud.disorient.xyz/s/EjKBoRctyZZgg2T/download/overthesee_3.mov';
// s: 891
const walkingVideo = 'https://cloud.disorient.xyz/s/FpTEH6gHHpeN2Yf/download/they_are_short_720.mov';



const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}


const getPosDims = () => {
  const width = randomIntFromInterval(650, 800);
  const widthRange: number = window.innerWidth - (width * 1.2);
  const heightRange: number = window.innerHeight - 600;
  const xPos = (Math.random() * widthRange) + (width * 0.1);
  const yPos = Math.random() * heightRange;

  return {
    width, xPos, yPos
  }
}


// --------- SINGLE AUDIO HANDLING ---------

let audioStarted = false;
let audioEnded = false;

const audioElement = document.createElement('audio');
// audioElement.id = 'audio-player';
audioElement.controls = false;
audioElement.src = audioUrl;
audioElement.loop = false;


audioElement?.addEventListener('playing', () => {
  console.log('audio playing');
  audioStarted = true;
});

// audioElement?.addEventListener('pause', () => console.log('audio paused'));

audioElement?.addEventListener('ended', () => {
  console.log('audio ended');
  audioEnded = true;
});

// videoElement?.addEventListener('playing', () => {
//   console.log('video playing')
//   videoStarted = true;
// });


export const handleAudios = (elapsed: number, running: boolean) => {
  container?.appendChild(audioElement);
  if (running) {
    if (audioStarted && !audioEnded) {
      audioElement.play();
    }
    if (elapsed === 1 && !audioStarted) {
      audioElement.play();
    }
  }
  if (!running) {
    audioElement.pause();
  }
  if (running && audioEnded) {
    audioElement.remove();
    // audioElement.removeAttribute('src');
    // audioElement.load();
  }
}



// --------- VIDEO ELEMENTS ---------

// interface Video {
//   id: number;
//   element: HTMLMediaElement;
//   started: boolean
// }

// interface Videos extends Array<Video>{}


const createVideoElem = (id: number) => {
  const videoElement = document.createElement('video');
  videoElement.id = 'video-player';
  videoElement.width = getPosDims().width;
  videoElement.style.left = `${getPosDims().xPos}px`;
  videoElement.style.top = `${getPosDims().yPos}px`;
  // videoElement.style.width = `${getPosDims().width}px`;

  return {
    id: id,
    element: videoElement,
    started: false,
    ended: false
  }
}


const videos = [createVideoElem(0), createVideoElem(1), createVideoElem(2), createVideoElem(3)];
// to do with map()...
// videos.map((e, i) => createVideoElem(i));

videos.forEach(e => e.element.addEventListener('playing', () => {
  // console.log('video playing');
  e.started = true;
}));

videos.forEach(e => e.element.addEventListener('ended', () => {
  // console.log('video ended');
  e.ended = true;
}));


export const handleVideos = (elapsed: number, running: boolean) => {
  videoHandler(0, elapsed, 512, topViewConstructing, running);
  videoHandler(1, elapsed, 891, walkingVideo, running);
  videoHandler(2, elapsed, 970, laterlMove, running);
  videoHandler(3, elapsed, 986, skyMove, running);
}



const videoHandler = (id: number, elapsed: number, t1: number, uri: string, running: boolean) => {
  let element = videos[id].element;

  if (running && !videos[id].ended) {
    if (videos[id].started) {
      element.play();
    }
    if (elapsed === t1 && !videos[id].started) {
      element.src = uri;
      element.play();
      container?.appendChild(element);
      setTimeout(() => {
        element.style.opacity = '1';
      }, 500);
    }
  }
  
  if (running && videos[id].ended) {
    element.remove();
  }

  if (!running) {
    element.pause();
  }
}



// --------- IMAGES ---------

export const handleImages = (elapsed: number) => {  
  imageHandler(elapsed, 17, 42, conversation_farzi_1);

  // --- ARCHITECTURE
  // 54 seconds
  imageHandler(elapsed, 225, 235, render_1);
  imageHandler(elapsed, 229, 239, render_2);
  imageHandler(elapsed, 233, 243, render_3);
  imageHandler(elapsed, 237, 247, render_4);
  imageHandler(elapsed, 241, 251, render_5);
  imageHandler(elapsed, 245, 255, render_6);
  imageHandler(elapsed, 249, 259, render_7);
  imageHandler(elapsed, 253, 263, render_8);
  imageHandler(elapsed, 257, 267, render_9);
  imageHandler(elapsed, 261, 271, render_10);
  imageHandler(elapsed, 265, 275, render_11);
  imageHandler(elapsed, 269, 279, archihand);

  // --- HAFENMUSEUM
  // 32 seconds
  imageHandler(elapsed, 321, 350, museum_fun_1);
  imageHandler(elapsed, 328, 352, museum_fun_2);
  imageHandler(elapsed, 334, 354, museum_fun_3);
  imageHandler(elapsed, 339, 356, hafen_storch);

  // 67 seconds
  imageHandler(elapsed, 437, 467, museum_master);
  imageHandler(elapsed, 455, 472, postcard_render_1);
  imageHandler(elapsed, 488, 503, landvalue);

  // --- PART TWO
  // 18 seconds
  imageHandler(elapsed, 601, 615, fabric_1);
  imageHandler(elapsed, 606, 617, fabric_2);
  imageHandler(elapsed, 611, 619, fabric_3);

  // 28 seconds
  imageHandler(elapsed, 638, 653, watersand_1);
  imageHandler(elapsed, 644, 658, watersand_2);
  imageHandler(elapsed, 647, 662, sandfill_1);
  imageHandler(elapsed, 655, 666, sandfill_2);

  // 45 seconds
  imageHandler(elapsed, 686, 716, seehausen_1);
  imageHandler(elapsed, 692, 719, seehausen_2);
  imageHandler(elapsed, 698, 722, seehausen_3);
  imageHandler(elapsed, 704, 725, seehausen_4);
  imageHandler(elapsed, 710, 728, seehausen_5);
  imageHandler(elapsed, 716, 731, seehausen_6);

  // 31 seconds
  imageHandler(elapsed, 761, 796, postcard_render_3);
  imageHandler(elapsed, 767, 794, postcard_beach);
  imageHandler(elapsed, 773, 792, postcard_render_2);

  imageHandler(elapsed, 885, 910, conversation_gabi);
}


const imageHandler = (elapsed: number, t1: number, t2: number, uri: string) => {

  const selectedContainer = document.querySelector('.modal');

  const imageContainer = document.createElement('div');
  imageContainer.classList.value = 'modal';
  imageContainer.style.left = `${getPosDims().xPos}px`;
  imageContainer.style.top = `${getPosDims().yPos}px`;
  imageContainer.style.width = `${getPosDims().width}px`;
  // imageContainer.style.transition = 'opacity 2s';
  // imageContainer.style.opacity = '0';

  const imageElement = document.createElement('img');
  // const imageElement = new Image(800, 600);
  // imageElement.width = 800;
  // imageElement.classList.value = 'modal-image';
  imageElement.style.width = '100%';
  imageElement.loading = 'lazy';

  imageContainer.appendChild(imageElement);

  if (elapsed === t1) {
    imageElement.src = uri;
    container?.appendChild(imageContainer);
    imageElement.onload = () => {
      setTimeout(() => {
        imageContainer.style.opacity = '1';
      }, 500);
    }
  }

  if (elapsed === t2) {
    // not working !!!
    imageContainer.style.opacity = '0';
    setTimeout(() => {
      selectedContainer?.remove();
      return
    }, 1000);
  }

}
