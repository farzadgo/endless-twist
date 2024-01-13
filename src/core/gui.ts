import { startAnim, DURATION_IN_SECONDS, loaderDiv, reset } from '../main';
import { subtitleElement } from '../content/updatemedia';
import { fraction } from './camera';

import hfk_logo from '../content/assets/logo-hfk.png';
import sfk_logo from '../content/assets/logo-sfk.png';
import schwa_logo from '../content/assets/logo-schwankhalle.png';
import peira_logo from '../content/assets/logo-peira.png';
import rotate from '../content/assets/rotate-ccw.svg';


let aboutIsShown = false;
let hover = false;

const webGLContainer = document.getElementById('webgl-container');
const overlay = document.getElementById('overlay');

let pageTitle = overlay?.querySelector('h1') as HTMLHeadingElement;
pageTitle.className = 'page-title';

// const iconsStrings = ['☰', '☱','☲', '☳', '☴', '☵', '☶', '☷'];
// const getAnIcon = (arr:string[]) => {
//   let index = Math.floor(Math.random() * arr.length);
//   let selectedIcon: string = arr[index];
//   return selectedIcon
// }

const formatDuration = (durationInSeconds: number): string => {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;

  return `${minutes}' ${seconds}"`;
}

const durationHTML = (allDur: number) => `duration: <span>${formatDuration(allDur)}</span>`;


const toggleElem = (elms: HTMLElement[]) => {
  hover = !hover;
  if (hover) {
    elms.forEach(elm => {
      elm.style.display = 'block';
      elm.style.opacity = '0';
      setTimeout(() => {
        elm.style.opacity = '1';
      }, 100);
    });
  } else {
    elms.forEach(elm => {
      elm.style.opacity = '0';
      setTimeout(() => {
        elm.style.display = 'none';
      }, 300);
    });
  }
}


const startBtn = document.createElement('button');
startBtn.className = 'start-btn';
startBtn.textContent = 'start';

const resetBtn = document.createElement('button');
resetBtn.className = 'reset-btn';
const resetIcon = document.createElement('img');
resetIcon.src = rotate;
resetBtn.appendChild(resetIcon);

const pubLink = document.createElement('a');
pubLink.href = '/publication/';
pubLink.className = 'pub-link';
pubLink.innerHTML = 'publication';

const pubThumb = document.createElement('img');
// pubThumb.src = pub_cover;
pubThumb.src = '/et-pub.png';
pubThumb.alt = 'endless twist publication';
pubThumb.className = 'pub-thumbnail';

const aboutBtn = document.createElement('button');
aboutBtn.className = 'about-btn';
aboutBtn.textContent = 'about';
// aboutBtn.textContent = getAnIcon(iconsStrings);

const about = document.createElement('div');
about.className = 'about';
about.innerHTML = `
  <section>
    <p> Endless Twist: <i> A critical autoethnographic approach to the current state of urban development </i></p>
    <p> See the publication <a href="/publication/"> here </a></p>
    <br>
    <p> Endless Twist is a guided walk through a 3D space that is constructed by urban fragments and personal memories.
    It is multimedia web installation and audiovisual performance presenting the artist's critical perspective regarding the agency
    of the human and non-human, and by extension of architects, planners, and owners.
    While reflecting on the role of architecture as an apparatus that produces power dynamics, Farzad Golghasemi and
    Gabriela Valdespino examine the corporeality associated with physical and digital spaces, through a techno-poetical
    interpretation of the contemporary state of political economy. </p>
  </section>
  <section>
    <h3> Credits </h3>
    <p> Concept, Text, 3D, Programming: <b>Farzad Golghasemi</b></p>
    <p> Sound, Dramaturgy, Artistic Collaboration: <b>Gabriela Valdespino</b></p>
  </section>
  <section>
    <h3> Biography </h3>
    <p> Farzad Golghasemi <a href="https://instagram.com/dis___orient/" target="blank">@dis___orient</a> and Gabriela Valdespino
    <a href="https://instagram.com/lowfisd/" target="blank">@lowfisd</a> (hacer sitio) work together involving corporeal and digital
    spaces in conjunction with text, image, sound, video, web, and installation. Their body of work is initiated by inspections of
    social phenomena and associated spatial [re]productions. In this context, they question the relationship between social and
    somatic, and how the body, mind, and social settings are intricately linked. Rather than mere aesthetics, they are interested
    in lived experience which motivates them to work with performative methodologies such as walking to explore phenomenological
    and multi-sensory aspects of the built environment. </p>
  </section>
  <section>
    <p> * This project was made possible by participation in the project <a href="https://ta.peira.space/" target="blank"><b>Tender Absence</b></a> by the collective
    <b>Peira</b> in cooperation with <b>Schwankhalle Bremen</b> and friendly support of <b>Senator für Kultur Bremen</b>
    and <b>University of the Arts Bremen</b>. </p>
  </section>
  <section id="logos">
    <div class="image-container"> <img src=${peira_logo} alt="peira-logo"> </div>
    <div class="image-container"> <img src=${schwa_logo} alt="schwankhalle-logo"> </div>
    <div class="image-container"> <img src=${hfk_logo} alt="HfK-logo"> </div>
    <div class="image-container"> <img src=${sfk_logo} alt="SfK-logo"> </div>
  </section>
  <section>
    <h3> Special thanks to </h3>
    <p> Prof. Dr. Andrea Sick · Noëlle BuAbbud · Guida Ribeiro · Lucas Kalmus · Abd Tammaa · Kilian Schwoon · Neus Ledesma Vidal ·
    Victor Artiga Rodriguez · Prof. Natascha Sadr Haghighian · Saba Innab · Thealit F.K.L. · Jukka Boehm · Prof. Dennis Paul · Aurora Kellermann </p>
  </section>
  <section>
    <h3> Image Credits and Copyrights </h3>
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

const guides = document.createElement('div');
guides.className = 'guides';
guides.innerHTML = `
  <ul>
    <li><i>pause</i> <span>space bar</span></li>
    <li><i>look around</i> <span>mouse_trackpad</span></li>
    <li><i>fullscreen</i> <span>F11</span></li>
  </ul>
`

const duration = document.createElement('div');
duration.className = 'duration';


export const updateGUI = (elapsed: number, running: boolean, started: boolean) => {
  duration.innerHTML = running ?
    `<span>${formatDuration(Math.floor(elapsed))}</span>` :
    durationHTML(DURATION_IN_SECONDS);

  if (fraction > 0.99999) {
    overlay?.appendChild(resetBtn);
  }

  startBtn.textContent = started ? 'continue' : 'start';
}


export const initGUI = () => {
  overlay?.appendChild(pubLink);
  overlay?.appendChild(aboutBtn);
  overlay?.appendChild(about);
  about.style.display = 'none';
  duration.innerHTML = durationHTML(DURATION_IN_SECONDS);
  
  aboutBtn.addEventListener('click', toggleAbout);
  startBtn.addEventListener('click', startAnim);

  startBtn.addEventListener('mouseover', () => toggleElem([guides, duration]));
  startBtn.addEventListener('mouseout', () => toggleElem([guides, duration]));

  pubLink.addEventListener('mouseover', () => toggleElem([pubThumb]));
  pubLink.addEventListener('mouseout', () => toggleElem([pubThumb]));

  resetBtn.addEventListener('click', () => {
    reset();
    startBtn.textContent = 'restart';
    resetBtn.remove();
  });

}


export const updateInitGUI = () => {
  loaderDiv?.remove();
  overlay?.appendChild(startBtn);
  overlay?.appendChild(duration);
  overlay?.appendChild(guides);
  overlay?.appendChild(pubThumb);
}


const toggleAbout = () => {
  let elements = [loaderDiv!, startBtn, resetBtn, pubLink];
  if (!aboutIsShown) {
    about.style.display = 'block';
    aboutBtn.textContent = '✕';
    for (let el of elements) {
      el.style.display = 'none';
    }
    aboutIsShown = true;
  } else {
    about.style.display = 'none';
    // aboutBtn.textContent = getAnIcon(iconsStrings);
    aboutBtn.textContent = 'about';
    for (let el of elements) {
      el.style.display = 'flex';
    }
    aboutIsShown = false;
  }
}


export const showOverlay = () => {
  if (overlay) {
    overlay.style.display = 'block';
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.opacity = '1';
    }, 10);
  }

  subtitleElement!.style.opacity = '0';

  startBtn.style.display = 'block';
  startBtn.style.pointerEvents = 'none';
  startBtn.style.opacity = '0.3';
  setTimeout(() => {
    startBtn.style.opacity = '1';
    startBtn.style.pointerEvents = 'auto';
  }, 1000);
}


export const hideOverlay = () => {
  overlay!.style.opacity = '0';
  setTimeout(() => {
    overlay!.style.display = 'none';
  }, 1000);

  subtitleElement!.style.opacity = '1';
  startBtn.style.display = 'none';

  webGLContainer?.appendChild(duration);
}
