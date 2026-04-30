import { Card, CardData } from "../models/card";

export class Board {
    container: HTMLElement;
    frontImg: string;

    constructor(container: HTMLElement, frontImg: string) {
        this.container = container;
        this.frontImg = frontImg;
    }

    init(cards: CardData[]) {
        const doubled = [...cards, ...cards];
        const shuffled = this.shuffle(doubled);

        shuffled.forEach(data => {
            const card = new Card(data, this.frontImg);
            this.container.appendChild(card.element);
        });
    }

    private shuffle(array: CardData[]) {
        return array.sort(() => Math.random() - 0.5);
    }
}