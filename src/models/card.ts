export type CardData = {
    id: string;
    img: string;
}

export class Card {
    element: HTMLElement;
    data: CardData;
    isFlipped = false;

    constructor(data: CardData) {
        this.data = data;
        this.element = this.createElement();

        this.element.addEventListener("click", () => {
            this.flip();
        });
    }

    private createElement(): HTMLElement {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>

                <div class="card-back">
                    <img src="${this.data.img}" alt="${this.data.id}">
                </div>
            </div>
        `;

        return card;
    }

    flip() {
        this.isFlipped = !this.isFlipped;
        this.element.classList.toggle("flipped", this.isFlipped);
    }
}