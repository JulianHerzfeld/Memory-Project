import '../styles/style.scss';
import { Theme } from '../views/game-view';

const theme = sessionStorage.getItem("theme") as Theme;

if (theme) {
    document.body.dataset.theme = theme;
}

const score1 = Number(sessionStorage.getItem("score1"));
const score2 = Number(sessionStorage.getItem("score2"));
const score1El = document.getElementById("score1");
const score2El = document.getElementById("score2");
const headerImg = document.getElementById("game-over-img") as HTMLImageElement;
const player1Img = document.getElementById("player-1") as HTMLImageElement;
const player2Img = document.getElementById("player-2") as HTMLImageElement;
const winnerIcon = document.getElementById("winner-icon") as HTMLImageElement;

const endThemes = {
    code: {
        header: "public/assets/img/code-theme-img/code-theme-game-over.svg",
        p1: "assets/icons/label.svg",
        p2: "assets/icons/label (1).svg",
        textContentP1: "BLUE PLAYER",
        textContentP2: "ORANGE PLAYER",
        winColorP1: "winner-b",
        winColorP2: "winner-o",
        winColorD: "draw",
        winnerIconP1: "public/assets/img/code-theme-img/code-theme-blue-win.svg",
        winnerIconP2: "public/assets/img/code-theme-img/code-theme-orange-win.svg"
    },
    game: {
        header: "public/assets/img/game-theme-img/game-theme-game-over.svg",
        p1: "assets/icons/chess_pawn.svg",
        p2: "assets/icons/chess_pawn (1).svg",
        textContentP1: "Orange Player",
        textContentP2: "Blue Player",
        winColorP1: "winner-o",
        winColorP2: "winner-b",
        winColorD: "draw",
        winnerIconP1: "public/assets/img/game-theme-img/game-theme-trophy.svg",
        winnerIconP2: "public/assets/img/game-theme-img/game-theme-trophy.svg"
    },
    food: {
        header: "public/assets/img/food-theme-img/food-theme-game-over.svg",
        p1: "assets/icons/chess_pawn.svg",
        p2: "assets/icons/chess_pawn (1).svg",
        textContentP1: "Orange Player",
        textContentP2: "Blue Player",
        winColorP1: "winner-o",
        winColorP2: "winner-b",
        winColorD: "draw",
        winnerIconP1: "public/assets/img/food-theme-img/food-theme-orange-win.svg",
        winnerIconP2: "public/assets/img/food-theme-img/food-theme-blue-win.svg"
    }
} as const;

const currentTheme = endThemes[theme as keyof typeof endThemes];

headerImg.src = currentTheme.header;
player1Img.src = currentTheme.p1;
player2Img.src = currentTheme.p2;


if (score1El && score2El) {
    score1El.textContent = score1.toString();
    score2El.textContent = score2.toString();
}

const overlay = document.getElementById("game-over-overlay")!;
const winnerText = document.getElementById("winner-text")!;

let text = "";
let cssClass = "";


if (score1 > score2) {
    text = endThemes[theme].textContentP1;
    cssClass = endThemes[theme].winColorP1;
    winnerIcon.src = endThemes[theme].winnerIconP1;
} else if (score2 > score1) {
    text = endThemes[theme].textContentP2;
    cssClass = endThemes[theme].winColorP2;
    winnerIcon.src = endThemes[theme].winnerIconP2;
} else {
    text = "Draw";
    cssClass = endThemes[theme].winColorD;
}


setTimeout(() => {
    winnerText.textContent = text;
    winnerText.classList.remove("winner-b", "winner-o", "draw");
    winnerText.classList.add(cssClass);
    overlay.classList.remove("hidden");
    overlay.classList.add("show");
}, 2500);


document.getElementById("back-to-menu")!
    .addEventListener("click", () => {
        window.location.href = "settings.html";
    });