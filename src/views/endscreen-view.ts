import '../styles/style.scss';
import { Theme } from '../views/game-view';

/**
 * Initializes endscreen-related UI logic after the DOM is fully loaded.
 *
 * Applies theme-specific body styling and updates theme-dependent images.
 */
document.addEventListener('DOMContentLoaded', () => {
    if (theme === "food") {
        document.body.classList.add("endscreen");
    }
    setCurrentThemeImgs();
})

/**
 * Active theme retrieved from sessionStorage.
 */
const theme = sessionStorage.getItem("theme") as Theme;

/**
 * Applies the stored theme to the document body via data attribute.
 */
if (theme) {
    document.body.dataset.theme = theme;
}

/**
 * Score of player 1 retrieved from sessionStorage.
 */
const score1 = Number(sessionStorage.getItem("score1"));

/**
 * Score of player 2 retrieved from sessionStorage.
 */
const score2 = Number(sessionStorage.getItem("score2"));

/**
 * DOM element displaying player 1 score.
 */
const score1El = document.getElementById("score1");

/**
 * DOM element displaying player 2 score.
 */
const score2El = document.getElementById("score2");

/**
 * Image element shown in the game over header.
 */
const headerImg = document.getElementById("game-over-img") as HTMLImageElement;

/**
 * Image element representing player 1 avatar/icon.
 */
const player1Img = document.getElementById("player-1") as HTMLImageElement;

/**
 * Image element representing player 2 avatar/icon.
 */
const player2Img = document.getElementById("player-2") as HTMLImageElement;

/**
 * Image element used to display the winner icon.
 */
const winnerIcon = document.getElementById("winner-icon") as HTMLImageElement;

/**
 * Configuration object defining endscreen assets and UI labels per theme.
 *
 * Contains image paths, text content, winner styling classes, and button labels
 * used to render the game-over screen depending on the selected theme.
 */
const endThemes = {
    code: {
        header: "./assets/img/code-theme-img/code-theme-game-over.svg",
        p1: "assets/icons/label.svg",
        p2: "assets/icons/label (1).svg",
        textContentP1: "BLUE PLAYER",
        textContentP2: "ORANGE PLAYER",
        winColorP1: "winner-b",
        winColorP2: "winner-o",
        winColorD: "draw",
        winnerIconP1: "./assets/img/code-theme-img/code-theme-blue-win.svg",
        winnerIconP2: "./assets/img/code-theme-img/code-theme-orange-win.svg",
        draw: "./assets/img/code-theme-img/draw_code.svg",
        btnText: "Back to Start"
    },
    game: {
        header: "./assets/img/game-theme-img/game-theme-game-over.svg",
        p1: "assets/icons/chess_pawn.svg",
        p2: "assets/icons/chess_pawn (1).svg",
        textContentP1: "Orange Player",
        textContentP2: "Blue Player",
        winColorP1: "winner-o",
        winColorP2: "winner-b",
        winColorD: "draw",
        winnerIconP1: "./assets/img/game-theme-img/game-theme-trophy.svg",
        winnerIconP2: "./assets/img/game-theme-img/game-theme-trophy.svg",
        draw: "./assets/img/game-theme-img/draw_game.svg",
        btnText: "Home"
    },
    food: {
        header: "./assets/img/food-theme-img/food-theme-game-over.svg",
        p1: "assets/icons/chess_pawn.svg",
        p2: "assets/icons/chess_pawn (1).svg",
        textContentP1: "Orange Player",
        textContentP2: "Blue Player",
        winColorP1: "winner-o",
        winColorP2: "winner-b",
        winColorD: "draw",
        winnerIconP1: "./assets/img/food-theme-img/food-theme-orange-win.svg",
        winnerIconP2: "./assets/img/food-theme-img/food-theme-blue-win.svg",
        draw: "./assets/img/food-theme-img/draw_food.svg",
        btnText: "Home"
    }
} as const;

/**
 * Theme-specific configuration for the endscreen UI.
 *
 * Selects the correct theme configuration from `endThemes`
 * based on the currently active theme.
 */
const currentTheme = endThemes[theme as keyof typeof endThemes];


/**
 * Applies the selected theme assets to the endscreen images.
 *
 * Updates header and player icons based on the current theme configuration.
 */
function setCurrentThemeImgs() {
    headerImg.src = currentTheme.header;
    player1Img.src = currentTheme.p1;
    player2Img.src = currentTheme.p2;
}



/**
 * Updates the displayed player scores in the UI.
 *
 * Converts stored numeric scores into text content for the score elements.
 */
if (score1El && score2El) {
    score1El.textContent = score1.toString();
    score2El.textContent = score2.toString();
}

/**
 * Overlay element shown on the game-over screen.
 */
const overlay = document.getElementById("game-over-overlay")!;

/**
 * Element displaying the winner text.
 */
const winnerText = document.getElementById("winner-text")!;

/**
 * Element displaying the winner text headline.
 */
const winnerTextHead = document.getElementById("winner-text-head")!;

/**
 * Button that navigates back to the start/menu screen.
 */
const backToStartBtn = document.getElementById("back-to-menu")!;

/**
 * Confetti animation element used on the game-over screen.
 */
const confetti = document.getElementById("confetti-game-theme")!;

/**
 * Image element used to display the draw/winner icon.
 */
const drawImg = document.getElementById("winner-icon")!;

/**
 * Text content used for displaying the game result (win/draw message).
 */
let text = "";

/**
 * CSS class applied to style the winner/draw state.
 */
let cssClass = "";

/**
 * Text content for the back/navigation button on the end screen.
 */
let btnText = "";


/**
 * Determines the game result (win/lose/draw) based on player scores
 * and applies the corresponding theme assets and UI state.
 */
if (score1 > score2) {
    text = endThemes[theme].textContentP1;
    cssClass = endThemes[theme].winColorP1;
    winnerIcon.src = endThemes[theme].winnerIconP1;
} else if (score2 > score1) {
    text = endThemes[theme].textContentP2;
    cssClass = endThemes[theme].winColorP2;
    winnerIcon.src = endThemes[theme].winnerIconP2;
} else {
    setDrawContent();
}


/**
 * Applies the UI state for a draw result.
 *
 * Sets draw-specific text, styles, and visibility changes
 * for the endscreen elements.
 */
function setDrawContent() {
    text = "DRAW";
    cssClass = endThemes[theme].winColorD;
    winnerIcon.src = endThemes[theme].draw;
    winnerTextHead.textContent = "It's a";
    winnerTextHead.classList.add("winner-text-draw");
    drawImg.classList.add("m-t-0");
    confetti.classList.add("d-none");
}


/**
 * Delays rendering of the final game-over UI state.
 *
 * After a short timeout, updates winner text, styles, button label,
 * and reveals the endscreen overlay.
 */
setTimeout(() => {
    btnText = endThemes[theme].btnText;
    winnerText.textContent = text;
    winnerText.classList.remove("winner-b", "winner-o", "draw");
    winnerText.classList.add(cssClass);
    backToStartBtn.textContent = btnText;
    overlay.classList.remove("hidden");
    overlay.classList.add("show");
}, 2500);


/**
 * Navigates back to the settings/menu screen when the button is clicked.
 */
document.getElementById("back-to-menu")!
    .addEventListener("click", () => {
        window.location.href = "settings.html";
    });