import '../styles/style.scss';
import { Board } from '../game/board';
import { themes } from '../models/card-themes';
import { CardData } from '../models/card';
import { Game } from '../game/game';

/**
 * Initializes the game once the DOM content is fully loaded.
 *
 * Loads the game state and sets up dialog-related event handlers.
 */
document.addEventListener("DOMContentLoaded", () => {
    loadGame();
    setDialogClickEvents();
})

/**
 * Currently selected theme retrieved from sessionStorage.
 */
const theme = sessionStorage.getItem("theme") as Theme;

/**
 * Currently selected player retrieved from sessionStorage.
 */
const player = sessionStorage.getItem("player");

/**
 * Container element that holds all game cards.
 */
const container = document.getElementById("card-content") as HTMLElement;

/**
 * Game dialog element used for in-game modal interactions.
 */
const dialog = document.getElementById("game-dialog") as HTMLDialogElement;

/**
 * Button that opens the game dialog.
 */
const openBtn = document.getElementById("open-btn") as HTMLButtonElement;

/**
 * Button that closes the game dialog.
 */
const closeBtn = document.getElementById("close-btn") as HTMLButtonElement;


/**
 * Initializes the game setup.
 *
 * Applies the selected theme and renders the game cards.
 */
function loadGame() {
    setTheme();
    renderCards();
}


/**
 * Applies the selected theme to the application.
 *
 * Sets the theme on the document body and updates related assets.
 */
function setTheme() {
    if (theme) {
        document.body.dataset.theme = theme;
        updateThemeAssets(theme);
    }
}


/**
 * Renders the game board and initializes cards based on the selected theme and board size.
 *
 * Determines how many card pairs are needed, selects the appropriate subset of theme cards,
 * creates the board and game instances, and initializes the card layout.
 */
function renderCards() {
    let boardSize = getBoardSize();
    const maxPairs = themes[theme].cards.length;
    const neededPairs = boardSize / 2;
    const pairsToUse = Math.min(neededPairs, maxPairs);
    const selectedCards: CardData[] = themes[theme].cards.slice(0, pairsToUse);
    const board = new Board(container, themes[theme].frontImg);
    const game = new Game(container, pairsToUse);
    setCardContainerSize(boardSize);
    board.init(selectedCards);
}


/**
 * Sets the grid layout size of the card container based on the board size.
 *
 * Adjusts number of columns and spacing depending on the selected board configuration.
 *
 * @param boardSize - Total number of cards on the board.
 */
function setCardContainerSize(boardSize: Number) {
    let columns = 4;
    let gap = 16;

    if (boardSize === 24 || boardSize === 36) {
        columns = 6;
        gap = 6;
    }

    container.style.gridTemplateColumns = `repeat(${columns}, var(--card-w))`;
    container.style.gap = `${gap}px`;
}


/**
 * Available theme identifiers used throughout the application.
 */
export type Theme = "code" | "game" | "food";

/**
 * Asset configuration mapped to each theme.
 *
 * Defines UI icons and text labels used for players, status indicators,
 * and dialog actions depending on the active theme.
 */
export const themeAssets: Record<Theme, {
    player1: string;
    player2: string;
    currentPlayer: string;
    blue: string;
    orange: string;
    backText: string;
    quitText: string;
}> = {
    code: {
        player1: "./assets/icons/label.svg",
        player2: "./assets/icons/label (1).svg",
        currentPlayer: "./assets/icons/label (1).svg",
        blue: "./assets/icons/label.svg",
        orange: "./assets/icons/label (1).svg",
        backText: "Back to game",
        quitText: "Exit game"
    },
    game: {
        player1: "./assets/icons/chess_pawn.svg",
        player2: "./assets/icons/chess_pawn (1).svg",
        currentPlayer: "./assets/icons/chess_pawn.svg",
        blue: "./assets/icons/chess_pawn (1).svg",
        orange: "./assets/icons/chess_pawn.svg",
        backText: "No, back to game",
        quitText: "Yes, quit game"
    },
    food: {
        player1: "./assets/icons/chess_pawn.svg",
        player2: "./assets/icons/chess_pawn (1).svg",
        currentPlayer: "./assets/icons/chess_pawn.svg",
        blue: "./assets/icons/chess_pawn (1).svg",
        orange: "./assets/icons/chess_pawn.svg",
        backText: "NO, BACK TO GAME",
        quitText: "EXIT GAME"
    }
};


/**
 * Updates all theme-dependent UI assets.
 *
 * Applies player styling, current player positioning, and updates
 * dialog button text based on the selected theme.
 *
 * @param theme - The active theme used to determine UI assets.
 */
function updateThemeAssets(theme: Theme) {
    const backBtnText = document.getElementById("close-btn") as HTMLButtonElement | null;
    const quitBtnText = document.getElementById("dialog-quit-btn") as HTMLElement | null;

    setPlayerColor();
    setCurrentPlayerPosition();

    if (backBtnText && quitBtnText) {
        setBtnText(backBtnText, quitBtnText);
    }
}


/**
 * Updates player-related UI icons based on the currently active theme.
 *
 * Sets the correct assets for player 1, player 2, and the current player indicator.
 */
function setPlayerColor() {
    const assets = themeAssets[theme];
    const player1 = document.getElementById("player-1") as HTMLImageElement | null;
    const player2 = document.getElementById("player-2") as HTMLImageElement | null;
    const currentPlayer = document.getElementById("current-player-icon") as HTMLImageElement | null;

    if (player1) player1.src = assets.player1;
    if (player2) player2.src = assets.player2;
    if (currentPlayer) {
        setCurrentPlayerColor(currentPlayer);
    }
}


/**
 * Sets the current player indicator icon based on the selected player and theme.
 *
 * Updates the image source to match the configured theme assets for the active player.
 *
 * @param currentPlayer - The image element representing the current player icon.
 */
function setCurrentPlayerColor(currentPlayer: HTMLImageElement) {
    const assets = themeAssets[theme];

    if (player === "blue") {
        currentPlayer.src = assets.blue;
    } else if (player === "orange") {
        currentPlayer.src = assets.orange;
    } else {
        currentPlayer.src = assets.player1;
    }
}


/**
 * Adjusts the position of the current player UI element based on the active theme.
 *
 * Applies theme-specific layout adjustments to align the current player indicator.
 */
function setCurrentPlayerPosition() {
    const currentPlayer = document.getElementById('game-current-player') as HTMLElement;
    if (theme === "code") {
        currentPlayer.style.paddingRight = "80px";
    }
}


/**
 * Updates dialog button text based on the active theme.
 *
 * Sets localized or theme-specific labels for the back and quit buttons.
 *
 * @param backBtnText - Button element for returning to the game.
 * @param quitBtnText - Element representing the quit/exit action button text.
 */
function setBtnText(backBtnText: HTMLButtonElement, quitBtnText: HTMLElement) {
    const assets = themeAssets[theme];

    if (backBtnText) {
        backBtnText.textContent = assets.backText;
    }
    if (quitBtnText) {
        quitBtnText.textContent = assets.quitText;
    }
}


/**
 * Retrieves the selected board size from session storage.
 *
 * Also applies layout adjustments to the game header depending on the board size.
 *
 * @returns The number of cards for the current game board (default: 16).
 */
function getBoardSize(): number {
    const gameHeader = document.getElementById("game-view-header") as HTMLElement;
    const boardSize = parseInt(sessionStorage.getItem("board") || "16");
    if (gameHeader) {
        if (boardSize === 36) {
            gameHeader.classList.add("game-header-margin-b");
        }
    }
    return boardSize;
}


/**
 * Initializes all dialog-related event handlers.
 *
 * Registers open, close, and general dialog interaction events.
 */
function setDialogClickEvents() {
    dialogOpenEvent();
    dialogCloseEvent();
    dialogEvent();
}


/**
 * Registers the event handler for opening the game dialog.
 *
 * Opens the dialog in modal mode when the open button is clicked.
 */
function dialogOpenEvent() {
    openBtn?.addEventListener("click", () => {
        dialog.showModal();
    });
}


/**
 * Registers the event handler for closing the game dialog.
 *
 * Closes the dialog when the close button is clicked.
 */
function dialogCloseEvent() {
    closeBtn?.addEventListener("click", () => {
        if (!dialog) return;
        closeDialog();
    });
}


/**
 * Registers an event handler to close the dialog when clicking outside of it.
 *
 * Detects pointer position relative to the dialog bounding box and closes
 * the dialog if the click occurs outside its boundaries.
 */
function dialogEvent() {
    dialog.addEventListener("click", (event) => {
        const rect = dialog.getBoundingClientRect();

        if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
        ) {
            closeDialog();
        }
    });
}


/**
 * Closes the game dialog with a closing animation.
 *
 * Adds a CSS class to trigger the animation and closes the dialog
 * after the animation has finished.
 */
function closeDialog() {
    dialog.classList.add("closing");

    dialog.addEventListener(
        "animationend",
        () => {
            dialog.classList.remove("closing");
            dialog.close();
        },
        { once: true }
    );
}