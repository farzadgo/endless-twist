import './style.css'
// import typescriptLogo from './typescript.svg'
import speicherPlaceholder from './assets/container.jpg'
// import { setupCounter } from './counter'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="loading">
      <p>endless twist</p>
      <p>coming soon</p>
    </div>
    <div class="bg">
      <img src="${speicherPlaceholder}" alt="speicher" />
    </div>
  </div>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
