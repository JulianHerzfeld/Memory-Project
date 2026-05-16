import { Card } from "../models/card";

/**
 * Core game controller handling game state, player turns, scoring,
 * and card matching logic.
 */
export class Game {

    /**
     * First selected card in the current turn.
     */
    firstCard: Card | null = null;

    /**
    * Second selected card in the current turn.
    */
    secondCard: Card | null = null;

    /**
    * Prevents further interactions while cards are being evaluated or animations are running.
    */
    lockBoard = false;

    /**
    * Indicates the currently active player (1 or 2).
    */
    currentPlayer = 1;

    /**
    * Stores the score for both players.
    * Index 0 = Player 1, Index 1 = Player 2.
    */
    scores = [0, 0];

    /**
    * Maps each theme to the corresponding player color assignment.
    *
    * Used to determine which color represents player 1 and player 2 per theme.
    */
    playerColorsByTheme: Record<string, { p1: string; p2: string }> = {
        code: { p1: "blue", p2: "orange" },
        game: { p1: "orange", p2: "blue" },
        food: { p1: "orange", p2: "blue" }
    };

    /**
    * Defines theme-specific assets for representing the current player.
    *
    * Maps each theme to the corresponding icons used for player 1 and player 2 indicators.
    */
    currentPlayerAssets: Record<string, {
        p1: string;
        p2: string;
    }> = {
            code: {
                p1: "./assets/icons/label.svg",
                p2: "./assets/icons/label (1).svg"
            },
            game: {
                p1: "./assets/icons/chess_pawn_curr_orange.svg",
                p2: "./assets/icons/chess_pawn__curr_blue.svg"
            },
            food: {
                p1: "./assets/icons/chess_pawn_curr_orange.svg",
                p2: "./assets/icons/chess_pawn__curr_blue.svg"
            }
        };

    /**
    * Number of successfully matched card pairs in the current game session.
    */
    private matchedPairs = 0;
    
    /**
    * Total number of pairs required to complete the game.
    */
    private totalPairs: number;


    /**
    * Creates a new game instance and initializes core game state.
    *
    * Sets the initial player, updates the UI, and registers the card click handler.
    *
    * @param container - DOM element containing all cards.
    * @param totalPairs - Total number of card pairs in the game.
    */
    constructor(private container: HTMLElement, totalPairs: number) {
        this.totalPairs = totalPairs;
        this.setCurrentPlayer();
        this.updatePlayerUI();
        this.container.addEventListener("cardClicked", (e: any) => {
            this.handleCardClick(e.detail);
        });
    }


    /**
    * Determines and sets the starting player based on stored settings and theme configuration.
    *
    * Reads the selected theme and player from sessionStorage and maps them
    * to the correct internal player index (1 or 2).
    */
    setCurrentPlayer() {
        const theme = sessionStorage.getItem("theme") || "code";
        const playerColors = this.playerColorsByTheme[theme];
        const selectedPlayer = sessionStorage.getItem("player");
        this.currentPlayer =
            selectedPlayer === playerColors.p1 ? 1 : 2;
    }


    /**
    * Handles card selection and manages the turn logic.
    *
    * Stores the first and second selected card, flips them, and triggers match checking.
    * Prevents interaction while the board is locked or the same card is clicked twice.
    *
    * @param card - The card instance that was clicked.
    */
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


    /**
    * Checks whether the two selected cards match.
    *
    * If they match, points are awarded; otherwise, cards are unflipped
    * after a short delay and the turn is switched.
    */
    checkMatch() {
        if (!this.firstCard || !this.secondCard) return;
        if (this.firstCard.data.id === this.secondCard.data.id) {
            this.setPoints();
        } else {
            setTimeout(() => {
                this.firstCard?.unflip();
                this.secondCard?.unflip();
                this.switchPlayer();
                this.resetTurn();
            }, 1000);
        }
    }


    /**
    * Awards a point to the current player when a matching pair is found.
    *
    * Marks both cards as matched, updates score and game state,
    * and checks whether the game has ended.
    */
    setPoints() {
        if (this.firstCard && this.secondCard) {
            this.firstCard.setMatched();
            this.secondCard.setMatched();
            this.matchedPairs++;
            this.scores[this.currentPlayer - 1]++;
            this.updateScoreUI();
            this.checkGameEnd();
            this.resetTurn();
        }
    }


    /**
    * Checks whether the game has ended.
    *
    * If all pairs are matched, stores the final scores in sessionStorage
    * and redirects to the endscreen after a short delay.
    */
    checkGameEnd() {
        if (this.matchedPairs === this.totalPairs) {
            sessionStorage.setItem("score1", this.scores[0].toString());
            sessionStorage.setItem("score2", this.scores[1].toString());

            setTimeout(() => {
                window.location.href = "/memory-project/endscreen.html";
            }, 2000);
        }
    }


    /**
    * Resets the current turn state.
    *
    * Clears selected cards and unlocks the board for the next turn.
    */
    resetTurn() {
        this.firstCard = null;
        this.secondCard = null;
        this.lockBoard = false;
    }


    /**
    * Switches the active player and updates the UI accordingly.
    */
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        this.updatePlayerUI();
    }


    /**
    * Updates the score display in the UI for both players.
    */
    updateScoreUI() {
        const p1 = document.getElementById("score-p-1");
        const p2 = document.getElementById("score-p-2");

        if (p1 && p2) {
            p1.textContent = this.scores[0].toString();
            p2.textContent = this.scores[1].toString();
        }
    }


    /**
    * Updates the UI indicator for the currently active player.
    *
    * Sets the appropriate player icon based on the active player and theme.
    */
    updatePlayerUI() {
        const theme = sessionStorage.getItem("theme") || "code";
        const icon = document.getElementById("current-player-icon") as HTMLImageElement;
        const assets = this.currentPlayerAssets[theme];

        icon.src =
            this.currentPlayer === 1 ? assets.p1 : assets.p2;
    }
}