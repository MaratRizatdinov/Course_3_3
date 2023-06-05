import { renderStartPage, renderGamePage } from "./render.js";
import { createRandomCardCollection } from "./tools.js";
let contentElement = document.querySelector(".container");
let levelOfGame;
//let gameStatus;

window.localStorage.removeItem("gameStatus");

renderStartPage({ contentElement });

let startButton = document.querySelector(".select__startbutton");

startButton.addEventListener("click", () => {
    if (startButton.disabled === true) {
        alert("Выберите сложность!");
        return;
    }

    levelOfGame = window.localStorage.getItem("level");

    createRandomCardCollection({ levelOfGame });

    renderGamePage({ contentElement });
});
