import { DURATION_IN_SECONDS, reset, startAnim } from '../main'
import { getLoading, subtitleElement, startLayeredIntroAudio, pauseLayeredIntroAudio, getIntroPlaying } from '../content/media'
import { getFraction } from './camera'

import hfk_logo from '../content/assets/logo-hfk.png'
import sfk_logo from '../content/assets/logo-sfk.png'
import schwa_logo from '../content/assets/logo-schwankhalle.png'
import peira_logo from '../content/assets/logo-peira.png'

import volume_up from '../content/assets/volume_up.svg'
import volume_off from '../content/assets/volume_off.svg'
import rotate from '../content/assets/rotate-ccw.svg'

let aboutIsShown = false
let hover = false

const webGLContainer = document.getElementById('webgl-container')

export const loaderDiv = document.querySelector<HTMLDivElement>('.loader')
export const spinnerDiv = document.querySelector<HTMLDivElement>('.spinner')
export const progressDiv = document.querySelector<HTMLDivElement>('.progress')
progressDiv!.innerHTML = 'downloading 65MB 3D model'

export const checkLoading = () => {
  if (getLoading()) {
    spinnerDiv!.style.display = 'flex'
  } else {
    spinnerDiv!.style.display = 'none'
  }
}

const trigrams = ['☰', '☱','☲', '☳', '☴', '☵', '☶', '☷']
const getAnIcon = (arr:string[]) => {
  let index = Math.floor(Math.random() * arr.length)
  let selectedIcon: string = arr[index]
  return selectedIcon
}

const formatDuration = (durationInSeconds: number): string => {
  const minutes = Math.floor(durationInSeconds / 60)
  const seconds = durationInSeconds % 60

  return `${minutes}' ${seconds}"`
}

const durationHTML = (allDur: number) => `</span>duration ${formatDuration(allDur)}</span>`


const toggleElem = (elms: HTMLElement[]) => {
  hover = !hover
  if (hover) {
    elms.forEach(elm => {
      elm.style.display = 'block'
      elm.style.opacity = '0'
      setTimeout(() => {
        elm.style.opacity = '1'
      }, 100)
    })
  } else {
    elms.forEach(elm => {
      elm.style.opacity = '0'
      setTimeout(() => {
        elm.style.display = 'none'
      }, 300)
    })
  }
}

const overlay = document.createElement('div')
overlay.id = 'overlay'
document.body.insertBefore(overlay, webGLContainer)

const pageTitle = document.createElement('h1')
pageTitle.className = 'page-title'
pageTitle.textContent = 'ENDLESS TWIST'

const aboutBtn = document.createElement('button')
aboutBtn.className = 'about-btn'
aboutBtn.textContent = '☲'

const startBtn = document.createElement('button')
startBtn.className = 'start-btn'
startBtn.textContent = 'start'

const resetBtn = document.createElement('button')
resetBtn.className = 'reset-btn'
const resetIcon = document.createElement('img')
resetIcon.src = rotate
resetBtn.appendChild(resetIcon)

const pubLink = document.createElement('a')
pubLink.href = '/publication/'
pubLink.className = 'pub-link'
pubLink.innerHTML = 'publication'

const pubThumb = document.createElement('img')
pubThumb.src = '/et-pub.png'
pubThumb.alt = 'endless twist publication'
pubThumb.className = 'pub-thumbnail'

const soundBtn = document.createElement('button')
soundBtn.className = 'sound-btn'
const soundIcon = document.createElement('img')
soundIcon.src = volume_off
soundBtn.appendChild(soundIcon)

const about = document.createElement('div')
about.className = 'about'
about.innerHTML = `
  <section>
    <p> Endless Twist: <i> A critical autoethnographic approach to the current state of urban development </i></p>
    <br>
    <p> <i>Endless Twist</i> is a guided walk through a 3D space that is constructed by urban fragments and personal memories.
    It is multimedia web installation and audiovisual performance presenting the artist's critical perspective regarding
    the agency of the human and non-human, and by extension of architects, planners, and owners.
    While reflecting on the role of architecture as an apparatus that produces power dynamics, Farzad Golghasemi examines
    the corporeality associated with physical and digital spaces, through a techno-poetical interpretation of the contemporary
    state of political economy. </p>
    <p>
    — Read the publication <a href="/publication/"> here </a> </br>
    — Check the work's exhibitions & performances <a href="https://fagosemi.xyz/works/endless-twist/" target="blank"> here </a> 
    </p>
  </section>
  <section>
    <h3> Credits </h3>
    <p>
    — Concept, Text, 3D, Programming: <a href="https://fagosemi.xyz/" target="blank">Farzad Golghasemi</a> </br>
    — Sound, Dramaturgy: <a href="https://gvaldespino.xyz/" target="blank">Gabriela Valdespino</a>
    </p>
  </section>
  <section>
    <h3> Biography </h3>
    <p> Farzad Golghasemi (1988 he/they) is a transdisciplinary artist and researcher who focuses on architecture and spatial
    production through the agency of software and technology. By incorporating speculation, programming, and 3D modeling,
    they explore the new modes of world-making through synthetic and temporal aspects of construction. ...</p>
  </section>
  </br>
  <section>
    <p> * This project was made possible by participation in the project <a href="https://ta.peira.space/" target="blank">Tender Absence</a> by the collective
    <b>Peira</b> in cooperation with <b>Schwankhalle Bremen</b> and friendly support of <b>Senator für Kultur Bremen</b>
    and <b>University of the Arts Bremen</b>. </p>
  </section>
  <section id="logos">
    <div class="image-container"> <img src=${peira_logo} alt="peira-logo"> </div>
    <div class="image-container"> <img src=${schwa_logo} alt="schwankhalle-logo"> </div>
    <div class="image-container"> <img src=${hfk_logo} alt="HfK-logo"> </div>
    <div class="image-container"> <img src=${sfk_logo} alt="SfK-logo"> </div>
  </section>
  </br>
  <section>
    <h3> Image Credits </h3>
    <p> Renderings: Justus Grosse GmbH / 3D artists: Unknown <br>
    Postcards: Überseestadt Marketingverein / 3D artists: Unknown <br>
    Photos: © Hafenmuseum Bremen / Photographer: © Daniela Buchholz <br>
    Photos: © Kulturhaus-Walle Bremen / Photographer: © Hans Brockmöller <br>
    Photos: Gabriela Valdespino, Farzad Golghasemi <br>
  </section>
  <section>
    <p><i> The project's web is programmed with the help of <a href="https://threejs.org/" target="blank">Three.js</a> open source library
    for 3D computer graphics and its source code is hosted on through <a href="https://github.com/farzadgo/endless-twist/" target="blank">this repository</a>. </i></p>
  </section>
`

const guides = document.createElement('div')
guides.className = 'guides'
guides.innerHTML = `
  <ul>
    <li><i>play_pause</i> <span>space bar</span></li>
    <li><i>look around</i> <span>mouse_touchpad </span></li>
    <li>different sections <span>0</span> <span>1</span> ... <span>9</span></li>
    <li><i>fullscreen</i> <span>F11</span></li>
  </ul>
`

const duration = document.createElement('div')
duration.className = 'duration'


export const updateGUI = (elapsed: number, running: boolean, started: boolean) => {
  duration.innerHTML = running ?
    `<span>${formatDuration(Math.floor(elapsed))}</span>` :
    durationHTML(DURATION_IN_SECONDS)

  if (getFraction() > 0.99999) {
    overlay?.appendChild(resetBtn)
  }

  startBtn.textContent = started ? 'continue' : 'start'
}


export const initGUI = () => {
  overlay?.appendChild(pageTitle)
  overlay?.appendChild(aboutBtn)
  overlay?.appendChild(soundBtn)
  overlay?.appendChild(pubLink)

  overlay?.appendChild(about)
  
  about.style.display = 'none'
  duration.innerHTML = durationHTML(DURATION_IN_SECONDS)
  
  aboutBtn.addEventListener('click', toggleAbout)
  startBtn.addEventListener('click', startAnim)

  soundBtn.addEventListener('click', async () => {
    if (getIntroPlaying()) {
      await pauseLayeredIntroAudio().then(() => soundIcon.src = volume_off)
    } else {
      await startLayeredIntroAudio().then(() => soundIcon.src = volume_up)
    }
  })

  startBtn.addEventListener('mouseover', () => toggleElem([guides]))
  startBtn.addEventListener('mouseout', () => toggleElem([guides]))

  pubLink.addEventListener('mouseover', () => toggleElem([pubThumb]))
  pubLink.addEventListener('mouseout', () => toggleElem([pubThumb]))

  resetBtn.addEventListener('click', () => {
    reset()
    startBtn.textContent = 'restart'
    resetBtn.remove()
  })

}


export const initGUIonLoad = async () => {
  progressDiv!.remove()
  spinnerDiv!.style.display = 'none'

  overlay?.classList.add('intro-gradient')
  setTimeout(() => {
    overlay?.classList.add('loaded')
  }, 100)

  overlay?.insertBefore(startBtn, pubLink)

  overlay?.appendChild(guides)
  overlay?.appendChild(pubThumb)
  overlay?.appendChild(duration)
}


const toggleAbout = () => {
  let elements = [loaderDiv!, startBtn, resetBtn, pubLink]
  if (!aboutIsShown) {
    about.style.display = 'block'
    aboutBtn.textContent = '⨉'
    for (let el of elements) {
      el.style.display = 'none'
    }
    guides.style.display = 'none'
    duration.style.display = 'none'
    aboutIsShown = true
  } else {
    about.style.display = 'none'
    aboutBtn.textContent = getAnIcon(trigrams)
    for (let el of elements) {
      el.style.display = 'flex'
    }
    guides.style.display = 'flex'
    duration.style.display = 'flex'
    aboutIsShown = false
  }
}


export const showOverlay = async () => {
  overlay!.style.display = 'block'
  overlay!.style.opacity = '0'
  setTimeout(() => {
    overlay!.style.opacity = '1'
  }, 10)

  subtitleElement!.style.opacity = '0'

  startBtn.style.display = 'block'
  startBtn.style.pointerEvents = 'none'
  startBtn.style.opacity = '0.3'
  setTimeout(() => {
    startBtn.style.opacity = '1'
    startBtn.style.pointerEvents = 'auto'
  }, 1000)

  soundIcon.src = volume_up
  await startLayeredIntroAudio()

  overlay?.classList.add('intro-gradient')
}


export const hideOverlay = async () => {
  overlay!.style.opacity = '0'
  setTimeout(() => {
    overlay!.style.display = 'none'
  }, 1000)

  subtitleElement!.style.opacity = '1'
  startBtn.style.display = 'none'

  webGLContainer!.appendChild(duration)

  await pauseLayeredIntroAudio()
  overlay?.classList.remove('intro-gradient')
}
