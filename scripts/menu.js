let properties = "MainPage";
let backside = false;
let startGame = false;
let currGameCards;
const cardsWrapper = document.querySelector(".cards__wrapper");
const statisticsWrapper = document.querySelector(".statistics__wrapper");
for (let i = 0; i < 8; i++) {
    const card = document.createElement("div");
    card.className = "card-main";
    card.innerHTML = `<div class="card-image" style="content: url('./assets/${cards[i+1][0].image}')"></div>
                        <div class="card-word"><p>${cards[0][i]}</p></div>`;
    cardsWrapper.append(card); 
}
const cardsInPage = document.querySelectorAll(".card-main");
cardsInPage.forEach(el => {    
    el.addEventListener("click", (e) => {        
        properties = `${el.lastChild.innerText.replace(/\s/g, "")}`;
        checkProp(properties);        
    })
});
function checkProp (properties) {
    switch(properties) {
        case "Action(setA)":
            changeLayout(1);        
            break;
        case "Action(setB)":
            changeLayout(2);
            break;   
        case "Action(setC)":
            changeLayout(3);
            break; 
        case "Animal(setA)":
            changeLayout(4);
            break;     
        case "Animal(setB)":
            changeLayout(5);
            break; 
        case "Animal(setC)":
            changeLayout(6);
            break; 
        case "Clothes":
            changeLayout(7);
            break; 
        case "Emotions":
            changeLayout(8);
            break;
        case "Statistics":
            document.querySelectorAll(".list__item").forEach(el => el.classList.remove("active"));
            document.querySelectorAll(".list__item")[9].classList.add("active");   
            cardsWrapper.style.display = "none";
            statisticsWrapper.style.display = "flex";
            updateTable() ;
            break;
    }
}

function changeLayout(index) {
    cardsWrapper.style.display = "flex";
    statisticsWrapper.style.display = "none";
    document.querySelectorAll(".list__item").forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".list__item")[index].classList.add("active");     
    for (let i = 0; i < 8; i++) {
        cardsWrapper.childNodes[0].remove();
    }
    if (!modeProp){
        for (let i = 0; i < 8; i++) {
            createCards(index, i);               
        }
        const activeCard = document.querySelectorAll(".card");
        activeCard.forEach(el => {
            el.addEventListener("click", (e) => {
                if (e.target.className === "btn-flip") {
                    el.style.transform = "rotateY(180deg)";
                    backside = true;
                }else {
                    playAudio(el);
                    updateStorage(el.firstChild.children[1].innerText.replace(" ", "-"), "train");
                }
            })
            el.addEventListener("mouseleave", () => {
                el.style.transform = "none";
                backside = false;
            })
        })
    } else {
        for (let i = 0; i < 8; i++) {
            createGameCards(index, i);               
        }
        currGameCards = document.querySelectorAll(".card-game");
    }    
}

function playAudio(el) {
    if (properties !== "MainPage" && !backside) {
        const audio = document.createElement("audio");
        audio.className = "audio";
        audio.src = `./assets/audio/${el.firstChild.children[1].innerText}.mp3`.replace(" ", "-");
        audio.currentTime = 0;
        audio.play();
    }
}

function createCards(index, i) {
    const card= document.createElement("div");
    card.className = "card";
    card.id = `${cards[index][i].word.replace(" ", "-")}`;
    card.innerHTML = `<div class="front">
                            <div class="card-image" style="content: url('./assets/${cards[index][i].image}')"></div>
                            <div class="card-word"><p>${cards[index][i].word}</p></div>
                            <button class="btn-flip"></button>
                        </div>
                        <div class="back">
                            <div class="card-image" style="content: url('./assets/${cards[index][i].image}')"></div>
                            <div class="card-word"><p>${cards[index][i].translation}</p></div>
                        </div>`;
    cardsWrapper.append(card);   
}

function createGameCards(index, i) {
    const card= document.createElement("div");
    card.className = "card-game";
    card.id = `${cards[index][i].word.replace(" ", "-")}`
    cardsWrapper.append(card);
    card.style.background = `url("./assets/${cards[index][i].image}") no-repeat 50%/cover`;
    showBtn();
}

function showBtn() {
    if (properties !== "MainPage" && modeProp) {
        if (document.querySelector(".btn-start") !== null) {
            document.querySelector(".btn-start").style.visibility = "visible";
        }  else {
            changeBtn();
        }      
    } else {        
        if (document.querySelector(".btn-repeat") !== null) {
            changeBtn();
        } 
        document.querySelector(".btn-start").style.visibility = "hidden";
    }
    if (properties === "Statistics") {
        if (document.querySelector(".btn-start") !== null) {
            document.querySelector(".btn-start").style.display = "none";
        }
        if (document.querySelector(".btn-repear") !== null) {
            document.querySelector(".btn-repeat").style.display = "none";
        }
    } else {
        if (document.querySelector(".btn-start") !== null) {
            document.querySelector(".btn-start").style.display = "block";
        }
        if (document.querySelector(".btn-repear") !== null) {
            document.querySelector(".btn-repeat").style.display = "block";
        }
    }
}

function changeBtn() {
    document.querySelector(".btn-repeat").classList.add("btn-start");
    document.querySelector(".btn-repeat").classList.remove("btn-repeat");
    document.querySelector(".btn-start").innerHTML = "START GAME";
}

function updateStorage(card, param) {
    let stat = JSON.parse(localStorage.getItem(`${properties}_${card}`));
    switch(param) {
        case "train":
            stat.train++;
            break;
        case "play":
            stat.play++;
            break;
        case "error":
            stat.error++;
            break;
    }
    localStorage.setItem(`${properties}_${card}`, JSON.stringify(stat));
}