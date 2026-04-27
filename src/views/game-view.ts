import '../styles/style.scss'


const theme = sessionStorage.getItem("theme") as Theme;
const player = sessionStorage.getItem("player");
const board = sessionStorage.getItem("board");

const dialog = document.getElementById("game-dialog") as HTMLDialogElement;
const openBtn = document.getElementById("open-btn") as HTMLButtonElement;
const closeBtn = document.getElementById("close-btn") as HTMLButtonElement;

document.addEventListener("DOMContentLoaded", () => {
    loadGame();
})


function loadGame() {
    if (theme) {
        document.body.dataset.theme = theme;
        updateThemeAssets(theme);
    }
}


type Theme = "code" | "game" | "food";

const themeAssets: Record<Theme, {
    player1: string;
    player2: string;
    currentPlayer: string;
}> = {
    code: {
        player1: "public/assets/icons/label.svg",
        player2: "public/assets/icons/label (1).svg",
        currentPlayer: "public/assets/icons/label (1).svg"
    },
    game: {
        player1: "public/assets/icons/chess_pawn.svg",
        player2: "public/assets/icons/chess_pawn (1).svg",
        currentPlayer: "public/assets/icons/chess_pawn.svg"
    },
    food: {
        player1: "public/assets/icons/label.svg",
        player2: "public/assets/icons/label (1).svg",
        currentPlayer: "public/assets/icons/label (1).svg"
    }
};


function updateThemeAssets(theme: Theme) {
  const assets = themeAssets[theme];

  const player1 = document.getElementById("player-1") as HTMLImageElement | null;
  const player2 = document.getElementById("player-2") as HTMLImageElement | null;
  const currentPlayer = document.getElementById("current-player-icon") as HTMLImageElement | null;

  if (player1) player1.src = assets.player1;
  if (player2) player2.src = assets.player2;
  if (currentPlayer) currentPlayer.src = assets.currentPlayer;
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

