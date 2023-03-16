// import { BladeApi, Pane } from 'tweakpane'
// import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
// import { BladeController, View } from '@tweakpane/core'

// interface FPSGraph extends BladeApi<BladeController<View>> {
//   begin(): void
//   end(): void
// }

// // Debug
// export const paneGui = new Pane()
// paneGui.registerPlugin(EssentialsPlugin)

// export const fpsGraph = paneGui.addBlade({
//   view: 'fpsgraph',
//   label: 'fpsgraph',
// }) as FPSGraph

const aboutTexts = {
  aboutOne: 'While “local” is related to corporeal proximity, intimacy, slowness, and relational multi-sensorial connections, “global” is craving for speed, precision, convenience, interest rate, and marketing. Conglomerates such as Google use local resources in its way for their own sake. They use notions such as maps and mapping to establish local dependencies, and eventually financial dominance. The same is with local construction companies and urban development industries as a part global free-market constitution, appropriating water and land for marketing the spaces they construct. In this feedback loop of spatial appropriation, Google Maps services incorporate the absence of bodies and places while accumulating data regarding our cities and their existence. It is just a matter of perspective, how to extract that data, and how to read and narrate it. Is it possible to use it against its constitution?',
  aboutTwo: 'Endless Twist is a guided walk through a 3D space that is constructed by urban fragments and personal memories. It is an audiovisual performance presenting Hacer Sitio’s critical perspective regarding the agency of the human and non-human, and by extension of architects, planners, and owners. While reflecting on the role of architecture as an apparatus that produces power dynamics, Farzad Golghasemi and Gabriela Valdespino examine the corporeality associated with physical and digital spaces, through a techno-poetical interpretation of the contemporary state of political economy.',
}

import {
  startAnim,
  animDuration,
  isMobile,
  // container
} from '../main';
import { fraction } from './camera';

import hfk_logo from '../images/logo-hfk.png';
import sfk_logo from '../images/logo-sfk.png';
import schwa_logo from '../images/logo-schwankhalle.png';
import peira_logo from '../images/logo-peira.png';

// let importedImageModule = 'blabla/images/01-render-cJustus-1.jpg'

let aboutIsShown = false;

const overlay = document.getElementById('overlay');

const iconsStrings = ['☰', '☱','☲', '☳', '☴', '☵', '☶', '☷'];
const getAnIcon = (arr:string[]) => {
  let index = Math.floor(Math.random() * arr.length);
  let selectedIcon: string = arr[index];
  return selectedIcon
}

const timeFormatter = (duration: number) => {
  const hrs = Math.floor(duration / 3600);
  const mins = Math.floor((duration % 3600) / 60);
  const secs = Math.floor(duration % 60);

  let ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }
  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  return ret;
}

// --- created & listeners? ---
const startBtn = document.createElement('button');
startBtn.className = 'start-btn';
startBtn.textContent = 'start';

const aboutBtn = document.createElement('button');
aboutBtn.className = 'about-btn';
aboutBtn.textContent = getAnIcon(iconsStrings);

const infoDiv = document.createElement('div');
infoDiv.className = 'about'

const projectTitle = document.createElement('h1');
projectTitle.className = 'project-title';
projectTitle.textContent = 'endless twist';

const guides = document.createElement('div');
guides.className = 'guides';

const duration = document.createElement('div');
duration.className = 'duration';


const showAbout = () => {
  aboutBtn.textContent = !aboutIsShown ? '✕' : getAnIcon(iconsStrings);
  startBtn.style.display = !aboutIsShown ? 'none' : 'block';
  guides.style.display = !aboutIsShown ? 'none' : 'block';
  // projectTitle.style.display = !aboutIsShown ? 'none' : 'block';

  // <img src="${importedImageModule}" alt="senator-für-ükultur" />
  
  if (!aboutIsShown) {    
    infoDiv!.innerHTML = `
      <section>
        <p> ${aboutTexts.aboutOne} </p>
        <p> ${aboutTexts.aboutTwo} </p>
      </section>
      <section>
        <h3> Credits </h3>
        <p> Concept, Text, 3D, Programming: <b>Farzad Golghasemi</b></p>
        <p> Sound, Dramaturgy, Artistic Collaboration: <b>Gabriela Valdespino</b></p>
        <p> Audio technical support: <a href="https://ap0teke.github.io/" target="blank">ap0teke</a></p>
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
        <p> ❯❯ This project was made possible by participation in the project <a href="https://ta.peira.space/" target="blank"><b>Tender Absence</b></a> by the collective
        <b>Peira</b> (www.peira.space) in cooperation with <b>Schwankhalle Bremen</b> and friendly support of <b>Senator für Kultur Bremen</b>
        and <b>University of the Arts Bremen</b>. ❮❮ </p>
      </section>
      <section id="logos">
        <div class="image-container"> <img src=${peira_logo} alt="peira-logo"> </div>
        <div class="image-container"> <img src=${schwa_logo} alt="schwankhalle-logo"> </div>
        <div class="image-container"> <img src=${hfk_logo} alt="HfK-logo"> </div>
        <div class="image-container"> <img src=${sfk_logo} alt="SfK-logo"> </div>
      </section>
      <section>
        <h3> Special thanks to </h3>
        <p> Lucas Kalmus · Abd Tammaa · Prof. Dr. Andrea Sick · Kilian Schwoon · Neus Ledesma Vidal · Saba Innab · Thealit F.K.L. · Jukka Boehm · Victor Artiga Rodriguez · Prof. Dennis Paul </p>
      </section>
      <section>
        <h3> Image Credits and Copyrights </h3>
        <p> Renderings: Justus Grosse GmbH / 3D artists: Unknown </p>
        <p> Postcards: Überseestadt Marketingverein / 3D artits: Unknown </p>
        <p> Photos: © Hafenmuseum Bremen / Photographer: © Daniela Buchholz </p>
        <p> Photos: © Kulturhaus-Walle Bremen / Photographer: © Hans Brockmöller </p>
        <p> Banner photos: Farzad Golghasemi </p>
      </section>
    `
    overlay?.appendChild(infoDiv);
    aboutIsShown = true
  } else {
    infoDiv?.remove();
    aboutIsShown = false
  }
}

aboutBtn.addEventListener('click', showAbout);


export const updateUI = () => {  
  // let startBtnContent = _totalTime ? 'continue' : 'start';
  if (fraction > 0.98 && fraction < 1.0) {
    startBtn.textContent = 'restart';
  } else {
    startBtn.textContent = 'continue';
  }
}

export const updateDurationUI = (elapsed: number) => {
  duration.innerHTML = `
    <span>${timeFormatter(Math.floor(elapsed))}</span>
    / <span>${timeFormatter(animDuration)}</span>
  `;
}


export const showOverlay = () => {

  startBtn?.addEventListener('click', startAnim);
  overlay?.appendChild(projectTitle);
  overlay?.appendChild(startBtn);
  overlay?.appendChild(aboutBtn);

  if (overlay) {
    overlay.style.display = 'block';
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.opacity = '1';
    }, 10);
  }

  if (!aboutIsShown) startBtn.style.display = 'block';
  startBtn.style.pointerEvents = 'none';
  startBtn.style.opacity = '0.3';
  setTimeout(() => {
    startBtn.style.opacity = '1';
    startBtn.style.pointerEvents = 'auto';
  }, 1000);

  guides.innerHTML = `
    <ul>
      <li><i>pause</i> <span>space bar</span></li>
      <li><i>look around</i> <span>mouse_trackpad</span></li>
      <li><i>fullscreen</i> <span>F11</span></li>
      <li><i>mute</i> <span>M</span></li>
    </ul>
  `;
  if (!isMobile()) overlay?.appendChild(guides);
  if (!isMobile()) overlay?.appendChild(duration);
}

export const hideOverlay = () => {
  overlay!.style.opacity = '0';
  setTimeout(() => {
    overlay!.style.display = 'none';
  }, 1000);

  startBtn.style.display = 'none';
}

export const showGuides = () => {
  duration.innerHTML = `
    <span>duration ${timeFormatter(animDuration)}</span>
  `;
  // if (!isMobile()) container?.appendChild(duration);
}