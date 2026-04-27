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

const themeLabels: Record<string, string> = {
    code: "Code theme",
    game: "Game theme",
    food: "Food theme"
};

const playerLabels: Record<string, string> = {
    blue: "Blue",
    orange: "Orange"
};

const cardLabels: Record<string, string> = {
    16: "16 Cards",
    24: "24 Cards",
    36: "36 Cards"
};


function getSelectedValue(name:string): string {
    const checked = document.querySelector(`input[name="${name}"]:checked`) as HTMLInputElement;
    return checked.value;
}


function updatePreview() {
    const theme = getSelectedValue("theme");
    const player = getSelectedValue("player");
    const board = getSelectedValue("board");

    if (selectedTheme && selectedPlayer && selectedBoard) {
        selectedTheme.textContent = themeLabels[theme];
        selectedPlayer.textContent = playerLabels[player];
        selectedBoard.textContent = cardLabels[board];
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
    sessionStorage.setItem("player", player);
    sessionStorage.setItem("board", board);

    window.location.href = "game.html";              //game.html
})