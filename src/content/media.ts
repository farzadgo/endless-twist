import { /* FORWARD_DURATION, */ DURATION_IN_SECONDS, getRunning, setElapsed } from '../main'
import { DataObject, Section, BaseVideo, OverlayVideo } from './types'
import { subtitleData } from './subtitles'
import { images, outroImages, getPosDims } from './images'
import { sections } from './sections'
import { camera, setFraction } from '../core/camera'

const webGLContainer = document.getElementById('webgl-container')


// --------- SUBTITLE HANDLING ---------

export const subtitleElement = document.createElement('p')
subtitleElement.setAttribute('id', 'subtitle')
webGLContainer?.appendChild(subtitleElement)


const updateSubtitle = () => {
  const currentTime = audioElement.currentTime
  let selectedDataItem: DataObject | undefined
  let itemFound = false

  for (const item of subtitleData) {
    if (currentTime >= item.time) {
      selectedDataItem = item
      itemFound = true
    } else {
      break
    }
  }

  if (itemFound) {
    const timeDifference = currentTime - selectedDataItem!.time
    if (timeDifference <= 10) {
      subtitleElement.innerHTML = selectedDataItem!.body
    } else {
      subtitleElement.innerHTML = ''
    }
  } else {
    subtitleElement.innerHTML = ''
  }
}



// ------------------ AUDIO HANDLING ------------------

const audioUrl = 'https://res.cloudinary.com/dd3tumnu6/video/upload/v1747574023/tender-audios/web-endless-twist_final_xzqyk6.mp3'

export let audioElapsed = 0

let loading = false
export const setLoading = (value: boolean) => loading = value
export const getLoading = (): boolean => loading

export const audioElement = document.createElement('audio')
// audioElement.controls = false
audioElement.crossOrigin = 'anonymous' // MUST come before .src
audioElement.src = audioUrl
audioElement.loop = false

const audioContext = new AudioContext()
const source = audioContext.createMediaElementSource(audioElement)
const gainNode = audioContext.createGain()
gainNode.gain.value = 1 

source.connect(gainNode).connect(audioContext.destination)

audioElement.addEventListener('ended', () => audioElement.pause())

audioElement.addEventListener('waiting', () => setLoading(true))

audioElement.addEventListener('seeking', () => setLoading(true))

audioElement.addEventListener('playing', () => setLoading(false))

audioElement.addEventListener('canplay', () => setLoading(false))

export const updateAudio = () => {
  audioElapsed = audioElement.currentTime
  updateSubtitle()
}

export const resetAudio = () => {
  audioElement.currentTime = 0
}

export const pauseAudio = async (): Promise<void> => {
  if (audioContext.state === "suspended") await audioContext.resume()

  const currentTime = audioContext.currentTime
  const fadeDuration = 0.5 // seconds

  gainNode.gain.cancelScheduledValues(currentTime)
  gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime)
  gainNode.gain.linearRampToValueAtTime(0, currentTime + fadeDuration)

  await new Promise(resolve => setTimeout(resolve, 500)) // wait for fade

  audioElement.pause()
}

export const playAudio = async (): Promise<void> => {
  if (audioContext.state === "suspended") await audioContext.resume()

  try {
    await audioElement.play()
  } catch (err) {
    console.warn("Audio play was interrupted", err)
    return
  }

  const currentTime = audioContext.currentTime
  const fadeDuration = 1.0 // seconds

  gainNode.gain.cancelScheduledValues(currentTime)
  gainNode.gain.setValueAtTime(0, currentTime)
  gainNode.gain.linearRampToValueAtTime(1, currentTime + fadeDuration)

  return new Promise(resolve => setTimeout(resolve, fadeDuration * 1000))
}

const playAudioIfCanPlay = async (): Promise<void> => {
  if (!getRunning()) return

  try {
    await new Promise<void>((resolve) => {
      const onCanPlay = () => {
        audioElement.removeEventListener('canplay', onCanPlay)
        resolve()
      }
      audioElement.addEventListener('canplay', onCanPlay)
    })
    if (!getRunning()) return

    await playAudio()
  } catch (err) {
    console.error("Error playing audio after canplay:", err)
  }
}

const jumpToSection = async (section: Section): Promise<void> => {
  setLoading(true)

  await pauseAudio()

  audioElement.currentTime = section.timeStamp
  
  setElapsed(section.timeStamp)
  setFraction(section.timeStamp / DURATION_IN_SECONDS)

  camera.rotation.set(
    section.lookVector.x,
    section.lookVector.y,
    section.lookVector.z
  )

  await playAudioIfCanPlay()
}

document.addEventListener('keyup', async (event) => {
  if (!getRunning()) return

  const section = sections.find(s => s.eventCode === event.code)
  if (section) {
    try {
      await jumpToSection(section)
    } catch (err) {
      console.error("Failed to jump to section", err)
    }
  }
})


// --- Audio debugging ---

// const events = [
//   'loadstart', 'progress', 'suspend', 'abort', 'error',
//   'emptied', 'stalled', 'loadedmetadata', 'loadeddata',
//   'canplay', 'canplaythrough', 'playing', 'waiting',
//   'seeking', 'seeked', 'pause', 'play', 'timeupdate',
//   'ended'
// ]

// events.forEach(eventName => {
//   audioElement.addEventListener(eventName, () => {
//     console.log(`[audio] Event: ${eventName} | currentTime: ${audioElement.currentTime.toFixed(2)}`)
//   })
// })


// --- Intro Audio playback ---

const introAudioContext = new AudioContext()
const introSoundUrl = 'https://res.cloudinary.com/dd3tumnu6/video/upload/v1747756269/tender-audios/endlesstwist-intro_la05y3.mp3'

let audioBuffer: AudioBuffer | null = null
let isIntroPlaying = false
let scheduleTimeout: ReturnType<typeof setTimeout> | null = null

export const getIntroPlaying = () => isIntroPlaying

const FADE_TIME = 2
const PLAY_INTERVAL = 7

type PlaybackNode = {
  source: AudioBufferSourceNode
  gain: GainNode
}
let activeNodes: PlaybackNode[] = []

const loadIntroSound = async () => {
  console.log('loading intro sound...')
  const response = await fetch(introSoundUrl)
  const arrayBuffer = await response.arrayBuffer()
  audioBuffer = await introAudioContext.decodeAudioData(arrayBuffer)
}

const playAudioInstance = () => {
  if (!audioBuffer || !isIntroPlaying) return

  const source = introAudioContext.createBufferSource()
  const gain = introAudioContext.createGain()

  source.buffer = audioBuffer
  source.connect(gain).connect(introAudioContext.destination)

  const now = introAudioContext.currentTime

  // Fade in
  gain.gain.setValueAtTime(0, now)
  gain.gain.linearRampToValueAtTime(1, now + FADE_TIME)

  // Fade out before the end
  gain.gain.setValueAtTime(1, now + audioBuffer.duration - FADE_TIME)
  gain.gain.linearRampToValueAtTime(0, now + audioBuffer.duration)

  source.start(now)
  source.stop(now + audioBuffer.duration)

  activeNodes.push({ source, gain })

  // Clean up after playback
  source.onended = () => {
    activeNodes = activeNodes.filter(n => n.source !== source)
  }

  // Schedule next
  scheduleTimeout = setTimeout(playAudioInstance, PLAY_INTERVAL * 1000)
}

export const startLayeredIntroAudio = async () => {
  if (!audioBuffer) await loadIntroSound()
  if (!isIntroPlaying) {
    isIntroPlaying = true
    playAudioInstance()
  }
}

export const pauseLayeredIntroAudio = async () => {
  isIntroPlaying = false
  if (scheduleTimeout) clearTimeout(scheduleTimeout)

  const now = introAudioContext.currentTime
  for (const { source, gain } of activeNodes) {
    gain.gain.cancelScheduledValues(now)
    gain.gain.setValueAtTime(gain.gain.value, now)
    gain.gain.linearRampToValueAtTime(0, now + FADE_TIME)
    source.stop(now + FADE_TIME)
  }
  activeNodes = []
}

// --- alternative audio fade in/out ---

// let introAudio: HTMLAudioElement

// introAudio = new Audio('')
// introAudio.loop = true
// fadeInAudio(introAudio)
// fadeOutAudio(introAudio)

// export const fadeOutAudio = (audio: HTMLAudioElement, duration: number = 1000) => {
//   const steps = 20
//   const stepTime = duration / steps
//   const volumeStep = audio.volume / steps
//   const fadeInterval = setInterval(() => {
//     if (audio.volume > volumeStep) {
//       audio.volume = Math.max(0, audio.volume - volumeStep)
//     } else {
//       audio.volume = 0
//       audio.pause()
//       audio.currentTime = 0
//       clearInterval(fadeInterval)
//     }
//   }, stepTime)
// }

// export const fadeInAudio = (audio: HTMLAudioElement, duration: number = 1000, targetVolume = 1) => {
//   const steps = 20
//   const stepTime = duration / steps
//   const volumeStep = targetVolume / steps
//   audio.volume = 0
//   audio.play()
//   const fadeInterval = setInterval(() => {
//     if (audio.volume < targetVolume - volumeStep) {
//       audio.volume = Math.min(targetVolume, audio.volume + volumeStep)
//     } else {
//       audio.volume = targetVolume
//       clearInterval(fadeInterval)
//     }
//   }, stepTime)
// }



// ------------------ VIDEO HANDLING ------------------

const baseVideos: BaseVideo[] = [
  {
    id: 'topViewConstructing',
    url: 'https://cloud.disorient.xyz/s/KfpKkN4BRexJcP8/download/overthesee_1.mp4',
    startTime: 527
  },
  {
    id: 'walkingVideo',
    url: 'https://cloud.disorient.xyz/s/FpTEH6gHHpeN2Yf/download/they_are_short_720.mov',
    startTime: 715
  }
]

const createVideoElem = (e: BaseVideo) => {
  const videoElement = document.createElement('video')
  videoElement.id = 'video-player'
  videoElement.width = getPosDims().width
  videoElement.style.left = `${getPosDims().xPos}px`
  videoElement.style.top = `${getPosDims().yPos}px`
  // videoElement.style.width = `${getPosDims().width}px`

  return {
    ...e,
    element: videoElement,
    started: false,
    ended: false
  } as OverlayVideo
}

const overlayVideos = baseVideos.map((e) => createVideoElem(e))

overlayVideos.forEach(e => e.element.addEventListener('playing', () => e.started = true))

overlayVideos.forEach(e => e.element.addEventListener('ended', () => e.ended = true))

export const updateVideos = (elapsed: number, running: boolean) => {
  overlayVideos.forEach((e) => {
    videoHandler(e, elapsed, running)
  })
}

const videoHandler = (video: OverlayVideo, elapsed: number, running: boolean) => {
  if (running && !video.ended) {
    if (video.started) {
      video.element.play()
    }
    if (elapsed === video.startTime && !video.started) {
      console.log(`video started: ${video.id}`);
      
      video.element.src = video.url
      video.element.play()
      webGLContainer?.appendChild(video.element)
      setTimeout(() => {
        video.element.style.opacity = '1'
      }, 500)
    }
  }
  
  if (running && video.ended) {
    video.element.remove()
  }

  if (!running) {
    video.element.pause()
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

const showImageContainer = (container: HTMLDivElement, img: HTMLImageElement) => {
  webGLContainer?.appendChild(container)
  if (!img.complete) {
    img.onload = () => {
      container.style.opacity = '0.87'
    }
  } else {
    setTimeout(() => {
      container.style.opacity = '0.87'
    }, 500)
  }
}

const hideImageContainer = (id: string) => {
  // const selectedContainer = document.querySelector<HTMLDivElement>('.modal')
  const selectedContainer = document.getElementById(id)
  selectedContainer!.style.opacity = '0'
  setTimeout(() => {
    selectedContainer?.remove()
    return
  }, 1000)
}


const shuffledImages = getShuffledArr(outroImages)
let shuffleStart = 920
let shuffledLength = shuffledImages.length


export const updateImages = (elapsed: number) => {
  
  images.forEach((imageObj: any) => {
    const { elements, data } = imageObj
    const { container, image } = elements
    const { t1, t2 } = data
    
    if (elapsed > t1 && elapsed < t2) {
      if (!container.parentElement) {
        // containerElem?.appendChild(element)
        showImageContainer(container, image)
      }
    } else {
      if (container.parentElement) {
        // element.parentElement.removeChild(element)
        hideImageContainer(container.id)
      }
    }
  })

  shuffledImages.forEach((imageObj: any, i: number) => {
    const { elements } = imageObj
    const { container, image } = elements

    // COULD BE (elapsed > 2 + i && elapsed < 5 + i)
    if (elapsed > shuffleStart + i && elapsed < (shuffleStart + shuffledLength) + (i * 0.1)) {
      if (!container.parentElement) {
        showImageContainer(container, image)
      }
    } else {
      if (container.parentElement) {
        hideImageContainer(container.id)
      }
    }
  })

}