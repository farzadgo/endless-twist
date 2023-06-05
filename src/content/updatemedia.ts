import { subtitleData } from './subtitles';
import { images, outroImages, getPosDims } from './images';

// --- AUDIO URLs ---
const audioUrl = 'https://cloud.disorient.xyz/s/GJ7Cd5ABkJmNAig/download/web-endless-twist_final.mp3';

// --- Video URLs ---
const topViewConstructing = 'https://cloud.disorient.xyz/s/KfpKkN4BRexJcP8/download/overthesee_1.mp4';
const walkingVideo = 'https://cloud.disorient.xyz/s/FpTEH6gHHpeN2Yf/download/they_are_short_720.mov';
// const lateralMoveVideo = 'https://cloud.disorient.xyz/s/ZpRkGx679QNmdJ6/download/overthesee_2.mov';
// const skyMoveVideo = 'https://cloud.disorient.xyz/s/EjKBoRctyZZgg2T/download/overthesee_3.mov';


// --------- SUBTITLE HANDLING ---------

const webGLContainer = document.getElementById('webgl-container');
export const subtitleElement = document.createElement('p');
subtitleElement.setAttribute('id', 'subtitle');
webGLContainer?.appendChild(subtitleElement);


interface DataObject {
  time: number;
  body: string;
}

function updateSubtitle() {
  const currentTime = audioElement.currentTime;
  let selectedDataItem: DataObject | undefined;
  let itemFound = false;

  for (const item of subtitleData) {
    if (currentTime >= item.time) {
      selectedDataItem = item;
      itemFound = true;
    } else {
      break;
    }
  }

  if (itemFound) {
    const timeDifference = currentTime - selectedDataItem!.time;
    if (timeDifference <= 10) {
      subtitleElement.innerHTML = selectedDataItem!.body;
    } else {
      subtitleElement.innerHTML = '';
    }
  } else {
    subtitleElement.innerHTML = '';
  }
}



// ------------------ AUDIO HANDLING ------------------

// TODO: stop elapsed and camera movement if true
export let loadingAudio = true;

let audioEnded = false;

export const audioElement = document.createElement('audio');
// audioElement.id = 'audio-player';
audioElement.controls = false;
audioElement.src = audioUrl;
audioElement.loop = false;


// audioElement?.addEventListener('play', () => console.log('audio started'));
// audioElement?.addEventListener('pause', () => console.log('audio paused'));
// WORKS LIKE `updateAudio HAS ELAPSED TIME`
// audioElement?.addEventListener('timeupdate', updateSubtitle);

audioElement?.addEventListener('playing', () => {
  loadingAudio = false;
});

audioElement?.addEventListener('waiting', () => {
  loadingAudio = true;
});

audioElement?.addEventListener('ended', () => {
  console.log('audio ended');
  audioEnded = true;
});


export const updateAudio = (elapsed: number) => {
  // console.log(audioElement.volume, audioElement.duration);
  // console.log(`currentTime: ${audioElement.currentTime} - ellapsed: ${elapsed}`);
  if (audioEnded) {
    audioElement.pause();
    audioElement.remove();
    // audioElement.removeAttribute('src');
    // audioElement.load();
  }
  if (elapsed === 0) {
    audioElement.currentTime = 0;
  }
  updateSubtitle();
}

export const pauseAudio = () => {
  let start = Date.now();
  
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

      let delay = (Date.now() - start) * 0.001;
      // console.log(delay);
      audioElement.currentTime -= delay;
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



// ------------------ VIDEO HANDLING ------------------

// interface Video {
//   id: number;
//   element: HTMLMediaElement;
//   started: boolean
// }

// interface Videos extends Array<Video>{}


// videoElement?.addEventListener('playing', () => {
//   console.log('video playing')
//   videoStarted = true;
// });

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


export const updateVideos = (elapsed: number, running: boolean) => {
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
      webGLContainer?.appendChild(element);
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



// ------------------ IMAGE HANDLING ------------------

const getShuffledArr = (arr: any[]) => {
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr
}

const showImageContainer = (elem: HTMLDivElement) => {
  webGLContainer?.appendChild(elem);
  setTimeout(() => {
    elem.style.opacity = '0.87';
  }, 50);
}

const hideImageContainer = (id: string) => {
  // const selectedContainer = document.querySelector<HTMLDivElement>('.modal');
  const selectedContainer = document.getElementById(id);
  selectedContainer!.style.opacity = '0';
  setTimeout(() => {
    selectedContainer?.remove();
    return
  }, 1000);
}


const shuffledImages = getShuffledArr(outroImages);
let shuffleStart = 920;
let shuffledLength = shuffledImages.length;


export const updateImages = (elapsed: number) => {
  
  images.forEach((imageObj: any) => {
    const { element, data } = imageObj;
    const { t1, t2 } = data;
    
    if (elapsed >= t1 && elapsed <= t2) {
      if (!element.parentElement) {
        // containerElem?.appendChild(element);
        showImageContainer(element);
      }
    } else {
      if (element.parentElement) {
        // element.parentElement.removeChild(element);
        hideImageContainer(element.id);
      }
    }
  });

  shuffledImages.forEach((imageObj: any, i: number) => {
    const { element } = imageObj;
    // COULD BE (elapsed > 2 + i && elapsed < 5 + i)
    if (elapsed > shuffleStart + i && elapsed < (shuffleStart + shuffledLength) + (i * 0.1)) {
      if (!element.parentElement) {
        showImageContainer(element);
      }
    } else {
      if (element.parentElement) {
        hideImageContainer(element.id);
      }
    }
  });

}