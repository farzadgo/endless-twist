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
  aboutTwo: '',
}


import { startAnim } from "../main";
import { fraction } from "./camera";


// let importedImageModule = 'blabla/images/01-render-cJustus-1.jpg'

let aboutIsShown = false;

const overlay = document.getElementById('overlay');


const iconsStrings = ['☰', '☱','☲', '☳', '☴', '☵', '☶', '☷'];
const getAnIcon = (arr:string[]) => {
  let index = Math.floor(Math.random() * arr.length);
  let selectedIcon: string = arr[index];
  return selectedIcon
}

// --- created and append ---
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
projectTitle.textContent = 'endless twist'

const showAbout = () => {
  aboutBtn.textContent = !aboutIsShown ? '✕' : getAnIcon(iconsStrings);
  startBtn.style.display = !aboutIsShown ? 'none' : 'block';
  // projectTitle.style.display = !aboutIsShown ? 'none' : 'block';

  // <img src="${importedImageModule}" alt="senator-für-ükultur" />
  
  if (!aboutIsShown) {    
    infoDiv!.innerHTML = `
      <section>
        <p>${aboutTexts.aboutOne}</p>
      </section>
      <section>
        <h3> thanks to </h3>
        <p> coming soon... </p>
      </section>
      <section>
        <h3> references </h3>
        <p> coming soon... </p>
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
  if (fraction > 0.99 && fraction < 1.0) {
    startBtn.textContent = 'restart';
  } else {
    startBtn.textContent = 'continue';
  }
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

  startBtn.style.display = 'none';
}