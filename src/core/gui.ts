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


import { container, ended, startAnim } from "../main";

const overlay = document.getElementById('overlay');

const startBtn = document.createElement('button');
startBtn.className = 'start';
startBtn.textContent = 'start';


export const updateUI = () => {  
  // let startBtnContent = _totalTime ? 'continue' : 'start';
  if (ended) {
    startBtn.textContent = 'reload';
  } else {
    startBtn.textContent = 'continue';
  }
}


export const showOverlay = () => {

  startBtn?.addEventListener('click', startAnim);
  container?.appendChild(startBtn);

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