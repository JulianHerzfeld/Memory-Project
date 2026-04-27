import { Card, CardData } from "../models/card";

export class Board {
    container: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;
    }

    init(cards: CardData[]) {
        const doubled = [...cards, ...cards];
        const shuffled = this.shuffle(doubled);

        shuffled.forEach(data => {
            const card = new Card(data);
            this.container.appendChild(card.element);
        });
    }

    private shuffle(array: CardData[]) {
        return array.sort(() => Math.random() - 0.5);
    }
}