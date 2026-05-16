/**
 * Represents a single card used in the game.
 */
export type CardData = {
    id: string;
    img: string;
}

/**
 * Represents a single game card with flip and match state.
 *
 * Handles DOM creation and click interaction for flipping behavior.
 */
export class Card {
    element: HTMLElement;
    data: CardData;
    isFlipped = false;
    isMatched = false;
    frontImg: string;

    constructor(data: CardData, frontImg: string) {
        this.data = data;
        this.frontImg = frontImg;
        this.element = this.createElement();

        this.element.addEventListener("click", () => {
            this.handleClick();
        });
    }

    /**
     * Creates the DOM structure for the card element.
     *
     * @returns The fully constructed card HTMLElement.
     */
    private createElement(): HTMLElement {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card__inner">
                <div class="card__front">
                    <img src="${this.frontImg}" alt="front">
                </div>

                <div class="card__front card__front--back">
                    <img src="${this.data.img}" alt="${this.data.id}">
                </div>
            </div>
        `;

        return card;
    }


    /**
    * Handles the user interaction when a card is clicked.
    *
    * Prevents interaction if the card is already flipped or matched,
    * otherwise dispatches a custom "cardClicked" event.
    */
    handleClick() {
        if (this.isFlipped || this.isMatched) return;
        this.element.dispatchEvent(
            new CustomEvent("cardClicked", { detail: this, bubbles: true })
        );
    }


    /**
    * Flips the card to reveal its front side.
    *
    * Updates the internal state and applies the "flipped" CSS class.
    */
    flip() {
        this.isFlipped = true;
        this.element.classList.add("flipped");
    }


    /**
    * Flips the card back to its hidden state.
    *
    * Updates the internal state and removes the "flipped" CSS class.
    */
    unflip() {
        this.isFlipped = false;
        this.element.classList.remove("flipped");
    }


    /**
    * Marks the card as matched.
    *
    * Updates internal state and applies the "matched-card" CSS class.
    */
    setMatched() {
        this.isMatched = true;
        this.element.classList.add("matched-card");
    }
}