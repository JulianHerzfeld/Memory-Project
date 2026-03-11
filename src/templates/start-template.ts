export function getStartTemplate() {
    return `
        <div class="main-page">
            <div class="headline">
                <h3>It's play time.</h3>
                <h1>Ready to play?</h1>
            </div>
            <button onclick="renderSettings()" class="main-start-button"><img class="controller-icon-button" src="public/assets/icons/controller-icon-main.svg"
                    alt="controller icon">Play <img class="arrow-icon-button" src="public/assets/icons/arrow-main.svg" alt="arrow right"></button>
            <img class="main-background-icon" src="public/assets/icons/background-icon-main.svg" alt="controller background icon">
        </div>
    `;
}