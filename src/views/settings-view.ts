import '.././styles/style.scss'

document.addEventListener("DOMContentLoaded", () => {
    updatePreview();
})


const themeImg = document.querySelector<HTMLImageElement>('.settings-preview__img img');
const selectedPlayer = document.querySelector<HTMLDivElement>('.selected-player');
const selectedBoard = document.querySelector<HTMLDivElement>('.selected-board');
const selectedTheme = document.querySelector<HTMLDivElement>('.selected-theme');
const startButton = document.querySelector<HTMLButtonElement>('.selected-settings button');
const radios = document.querySelectorAll<HTMLInputElement>('input[type="radio"]');


function getSelectedValue(name:string): string {
    const checked = document.querySelector(`input[name="${name}"]:checked`) as HTMLInputElement;
    return checked.value;
}


function updatePreview() {
    const theme = getSelectedValue("theme");
    const player = getSelectedValue("player");
    const board = getSelectedValue("board");

    if (selectedTheme && selectedPlayer && selectedBoard) {
        selectedTheme.textContent = theme + " theme";
        selectedPlayer.textContent = player;
        selectedBoard.textContent = board;
    }

    updateThemeImg(theme);
}


function updateThemeImg(theme: string) {
    if (!themeImg) return;
    themeImg.src = `public/assets/img/${theme}-theme-img/${theme}-theme-preview.svg`;
}


radios.forEach(radio => {
    radio.addEventListener("change", () => {
        updatePreview();
    });
});


startButton?.addEventListener("click", () => {

    const theme = getSelectedValue("theme");
    const player = getSelectedValue("player");
    const board = getSelectedValue("board");

    sessionStorage.setItem("theme", theme);
    sessionStorage.setItem("theme", player);
    sessionStorage.setItem("theme", board);

    window.location.href = "";              //game.html
})