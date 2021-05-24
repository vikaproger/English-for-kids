function changeMode(){        
    document.querySelector(".cards__wrapper").childNodes.forEach(el => { 
        if (modeProp) {           
            el.style.background = "rgb(232,215,20)";
            el.style.background = "linear-gradient(90deg, rgba(232,215,20,1) 0%, rgba(255,163,34,1) 50%, rgba(255,69,0,1) 100%)";
        } else {
            el.style.background = "rgb(184,232,20)";
            el.style.background = "linear-gradient(90deg, rgba(184,232,20,1) 0%, rgba(53,255,34,1) 50%, rgba(0,128,0,1) 100%)";
        }
    })
    checkProp(properties);  
    indexOfCurrWord = 0;
    errorCounts = 0;
}

checkMode.addEventListener("change", () => {    
    changeMode();  
    showBtn();
    if (document.querySelector(".stars__wrapper").childNodes.length != 0) {
        document.querySelector(".stars__wrapper").innerHTML = "";
    }
})

const startBtn = document.querySelector(".btn-start");
startBtn.addEventListener("click", () => {
    if (startBtn.className === "btn-start") {
        startBtn.classList.add("btn-repeat");
        startBtn.classList.remove("btn-start");
        startBtn.innerHTML = "REPEAT";
        startGame = true;
        createAudioGame();
        console.log(audioArr);
        audioArr[indexOfCurrWord].play();
    } else  {
        audioArr[indexOfCurrWord].play();
    }      
})

function randomArray(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
let audioArr = [];
let indexOfCurrWord = 0;
let errorCounts = 0;
const stars = document.querySelector(".stars__wrapper");

function createAudioGame() {
    audioArr = [];
    document.querySelector(".cards__wrapper").childNodes.forEach(el => {
        const audio = document.createElement("audio");
        audio.className = "audio";
        audio.id = `${el.getAttribute("id")}`;
        audio.src = `./assets/audio/${el.getAttribute("id")}.mp3`.replace(" ", "-");
        audio.currentTime = 0;
        audioArr.push(audio);
    })
    audioArr = randomArray(audioArr);    
}

function checkAnswer(currAudio, card) {
    if (card.className === "cards__wrapper") return
    
    if (card.getAttribute("id") === currAudio.getAttribute("id")) {
        card.style.filter = "grayscale(100%)"; 
        stars.innerHTML = `<div class="star right"></div>` + stars.innerHTML;
        card.style.pointerEvents = "none";
        updateStorage(card.getAttribute('id'), "play");
        correct = playSignal("correct");
        correct.addEventListener("ended",() => {
            if (indexOfCurrWord<7) {
                indexOfCurrWord++;
                audioArr[indexOfCurrWord].play();
            } else {
                indexOfCurrWord = 0;
                cardsWrapper.childNodes.forEach(el => el.style.visibility = "hidden");
                startBtn.style.visibility = "hidden";
                if (errorCounts === 0) {
                    endGame("success");
                } else {
                    endGame("failure");
                    const text = document.createElement("h2");
                    text.innerHTML = `${errorCounts} wrong answer!!!`;
                    cardsWrapper.append(text);
                }
            }            
        });         
    } else {
        if (card.style.pointerEvents !== "none") {
            stars.innerHTML = `<div class="star error"></div>` + stars.innerHTML;
            updateStorage(card.getAttribute('id'), "error");
            playSignal("error");
            errorCounts++;
        }        
    }
}

cardsWrapper.addEventListener("click", (e) => {
    if (properties !== "MainPage" && modeProp && startGame) {
        checkAnswer(audioArr[indexOfCurrWord], e.target);
    }
});
function endGame(result) {
    cardsWrapper.style.background = `url(./assets/img/${result}.jpg) no-repeat 50%`;                
    res = playSignal(result);
    startGame=false;
    res.addEventListener("ended", () => {
        document.location.reload();
    });
}
function playSignal(audio) {    
    const play = document.createElement("audio");
    play.className = `${audio}`;
    play.src = `./assets/audio/${audio}.mp3`;
    play.currentTime = 0;
    play.play();
    return play;
}