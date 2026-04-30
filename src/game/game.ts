import { Card } from "../models/card";

export class Game {
    firstCard: Card | null = null;
    secondCard: Card | null = null;
    lockBoard = false;

    currentPlayer = 1;
    scores = [0, 0];

    playerColorsByTheme: Record<string, { p1: string; p2: string }> = {
        code: { p1: "blue", p2: "orange" },
        game: { p1: "orange", p2: "blue" },
        food: { p1: "orange", p2: "blue" }
    };

    currentPlayerAssets: Record<string, {
        p1: string;
        p2: string;
    }> = {
            code: {
                p1: "public/assets/icons/label.svg",
                p2: "public/assets/icons/label (1).svg"
            },
            game: {
                p1: "public/assets/icons/chess_pawn.svg",
                p2: "public/assets/icons/chess_pawn (1).svg"
            },
            food: {
                p1: "public/assets/icons/chess_pawn.svg",
                p2: "public/assets/icons/chess_pawn (1).svg"
            }
        };


    constructor(private container: HTMLElement) {
        this.setCurrentPlayer();
        this.updatePlayerUI();
        this.container.addEventListener("cardClicked", (e: any) => {
            this.handleCardClick(e.detail);
        });
    }


    setCurrentPlayer() {
        const theme = sessionStorage.getItem("theme") || "code";
        const playerColors = this.playerColorsByTheme[theme];
        const selectedPlayer = sessionStorage.getItem("player");
        this.currentPlayer =
            selectedPlayer === playerColors.p1 ? 1 : 2;
    }


    handleCardClick(card: Card) {
        if (this.lockBoard) return;
        if (card === this.firstCard) return;
        if (!this.firstCard) {
            this.firstCard = card;
            card.flip();
            return;
        }

        this.secondCard = card;
        card.flip();
        this.lockBoard = true;

        this.checkMatch();
    }

    checkMatch() {
        if (!this.firstCard || !this.secondCard) return;

        if (this.firstCard.data.id === this.secondCard.data.id) {
            this.firstCard.setMatched();
            this.secondCard.setMatched();

            this.scores[this.currentPlayer - 1]++;
            this.updateScoreUI();
            this.resetTurn();
        } else {
            setTimeout(() => {
                this.firstCard?.unflip();
                this.secondCard?.unflip();
                this.switchPlayer();
                this.resetTurn();
            }, 1000);
        }
    }

    resetTurn() {
        this.firstCard = null;
        this.secondCard = null;
        this.lockBoard = false;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        this.updatePlayerUI();
    }

    updateScoreUI() {
        const p1 = document.getElementById("score-p-1");
        const p2 = document.getElementById("score-p-2");

        if (p1 && p2) {
            p1.textContent = this.scores[0].toString();
            p2.textContent = this.scores[1].toString();
        }
    }

    updatePlayerUI() {
        const theme = sessionStorage.getItem("theme") || "code";
        const icon = document.getElementById("current-player-icon") as HTMLImageElement;
        const assets = this.currentPlayerAssets[theme];

        icon.src =
            this.currentPlayer === 1 ? assets.p1 : assets.p2;
    }
}