import type { CardData } from "./card";

export type CardTheme = {
    frontImg: string;
    cards: CardData[];
};

export const themes: Record<string, CardTheme> = {
    code: {
        frontImg: "assets/img/code-theme-img/code-theme-back.svg",
        cards: [
            { id: "angular", img: "assets/img/code-theme-img/code-theme-angular.svg" },
            { id: "bootstrap", img: "assets/img/code-theme-img/code-theme-bootstrap.svg" },
            { id: "cmd", img: "assets/img/code-theme-img/code-theme-cmd.svg" },
            { id: "css", img: "assets/img/code-theme-img/code-theme-css.svg" },
            { id: "database", img: "assets/img/code-theme-img/code-theme-database.svg" },
            { id: "django", img: "assets/img/code-theme-img/code-theme-django.svg" },
            { id: "firebase", img: "assets/img/code-theme-img/code-theme-firebase.svg" },
            { id: "git", img: "assets/img/code-theme-img/code-theme-git.svg" },
            { id: "github", img: "assets/img/code-theme-img/code-theme-github.svg" },
            { id: "html", img: "assets/img/code-theme-img/code-theme-html.svg" },
            { id: "javascript", img: "assets/img/code-theme-img/code-theme-javascript.svg" },
            { id: "node", img: "assets/img/code-theme-img/code-theme-node.svg" },
            { id: "python", img: "assets/img/code-theme-img/code-theme-python.svg" },
            { id: "sass", img: "assets/img/code-theme-img/code-theme-sass.svg" },
            { id: "typescript", img: "assets/img/code-theme-img/code-theme-typescript.svg" },
            { id: "react", img: "assets/img/code-theme-img/code-theme-react.svg" },
            { id: "vscode", img: "assets/img/code-theme-img/code-theme-vscode.svg" },
            { id: "vue", img: "assets/img/code-theme-img/code.theme-vue.svg" }
        ]
    },
    game: {
        frontImg: "assets/img/game-theme-img/game-back.svg",
        cards: [
            { id: "banana", img: "assets/img/game-theme-img/game-banana.svg" },
            { id: "circle", img: "assets/img/game-theme-img/game-circle.svg" },
            { id: "coin", img: "assets/img/game-theme-img/game-coin.svg" },
            { id: "controller", img: "assets/img/game-theme-img/game-controller.svg" },
            { id: "cube", img: "assets/img/game-theme-img/game-cube.svg" },
            { id: "gameboy", img: "assets/img/game-theme-img/game-gameboy.svg" },
            { id: "maze", img: "assets/img/game-theme-img/game-maze.svg" },
            { id: "medal", img: "assets/img/game-theme-img/game-medal.svg" },
            { id: "minecraft", img: "assets/img/game-theme-img/game-minecraft.svg" },
            { id: "ghost", img: "assets/img/game-theme-img/game-pacman-ghost.svg" },
            { id: "pacman", img: "assets/img/game-theme-img/game-pacman.svg" },
            { id: "playbutton", img: "assets/img/game-theme-img/game-playbutton.svg" },
            { id: "playcard", img: "assets/img/game-theme-img/game-playcard.svg" },
            { id: "puzzle", img: "assets/img/game-theme-img/game-puzzle.svg" },
            { id: "shroom", img: "assets/img/game-theme-img/game-shroom.svg" },
            { id: "snake", img: "assets/img/game-theme-img/game-snake.svg" },
            { id: "square", img: "assets/img/game-theme-img/game-square.svg" },
            { id: "triangle", img: "assets/img/game-theme-img/game-triangle.svg" }
        ]
    },
    food: {
        frontImg: "assets/img/food-theme-img/food-theme-back.svg",
        cards: [
            { id: "burger", img: "assets/img/food-theme-img/food-theme-burger.svg" },
            { id: "corndog", img: "assets/img/food-theme-img/food-theme-corndog.svg" },
            { id: "donut", img: "assets/img/food-theme-img/food-theme-donut.svg" },
            { id: "pizza", img: "assets/img/food-theme-img/food-theme-pizza.svg" },
            { id: "sandwich", img: "assets/img/food-theme-img/food-theme-sandwich.svg" },
            { id: "sushi", img: "assets/img/food-theme-img/food-theme-sushi.svg" },
            { id: "chicken", img: "assets/img/food-theme-img/food.theme-chickenwings.svg" },
            { id: "choclate", img: "assets/img/food-theme-img/food.theme-choclate.svg" },
            { id: "fries", img: "assets/img/food-theme-img/food.theme-fries.svg" },
            { id: "icecream", img: "assets/img/food-theme-img/food.theme-icecream.svg" },
            { id: "macaron", img: "assets/img/food-theme-img/food.theme-macaron.svg" },
            { id: "muffin", img: "assets/img/food-theme-img/food.theme-muffin.svg" },
            { id: "pretzel", img: "assets/img/food-theme-img/food.theme-pretzel.svg" },
            { id: "puddingchoc", img: "assets/img/food-theme-img/food.theme-pudding-choc.svg" },
            { id: "puddingvan", img: "assets/img/food-theme-img/food.theme-pudding-vanille.svg" },
            { id: "salat", img: "assets/img/food-theme-img/food.theme-shrimpsalat.svg" },
            { id: "tacco", img: "assets/img/food-theme-img/food.theme-tacco.svg" },
            { id: "wrap", img: "assets/img/food-theme-img/food.theme-wrap.svg" }
        ]
    }
};