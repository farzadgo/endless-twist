import './costyles.css'
import './style.css'

import { Clock } from 'three'
import { loadModels } from './core/loader'
import { renderer } from './core/renderer'
import { scene } from './core/scene'
import { camera, updateCameraPosition, updateCameraRotation, resetCamera } from './core/camera'
import { initGUI, showOverlay, hideOverlay, updateGUI, progressDiv, spinnerDiv, checkLoading } from './core/gui'
import { updateImages, updateAudio, updateVideos, audioElapsed, playAudio, pauseAudio, resetAudio, getEnded, setEnded } from './content/media'

import { throttle } from 'throttle-debounce'

export const isMobile = () => {
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return true
  } else {
    return false
  }
}

let animID: number

let elapsed = 0
export const setElapsed = (value: number) => elapsed = value
export const getElapsed = () => elapsed

let started = false
let waited = true

let running = false
export const setRunning = (value: boolean) => running = value
export const getRunning = () => running

export const DURATION_IN_SECONDS = 1040
export const FORWARD_DURATION = 60
const STEPS_PER_FRAME = 5


// --------- PRE-LOAD ---------

if (!isMobile()) {
  loadModels()
} else {
  spinnerDiv?.remove()
  progressDiv!.innerHTML = 'the web installation is only <br> available on desktop devices'
}

const waiter = () => {
  waited = false
  setTimeout(() => waited = true, 1000)
}


// --------- CONTROLS ---------

export const startAnim = async (): Promise<void> => {
  if (!running && waited && !isMobile()) {
    if (!started) started = true
    try {
      document.body.requestPointerLock()
      // document.body.requestFullscreen()
      loop()
      running = true
      hideOverlay()
      waiter()
      if (!getEnded()) await playAudio()
    } catch (error) {
      console.error("Failed to start animation or audio:", error)
      running = false
    }
  }
}

export const stopAnim = async (): Promise<void> => {
  if (running && waited) {
   try {
      document.exitPointerLock()
      // document.exitFullscreen()
      cancelAnimationFrame(animID)
      running = false
      showOverlay()
      waiter()
      await pauseAudio()
    } catch (error) {
      console.error("Failed to stop animation or audio:", error)
    }
  }
}


document.addEventListener('pointerlockchange', async () => {
  if (document.pointerLockElement === null) {
    await stopAnim()
  }
})

document.addEventListener('keyup', async event => {
  if (event.code === 'Space') {
    if (!running) {
      await startAnim()
    } else {
      await stopAnim()
    }
  }
})


// --------- LOOPING CONTROL ---------

const clock = new Clock()

export const reset = () => {
  setEnded(false)
  started = false
  elapsed = 0
  resetAudio()
  resetCamera()
  renderer.render(scene, camera)
}

let trigger = false

const loop = () => {
  const deltaTime: number = Math.min( 0.05, clock.getDelta()) / STEPS_PER_FRAME
  
  if (running && Math.abs(audioElapsed - elapsed) > 2.0) {
    trigger = true
    if (trigger === true) {
      elapsed = audioElapsed
      console.log('synced...')
      trigger = false
    }
  }
  controlTime()

  updateCameraRotation(deltaTime)
  for (let i = 0; i < STEPS_PER_FRAME; i++) {
    updateCameraPosition(deltaTime)
  }

  renderer.render(scene, camera)
  animID = requestAnimationFrame(loop)
}

const controlTime = throttle(100, () => {
  if (running) elapsed += 0.1
  let time = Math.round(elapsed * 10) / 10

  updateAudio()
  updateImages(time)
  updateVideos(time, running)
  updateGUI(time, running, started)

  checkLoading()
  // console.log(`elapsed: ${time} | audioElapsed: ${audioElapsed}`)
})


// --------- init GUI ---------

initGUI()
