
import { WebGLRenderer, sRGBEncoding, PCFShadowMap, ACESFilmicToneMapping } from 'three'
import { scene, sizes } from './scene'
import { camera } from './camera'

const canvas: HTMLElement = document.querySelector('#webgl') as HTMLElement

export const renderer = new WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
})

// More realistic shadows
renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFShadowMap
renderer.physicallyCorrectLights = true
renderer.outputEncoding = sRGBEncoding
renderer.toneMapping = ACESFilmicToneMapping
renderer.toneMappingExposure = 1


const updateRenderer = () => {
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // To avoid performance problems on devices with higher pixel ratio
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  updateRenderer()

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.render(scene, camera)
})

updateRenderer()
