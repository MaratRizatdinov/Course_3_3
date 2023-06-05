/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./render.js":
/*!*******************!*\
  !*** ./render.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderGamePage: () => (/* binding */ renderGamePage),
/* harmony export */   renderStartPage: () => (/* binding */ renderStartPage)
/* harmony export */ });
//----Стартовая страница----

async function renderStartPage({ contentElement }) {
    window.localStorage.removeItem("level");
    window.localStorage.removeItem("gameCardCollection");

    let selectPageContent = `<div class="select__container">
                            <div class="select__title">Выбери сложность</div>
                            <div class="select__levelsbox">
                                <div class ="select__levelbutton">1</div>
                                <div class="select__levelbutton">2</div>
                                <div class="select__levelbutton">3</div>
                            </div>     
                            <div class="select__startbutton  global__button global__button--disabled">Старт</div>       
                        </div>`;
    contentElement.innerHTML = selectPageContent;

    let buttonElements = document.querySelectorAll(".select__levelbutton");
    let startButton = document.querySelector(".select__startbutton");
    startButton.disabled = true;

    for (let key of buttonElements) {
        key.addEventListener("click", () => {
            for (let key of buttonElements) {
                key.classList.remove("select__levelbutton--active");
            }
            key.classList.add("select__levelbutton--active");
            window.localStorage.setItem("level", key.textContent);
            startButton.disabled = false;
            startButton.classList.remove("global__button--disabled");
        });
    }
}

//----Страница-загрузка игры----

function renderGamePage({ contentElement }) {
    let gamePageItems = ``;
    let fullGamePageItems = ``;
    let gamePageContent = "";
    let level;
    let cardShirt = "close";

    let gameCards = JSON.parse(
        window.localStorage.getItem("gameCardCollection")
    );

    let fullGameCards = JSON.parse(
        window.localStorage.getItem("fullCardCollection")
    );
    let headerElement = `<div class="header__container">
                            <div class="header__timerfield">
                                <div class="header__timertitle">
                                    <div class="header__timernamemin">min</div>
                                    <div class="header__timernamesec">sec</div>
                                </div>
                                <div class="header__timerclock">
                                    <div class="header__timercounter header__timercounter--decimin">0</div>
                                    <div class="header__timercounter header__timercounter--min">0</div>
                                    <div class="header__timercounter header__timercounter--point">.</div>
                                    <div class="header__timercounter header__timercounter--decisec">0</div>
                                    <div class="header__timercounter header__timercounter--sec">0</div>
                                </div>
                            </div>
                            <div class="header__button global__button">Начать заново</div>
                          </div>`;

    if (gameCards.length === 6) level = "easy";
    if (gameCards.length === 12) level = "medium";
    if (gameCards.length === 18) level = "hard";

    // Первоначально показывем полную колоду (закрытую)

    gamePageContent = `${headerElement}
        
    <div class = "card__container card__container--full center">
        ${getRenderElement(
            fullGamePageItems,
            fullGameCards,
            cardPicture,
            cardShirt
        )}
    </div>`;

    contentElement.innerHTML = gamePageContent;

    // По истечении указанного времени показываем полную колоду(открытую)

    setTimeout(() => {
        cardShirt = "open";
        gamePageContent = `${headerElement}
        
    <div class = "card__container card__container--full center">
        ${getRenderElement(
            fullGamePageItems,
            fullGameCards,
            cardPicture,
            cardShirt
        )}
    </div>`;

        contentElement.innerHTML = gamePageContent;
    }, 2000);

    // По истечении указанного времени показываем игровую колоду(открытую)

    setTimeout(() => {
        gamePageContent = `${headerElement}
            
    <div class = "card__container card__container--${level}">
        ${getRenderElement(gamePageItems, gameCards, cardPicture, cardShirt)}
    </div>`;

        contentElement.innerHTML = gamePageContent;
    }, 4000);

    // По истечении указанного времени показываем игровую колоду(закрытую)

    setTimeout(() => {
        cardShirt = "close";

        gamePageContent = `${headerElement}
            
    <div class = "card__container card__container--${level}">
        ${getRenderElement(gamePageItems, gameCards, cardPicture, cardShirt)}
    </div>`;

        contentElement.innerHTML = gamePageContent;
        
        window.localStorage.setItem("gamestatus", "begingame");
        let result = window.localStorage.getItem("gamestatus");
        console.log(result);
        return result;
        
    }, 6000);
}

// ----Ниже находятся вспомогательные функции----

//Функция генерирует контент игровых карт

function getRenderElement(element, Arr, cardPicture, cardShirt) {
    for (let key of Arr) {
        element =
            element +
            `<div class ='card__items card__items--${cardShirt}'
                          data-suite=${key[1]}
                          data-dignity=${key[0]}>

                          ${cardPicture(key, cardShirt)}
             </div>`;
    }

    return element;
}
// Функция генерирует игральную карту

function cardPicture(key, cardShirt) {
    if (cardShirt === "open") {
        return `<div class ="card__firstSymbol">
                        ${key[0] === "1" ? "10" : key[0]}
                    </div>
                    <div class ="card__secondSymbol">
                        <img src=${suitePict(key[1])}>
                    </div>
                    <div class ="card__thirdSymbol">
                        <img src=${suitePict(
                            key[1]
                        )} class = 'card__centerPicture'>
                    </div>
                    <div class ="card__fourSymbol ">
                        <img src=${suitePict(key[1])}>
                    </div>
                    <div class ="card__fiveSymbol">
                        ${key[0] === "1" ? "10" : key[0]}
                    </div>`;
    }
    if (cardShirt === "close") {
        return `<div class ="card__shirt">
                    <img src='img/Рубашка.svg' alt='Трефы'>
                </div>`;
    }
}

// Функция подставляет рисунок  масти

function suitePict(suite) {
    let picture = "";
    if (suite === "s") {
        picture = '"img/Spades.svg" alt="Пики"';
        return picture;
    }
    if (suite === "d") {
        picture = '"img/Diamonds.svg" alt="<Бубны>"';
        return picture;
    }
    if (suite === "h") {
        picture = '"img/Hearts.svg" alt="Червы"';
        return picture;
    }
    if (suite === "c") {
        picture = '"img/Clubs.svg" alt="Трефы"';
        return picture;
    }
}


/***/ }),

/***/ "./tools.js":
/*!******************!*\
  !*** ./tools.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createRandomCardCollection: () => (/* binding */ createRandomCardCollection)
/* harmony export */ });
// Функция получает перетасованную колоду из 36 карт.
//Создает случайный массив карт в зависимости от уровня и помещает в localStorage

function createRandomCardCollection({ levelOfGame }) {
    let fullCardCollection = [];
    let gameCardCollection = [];
    let cardSuite = ["s", "h", "d", "c"];
    let cardDignity = ["A", "K", "Q", "J", "1", "9", "8", "7", "6"];

    for (let suite of cardSuite) {
        for (let dignity of cardDignity) {
            fullCardCollection.push(dignity + suite);
        }
    }
    window.localStorage.setItem(
        "fullCardCollection",
        JSON.stringify(fullCardCollection)
    );

    shuffle(fullCardCollection);
    if (levelOfGame === "1") fullCardCollection.length = 3;
    if (levelOfGame === "2") fullCardCollection.length = 6;
    if (levelOfGame === "3") fullCardCollection.length = 9;

    gameCardCollection = fullCardCollection.concat(fullCardCollection);

    shuffle(gameCardCollection);

    window.localStorage.setItem(
        "gameCardCollection",
        JSON.stringify(gameCardCollection)
    );
}

// Функция-рандомизатор

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render.js */ "./render.js");
/* harmony import */ var _tools_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools.js */ "./tools.js");


let contentElement = document.querySelector(".container");
let levelOfGame;
//let gameStatus;

window.localStorage.removeItem("gameStatus");

(0,_render_js__WEBPACK_IMPORTED_MODULE_0__.renderStartPage)({ contentElement });

let startButton = document.querySelector(".select__startbutton");

startButton.addEventListener("click", () => {
    if (startButton.disabled === true) {
        alert("Выберите сложность!");
        return;
    }

    levelOfGame = window.localStorage.getItem("level");

    (0,_tools_js__WEBPACK_IMPORTED_MODULE_1__.createRandomCardCollection)({ levelOfGame });

    (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.renderGamePage)({ contentElement });
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map