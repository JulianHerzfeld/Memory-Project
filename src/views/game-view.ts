import '../styles/style.scss';
import { Board } from '../game/board';
import { themes } from '../models/card-themes';
import { CardData } from '../models/card';
import { Game } from '../game/game';

document.addEventListener("DOMContentLoaded", () => {
    loadGame();
})

const theme = sessionStorage.getItem("theme") as Theme;
const player = sessionStorage.getItem("player");
const board = sessionStorage.getItem("board");

const container = document.getElementById("card-content") as HTMLElement;
const dialog = document.getElementById("game-dialog") as HTMLDialogElement;
const openBtn = document.getElementById("open-btn") as HTMLButtonElement;
const closeBtn = document.getElementById("close-btn") as HTMLButtonElement;



function loadGame() {
    setTheme();
    renderCards();
}


function setTheme() {
    if (theme) {
        document.body.dataset.theme = theme;
        updateThemeAssets(theme);
    }
}


function renderCards() {
    let boardSize = getBoardSize();
    const maxPairs = themes[theme].cards.length;
    const neededPairs = boardSize / 2;
    const pairsToUse = Math.min(neededPairs, maxPairs);
    const selectedCards: CardData[] = themes[theme].cards.slice(0, pairsToUse);
    const board = new Board(container, themes[theme].frontImg);
    const game = new Game(container);
    board.init(selectedCards);
}


type Theme = "code" | "game" | "food";

const themeAssets: Record<Theme, {
    player1: string;
    player2: string;
    currentPlayer: string;
    blue: string;
    orange: string;
}> = {
    code: {
        player1: "public/assets/icons/label.svg",
        player2: "public/assets/icons/label (1).svg",
        currentPlayer: "public/assets/icons/label (1).svg",
        blue: "public/assets/icons/label.svg",
        orange: "public/assets/icons/label (1).svg"
    },
    game: {
        player1: "public/assets/icons/chess_pawn.svg",
        player2: "public/assets/icons/chess_pawn (1).svg",
        currentPlayer: "public/assets/icons/chess_pawn.svg",
        blue: "public/assets/icons/chess_pawn (1).svg",
        orange: "public/assets/icons/chess_pawn.svg"
    },
    food: {
        player1: "public/assets/icons/chess_pawn.svg",
        player2: "public/assets/icons/chess_pawn (1).svg",
        currentPlayer: "public/assets/icons/chess_pawn.svg",
        blue: "public/assets/icons/chess_pawn (1).svg",
        orange: "public/assets/icons/chess_pawn.svg"
    }
};


function updateThemeAssets(theme: Theme) {
    const assets = themeAssets[theme];

    const player1 = document.getElementById("player-1") as HTMLImageElement | null;
    const player2 = document.getElementById("player-2") as HTMLImageElement | null;
    const currentPlayer = document.getElementById("current-player-icon") as HTMLImageElement | null;

    if (player1) player1.src = assets.player1;
    if (player2) player2.src = assets.player2;
    if (currentPlayer) {
        if (player === "blue") {
            currentPlayer.src = assets.blue;
        } else if (player === "orange") {
            currentPlayer.src = assets.orange;
        } else {
            currentPlayer.src = assets.player1;
        }
    }
}


function getBoardSize(): number {
    return parseInt(sessionStorage.getItem("board") || "16");
}


// Dialog ___________________________________________________________

openBtn.addEventListener("click", () => {
    dialog.showModal();
});


closeBtn?.addEventListener("click", () => {
    if (!dialog) return;
    closeDialog();
});


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

// Dialog __________________________________________________________________________________________

