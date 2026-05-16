import '.././styles/style.scss'


/**
 * Initializes the UI preview once the DOM content has fully loaded.
 * Calls `updatePreview()` to reflect the current selection in the UI.
 */
document.addEventListener("DOMContentLoaded", () => {
    updatePreview();
})

/**
 * Reference to the theme preview image element.
 * Used to visually display the currently selected theme.
 */
const themeImg = document.querySelector<HTMLImageElement>('.settings-preview__img img');

/**
 * DOM element displaying the currently selected player.
 */
const selectedPlayer = document.querySelector<HTMLDivElement>('.selected-player');

/**
 * DOM element displaying the currently selected board size.
 */
const selectedBoard = document.querySelector<HTMLDivElement>('.selected-board');

/**
 * DOM element displaying the currently selected theme.
 */
const selectedTheme = document.querySelector<HTMLDivElement>('.selected-theme');

/**
 * Start button that begins the game using the currently selected settings.
 */
const startButton = document.querySelector<HTMLButtonElement>('.selected-settings button');

/**
 * Collection of all radio input elements in the settings UI.
 * Used to capture user selections for theme, player, and board configuration.
 */
const radios = document.querySelectorAll<HTMLInputElement>('input[type="radio"]');

/**
 * Mapping of theme identifiers to human-readable labels.
 */
const themeLabels: Record<string, string> = {
    code: "Code theme",
    game: "Game theme",
    food: "Food theme"
};

/**
 * Mapping of player identifiers to display labels.
 */
const playerLabels: Record<string, string> = {
    blue: "Blue",
    orange: "Orange"
};

/**
 * Mapping of card count values to display labels.
 * The key represents the number of cards in the game.
 */
const cardLabels: Record<string, string> = {
    16: "16 Cards",
    24: "24 Cards",
    36: "36 Cards"
};


/**
 * Returns the value of the currently selected radio input for a given name.
 *
 * @param name - The name of the radio input group.
 * @returns The value of the checked input.
 * @throws If no input in the group is selected.
 */
function getSelectedValue(name:string): string {
    const checked = document.querySelector(`input[name="${name}"]:checked`) as HTMLInputElement;
    return checked.value;
}


/**
 * Updates the settings preview UI based on the currently selected values.
 *
 * Reads the selected theme, player, and board size from the form
 * and updates the corresponding preview elements in the DOM.
 */
function updatePreview() {
    const theme = getSelectedValue("theme");
    const player = getSelectedValue("player");
    const board = getSelectedValue("board");

    if (selectedTheme && selectedPlayer && selectedBoard) {
        selectedTheme.textContent = themeLabels[theme];
        selectedPlayer.textContent = playerLabels[player];
        selectedBoard.textContent = cardLabels[board];
    }

    updateThemeImg(theme);
}


/**
 * Updates the theme preview image based on the selected theme.
 *
 * If the theme image element is not available, the function does nothing.
 *
 * @param theme - The selected theme identifier used to build the image path.
 */
function updateThemeImg(theme: string) {
    if (!themeImg) return;
    themeImg.src = `./assets/img/${theme}-theme-img/${theme}-theme-preview.svg`;
}


/**
 * Updates the preview whenever any radio input value changes.
 *
 * Listens to the "change" event on all radio inputs and refreshes
 * the preview to reflect the current selection.
 */
radios.forEach(radio => {
    radio.addEventListener("change", () => {
        updatePreview();
    });
});


/**
 * Starts the game by saving the current settings to sessionStorage
 * and navigating to the game page.
 *
 * Stores selected theme, player, and board size, then redirects to game.html.
 */
startButton?.addEventListener("click", () => {

    const theme = getSelectedValue("theme");
    const player = getSelectedValue("player");
    const board = getSelectedValue("board");

    sessionStorage.setItem("theme", theme);
    sessionStorage.setItem("player", player);
    sessionStorage.setItem("board", board);

    window.location.href = "./game.html";
});