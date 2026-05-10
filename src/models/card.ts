export type CardData = {
    id: string;
    img: string;
}

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

    handleClick() {
        if (this.isFlipped || this.isMatched) return;
        this.element.dispatchEvent(
            new CustomEvent("cardClicked", { detail: this, bubbles: true})
        );
    }

    flip() {
        this.isFlipped = true;
        this.element.classList.add("flipped");
    }

    unflip() {
        this.isFlipped = false;
        this.element.classList.remove("flipped");
    }

    setMatched() {
        this.isMatched = true;
        this.element.classList.add("matched-card");
    }
}