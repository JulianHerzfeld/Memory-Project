import './styles/style.scss'
import { getStartTemplate } from './templates/start-template';

// document.addEventListener("DOMContentLoaded", () => {
//     renderStartScreen();
// })

// function init() {
//     const page = sessionStorage.getItem("page");
//     if (page === "settings") {
//         renderSettings();
//     }
// }

function renderStartScreen() {
    const app = document.getElementById('app');
    if (app) {
        app.innerHTML = getStartTemplate();
    } 
    
}


function renderSettings() {
    const app = document.getElementById('app');
    if (app) {
        app.innerHTML = getSettingsTemplate();
    }

}