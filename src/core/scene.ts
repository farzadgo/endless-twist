
import { Scene, Color } from 'three'
// Fog, AxesHelper, BoxGeometry, MeshBasicMaterial, Mesh...

export const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

export const scene = new Scene()
scene.background = new Color('#333')
// scene.fog = new Fog('#333333', 600, 3000)
