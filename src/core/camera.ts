import {
  PerspectiveCamera,
  CatmullRomCurve3,
  Vector3,
  BufferGeometry,
  LineBasicMaterial,
  Line
} from 'three'

import { scene, sizes } from './renderer'
import { DURATION_IN_SECONDS } from '../main'
import { getLoading } from '../content/media'

const VERTICAL_FIELD_OF_VIEW = 45
const NEAR_PLANE = 0.1
const FAR_PLANE = 10000

let fraction = 0
export const setFraction = (value: number) => fraction = value
export const getFraction = () => fraction

export const cameraRotations = {
  x: 0,
  y: 0,
}

export const camera = new PerspectiveCamera(
  VERTICAL_FIELD_OF_VIEW,
  sizes.width / sizes.height,
  NEAR_PLANE,
  FAR_PLANE
)

// --- INITIAL CAM PROPS ---

// camera.position.set(200, 100, 20)
camera.rotation.order = 'YXZ'
camera.rotation.set(-0.6, -0.2, 0)


window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
})


scene.add(camera)


// --------- CAMERA UPDATE ---------

export const updateCamera = (dt: number) => {
  if (fraction < 1 && !getLoading()) {
    fraction += dt / DURATION_IN_SECONDS
  }

  // for exiting pause with the latest rotation
  cameraRotations.x = camera.rotation.x
  cameraRotations.y = camera.rotation.y

  const newPosition = splineCurve.getPoint(fraction)
  // camera.setRotationFromEuler(new Euler(tangent.x, tangent.y, 0, 'YXZ'))
  camera.position.copy(newPosition)
}


export const resetCamera = () => {
  fraction = 0
  camera.rotation.set(-0.6, -0.2, 0)
  updateCamera(0)
}

// --------- CAMERA SPLINE PATH ---------

// e.g. ( 993.8, -175.8, 1310 ) >> ( 993.8, 1310, 175.8 )
// <without tweaking>.rotation.set(- Math.PI / 2, 0, 0)

const splineCurve = new CatmullRomCurve3([
	new Vector3( 314.3, 210.7, 597 ),
	new Vector3( 279.5, 133.5, 248.5 ),
	new Vector3( 123.9, 61.5, -114.1 ),
	new Vector3( 210.5, 13.9, -402 ),
	new Vector3( 535.5, 13.9, -663.4 ),
	new Vector3( 840.5, 28.6, -1019.3 ),
	new Vector3( 1093.9, 177.6, -1468.6 ),
	new Vector3( 1125.1, 112.7, -1829 ),
	new Vector3( 1450.7, 206.2, -1900.7 ),
	new Vector3( 1691.5, 62.5, -1619.6 ),
	new Vector3( 2112.3, 21.6, -1779.3 ),
	new Vector3( 2348.8, 13.9, -2282.1 ),
	new Vector3( 2680.4, 13.9, -2326.8 ),
	new Vector3( 2832.7, 13.9, -2113.8 ),
	new Vector3( 2588.1, 13.9, -1749.1 ),
	new Vector3( 2165.4, 32.6, -1251.7 ),
	new Vector3( 1694.6, 271.3, -686.5 ),
	new Vector3( 1308.9, 706.4, -211 ),
	new Vector3( 993.8, 1310, 175.8 ),
])

// const pointsPath = new CurvePath()
// pointsPath.add(splineCurve)
// const points = pointsPath.curves.reduce((p, d)=> [...p, ...d.getPoints(20)], [])

const points = splineCurve.getPoints(300)

const geometry = new BufferGeometry().setFromPoints(points)
const material = new LineBasicMaterial({ color: 0x9132A8 })
const myPath = new Line(geometry, material)
scene.add(myPath)