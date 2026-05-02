import '../styles/style.scss';

const theme = sessionStorage.getItem("theme");

if (theme) {
    document.body.dataset.theme = theme;
}

const score1 = Number(sessionStorage.getItem("score1"));
const score2 = Number(sessionStorage.getItem("score2"));

const score1El = document.getElementById("score1");
const score2El = document.getElementById("score2");

if (score1El && score2El) {
    score1El.textContent = score1.toString();
    score2El.textContent = score2.toString();
}

const overlay = document.getElementById("game-over-overlay")!;
const winnerText = document.getElementById("winner-text")!;

let text = "";

if (score1 > score2) {
    text = "Player 1 wins!";
} else if (score2 > score1) {
    text = "Player 2 wins!";
} else {
    text = "Draw";
}


setTimeout(() => {
    winnerText.textContent = text;
    overlay.classList.remove("hidden");
    overlay.classList.add("show");
}, 2000);


document.getElementById("back-to-menu")!
    .addEventListener("click", () => {
        window.location.href = "settings.html";
    });