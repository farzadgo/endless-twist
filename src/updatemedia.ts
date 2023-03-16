import { container } from './main';

// --- Photo imports (local)
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
import museum_master from './images/13-master.jpg';
import postcard_render_1 from './images/14-postcard-reuse.jpg'; 
import landvalue from './images/16-landlord-henry-geoge.jpg';
// import containerPlus from './images/17-container-A.jpg';

import fabric_1 from './images/18-fabric-ation.jpg';
import fabric_2 from './images/19-fabric-ation.jpg';
import fabric_3 from './images/20-fabric-ation.jpg';
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

// import postcard_beach from './images/26-postcard-beach.jpg';
import postcard_render_2 from './images/27-postcard-europa.jpg';
import postcard_render_3 from './images/28-postcard-unreal.jpg';

import i_wonder_text from './images/conversation-01.png';
import as_i_walk_text from './images/conversation-02.png';
import this_area_text from './images/conversation-03.png';


// --- Audio imports (URLs)
const audioUrl = 'https://cloud.disorient.xyz/s/GJ7Cd5ABkJmNAig/download/web-endless-twist_final.mp3';


// --- Video imports (URLs)
const topViewConstructing = 'https://cloud.disorient.xyz/s/KfpKkN4BRexJcP8/download/overthesee_1.mp4';
const walkingVideo = 'https://cloud.disorient.xyz/s/FpTEH6gHHpeN2Yf/download/they_are_short_720.mov';
// const lateralMoveVideo = 'https://cloud.disorient.xyz/s/ZpRkGx679QNmdJ6/download/overthesee_2.mov';
// const skyMoveVideo = 'https://cloud.disorient.xyz/s/EjKBoRctyZZgg2T/download/overthesee_3.mov';


const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getPosDims = () => {
  // const width = randomIntFromInterval(650, 800);
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

// class Timeout {
//   time: number;
//   callback: TimerHandler;
//   timeout: number | undefined;
//   startedTime: number = 0;
//   constructor(callbackFunction: TimerHandler, time: number) {
//     this.time = time; 
//     this.callback = callbackFunction; 
//     this.run(); // It will be automatically invoked when the constructor is run
//   }
//   run() {
//     this.startedTime = new Date().getTime();
//     if (this.time > 0) {
//       this.timeout = setTimeout(this.callback, this.time); // Timeout must be set if this.time is greater than 0
//     }
//   }
//   pause() {
//     let currentTime = new Date().getTime();
//     this.time = this.time - (currentTime - this.startedTime); // The time that was given when initializing the timeout is subtracted from the amount of time spent
//     clearTimeout(this.timeout);
//   }
// }


// --------- SINGLE AUDIO HANDLING ---------

// let audioStarted = false;
let audioEnded = false;

const audioElement = document.createElement('audio');
// audioElement.id = 'audio-player';
audioElement.controls = false;
audioElement.src = audioUrl;
audioElement.loop = false;


// audioElement?.addEventListener('playing', () => {
//   audioStarted = true;
// });

// audioElement?.addEventListener('play', () => {
//   console.log('audio play');
//   audioStarted = true;
// });

// audioElement?.addEventListener('pause', () => {
//   console.log('audio pause');
// });

audioElement?.addEventListener('ended', () => {
  console.log('audio ended');
  audioEnded = true;
});

// videoElement?.addEventListener('playing', () => {
//   console.log('video playing')
//   videoStarted = true;
// });


export const updateAudio = (elapsed: number) => {
  // container?.appendChild(audioElement);
  // console.log(audioElement.volume);
  if (audioEnded) {
    audioElement.pause();
    audioElement.remove();
    // audioElement.removeAttribute('src');
    // audioElement.load();
  }
  if (elapsed === 0) {
    audioElement.currentTime = 0;
  }
}

export const pauseAudio = () => {
  let intervalID: number;
  intervalID = setInterval(() => {
    // console.log(audioElement.volume);
    if (audioElement.volume > 0.1) {
      audioElement.volume -= 0.1;
    }
    if (audioElement.volume < 0.1) {
      audioElement.volume = 0;
      audioElement.pause();
      clearInterval(intervalID);
    }
  }, 100);
}

export const playAudio = () => {
  audioElement.play();
  audioElement.volume = 0;
  let intervalID: number;
  intervalID = setInterval(() => {
    // console.log((Math.round(audioElement.volume * 10) / 10));
    if (audioElement.volume < 0.9) {
      audioElement.volume += 0.1;
    }
    if (audioElement.volume > 0.9) {
      audioElement.volume = 1;
      clearInterval(intervalID);
    }
  }, 100);
}


document.addEventListener('keyup', event => {
  if (event.code === 'KeyM') {
    if (!audioElement.muted) {
      audioElement.muted = true;
    } else {
      audioElement.muted = false;
    }
  }
});


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


const videos = [createVideoElem(0), createVideoElem(1)];
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
  videoHandler(0, elapsed, 530, topViewConstructing, running);
  videoHandler(1, elapsed, 710, walkingVideo, running);
  // videoHandler(2, elapsed, 970, lateralMoveVideo, running);
  // videoHandler(3, elapsed, 986, skyMoveVideo, running);
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
  imageHandler(elapsed, 12, 42, i_wonder_text);

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
  // 35 seconds
  imageHandler(elapsed, 321, 350, museum_fun_1);
  imageHandler(elapsed, 328, 352, museum_fun_2);
  imageHandler(elapsed, 334, 354, museum_fun_3);
  imageHandler(elapsed, 339, 356, hafen_storch);

  // 45 seconds
  imageHandler(elapsed, 437, 467, museum_master);
  imageHandler(elapsed, 455, 472, postcard_render_1);
  // imageHandler(elapsed, 767, 793, postcard_beach);
  imageHandler(elapsed, 463, 477, postcard_render_2);
  imageHandler(elapsed, 471, 482, postcard_render_3);

  imageHandler(elapsed, 490, 520, landvalue);

  // --- CONSTRUCTION
  // 20 seconds
  imageHandler(elapsed, 601, 617, fabric_1);
  imageHandler(elapsed, 606, 619, fabric_2);
  imageHandler(elapsed, 611, 621, fabric_3);

  // 28 seconds
  imageHandler(elapsed, 638, 653, watersand_1);
  imageHandler(elapsed, 644, 658, watersand_2);
  imageHandler(elapsed, 647, 662, sandfill_1);
  imageHandler(elapsed, 655, 666, sandfill_2);
  
  // 39 seconds
  imageHandler(elapsed, 686, 710, seehausen_1);
  imageHandler(elapsed, 692, 713, seehausen_2);
  imageHandler(elapsed, 698, 716, seehausen_3);
  imageHandler(elapsed, 704, 719, seehausen_4);
  imageHandler(elapsed, 710, 722, seehausen_5);
  imageHandler(elapsed, 716, 725, seehausen_6);

  // in the middle of sidewalk video
  imageHandler(elapsed, 742, 776, as_i_walk_text);

  bringAllImages(elapsed);

  imageHandler(elapsed, 1030, 1060, this_area_text);
}


const imageHandler = (elapsed: number, t1: number, t2: number, uri: string) => {
  
  const imageContainer = document.createElement('div');
  imageContainer.classList.value = 'modal';

  imageContainer.style.left = `${getPosDims().xPos}px`;
  imageContainer.style.top = `${getPosDims().yPos}px`;
  imageContainer.style.width = `${getPosDims().width}px`;
  imageContainer.style.opacity = '0';

  const imageElement = document.createElement('img');
  // const imageElement = new Image(800, 600);
  // imageElement.width = 800;
  // imageElement.classList.value = 'modal-image';
  imageElement.style.width = '100%';
  imageElement.loading = 'lazy';

  imageContainer.appendChild(imageElement);

  // const removeElement = () => {
  //   const selectedContainer = document.querySelector<HTMLDivElement>('.modal');
  //   selectedContainer!.style.opacity = '0';
  //   setTimeout(() => {
  //     selectedContainer?.remove();
  //     // return
  //   }, 1000);
  // }

  if (elapsed === t1) {
    console.log(`${t1} show image`);
    // let uuid = Math.random().toString(36).slice(-6);
    // imageContainer.setAttribute('id', uuid);
    imageElement.src = uri;
    container?.appendChild(imageContainer);
    imageElement.onload = () => {
      imageContainer.style.opacity = '0.88';
    }
    // setTimeout(() => removeElement(), dur * 1000);
    // const remover = new Timeout(removeElement, dur * 1000);
    // remover.pause();
    // remover.run();
  }

  if (elapsed === t2) {
    console.log(`${t2} gone image`);
    const selectedContainer = document.querySelector<HTMLDivElement>('.modal');
    selectedContainer!.style.opacity = '0';
    setTimeout(() => {
      selectedContainer?.remove();
      return
    }, 1000);
  }
}


const bringAllImages = (elapsed: number) => {
  const allImages = [
    render_1, render_2, render_3, render_4, render_5, render_6,
    render_7, render_8, render_9, render_10, render_11, archihand,
    museum_fun_1, museum_fun_2, museum_fun_3, hafen_storch,
    museum_master, postcard_render_1, postcard_render_2,
    postcard_render_3, landvalue, fabric_1, fabric_2, fabric_3,
    watersand_1, watersand_2, sandfill_1, sandfill_2
  ];

  allImages.forEach((e, i) => {
    imageHandler(elapsed, i + 920, i + 923, e);
  });

  // allImages.forEach((e, i) => {
  // imageHandler(elapsed, (i * 0.5) + 5, (i * 0.5) + 7, e);
  // imageHandler(elapsed, i + 5, (36 + (i * 0.2)), e);
  // });
}


// let imageOne: HTMLEmbedElement | null = null;
// class FloatingImage {
//   start: number;
//   duration: number;
//   constructor(start: number, duration: number) {
//     this.start = start,
//     this.duration = duration
//   }
//   get elem() {
//     return 
//   }
// }