
import { Scene, Color, DirectionalLight, AmbientLight } from 'three'
// Fog, AxesHelper, BoxGeometry, MeshBasicMaterial, Mesh...

export const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

export const scene = new Scene()
scene.background = new Color('#333')
// scene.fog = new Fog('#333333', 600, 3000)

const ambientLight = new AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const directionalLight = new DirectionalLight('#ffffff', 1)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(50, 50, 50)

scene.add(directionalLight)