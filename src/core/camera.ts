import { PerspectiveCamera, CatmullRomCurve3, Vector3, BufferGeometry, LineBasicMaterial, Line } from 'three'
import { scene, sizes } from './scene'
import { DURATION_IN_SECONDS } from '../main'
import { getLoading } from '../content/media'
import { sections } from '../content/sections'

const VERTICAL_FIELD_OF_VIEW = 45
const NEAR_PLANE = 0.1
const FAR_PLANE = 10000

const initialRotation = sections[0].lookVector

let fraction = 0
export const setFraction = (value: number) => fraction = value
export const getFraction = () => fraction

let inertia: number
let movementX: number
let movementY: number

export const camera = new PerspectiveCamera(
  VERTICAL_FIELD_OF_VIEW,
  sizes.width / sizes.height,
  NEAR_PLANE,
  FAR_PLANE
)

// initial camera values
camera.rotation.order = 'YXZ'
camera.rotation.set(...initialRotation.toArray())

scene.add(camera)


// --------- CAMERA UPDATE ---------

export const updateCameraPosition = (dt: number) => {
  if (fraction < 1 && !getLoading()) {
    fraction += dt / DURATION_IN_SECONDS
  }

  const newPosition = splineCurve.getPoint(fraction)
  // camera.setRotationFromEuler(new Euler(tangent.x, tangent.y, 0, 'YXZ'))
  camera.position.copy(newPosition)
}

const onMouseMove = (event: {movementY: number; movementX: number}) => {
  // // 0.05 and (inertia / 50) also good
  inertia = 0.1
  movementX = event.movementX
  movementY = event.movementY
  // camera.rotation.y -= event.movementX * 0.0002
  // camera.rotation.x -= event.movementY * 0.0002
}


export const updateCameraRotation = (dt: number) => {
  inertia -= dt
  if (inertia < 0) {
    inertia = 0
  }
  camera.rotation.y -= movementX * (inertia / 1500)
  camera.rotation.x -= movementY * (inertia / 1500)
}


export const resetCamera = () => {
  fraction = 0
  camera.rotation.set(...initialRotation.toArray())
  updateCameraPosition(0) // OR camera.position.set(initialPosition) but fraction sets it
}

document.addEventListener('mousemove', onMouseMove)


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

const points = splineCurve.getPoints(300)

// const pointsPath = new CurvePath()
// pointsPath.add(splineCurve)
// const points = pointsPath.curves.reduce((p, d)=> [...p, ...d.getPoints(20)], [])


const geometry = new BufferGeometry().setFromPoints(points)
const material = new LineBasicMaterial({ color: 0x9132A8 })
const myPath = new Line(geometry, material)
scene.add(myPath)
