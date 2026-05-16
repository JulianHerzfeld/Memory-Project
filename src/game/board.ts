import { Card, CardData } from "../models/card";

/**
 * Represents the game board responsible for rendering and managing cards.
 */
export class Board {
    container: HTMLElement;
    frontImg: string;

    constructor(container: HTMLElement, frontImg: string) {
        this.container = container;
        this.frontImg = frontImg;
    }

    /**
     * Initializes the board by duplicating, shuffling, and rendering cards.
     *
     * @param cards - The base set of card data used to build pairs.
     */
    init(cards: CardData[]) {
        const doubled = [...cards, ...cards];
        const shuffled = this.shuffle(doubled);

        shuffled.forEach(data => {
            const card = new Card(data, this.frontImg);
            this.container.appendChild(card.element);
        });
    }

    /**
     * Shuffles an array of cards using a random sort comparator.
     *
     * @param array - The array of card data to shuffle.
     * @returns A new shuffled array of cards.
     */
    private shuffle(array: CardData[]) {
        return array.sort(() => Math.random() - 0.5);
    }
}