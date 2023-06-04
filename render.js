//Стартовая страница

export function renderStartPage({ contentElement }) {
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

//Страница-загрузка игры

export function renderGamePage({ contentElement }) {
    let gamePageItems = ``;
    let fullGamePageItems = ``;
    let gamePageContent = "";
    let level;

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

    gamePageContent = `${headerElement}+
        
    <div class = "card__container card__container--full center">
        ${getRenderElement(fullGamePageItems, fullGameCards)}
    </div>`;

    // Первоначально показывем полную колоду

    contentElement.innerHTML = gamePageContent;

    // По истечении указанного времени показываем игровую колоду

    setTimeout(() => {
        gamePageContent = `${headerElement}+
            
    <div class = "card__container card__container--${level}">
        ${getRenderElement(gamePageItems, gameCards)}
    </div>`;

        contentElement.innerHTML = gamePageContent;
        window.localStorage.setItem(
            "gameStatus",
            JSON.stringify("timeToRemember")
        );
    }, 2000);
}

// Функция подставляет рисунок масти

function suitePict(suite) {
    let picture = "";
    if (suite === "s") {
        picture = '"Spades.svg" alt="Пики"';
        return picture;
    }
    if (suite === "d") {
        picture = '"Diamonds.svg" alt="<Бубны>"';
        return picture;
    }
    if (suite === "h") {
        picture = '"Hearts.svg" alt="Червы"';
        return picture;
    }
    if (suite === "c") {
        picture = '"Clubs.svg" alt="Трефы"';
        return picture;
    }
}
//Функция генерирует контент игровых карт

function getRenderElement(element, Arr) {
    for (let key of Arr) {
        element =
            element +
            `<div class ='card__items'
                          data-suite=${key[1]}
                          data-dignity=${key[0]}>

                <div class ="card__firstSymbol">
                    ${key[0] === "1" ? "10" : key[0]}
                </div>
                <div class ="card__secondSymbol">
                    <img src=${suitePict(key[1])}>
                </div>
                <div class ="card__thirdSymbol">
                    <img src=${suitePict(key[1])} class = 'card__centerPicture'>
                </div>
                <div class ="card__fourSymbol ">
                    <img src=${suitePict(key[1])}>
                </div>
                <div class ="card__fiveSymbol">
                    ${key[0] === "1" ? "10" : key[0]}
                </div>
             </div>`;
    }

    return element;
}
//----------------------------------------------------------------------------------------
