const header = document.querySelector(".header");
const main = document.getElementById("main");
const containGame = document.getElementById("contain-Game");
const btnStartGame = document.getElementById("btn-start-game");
const btnAgain = document.querySelector(".btn-again");
const textScore = document.getElementById("score");
const textMaxScore = document.getElementById("max-score");

let maxScore = 0;
let score=0;
let iteradores = [];
let it = 0;
let clickUser = 0;
let elementos = [];
let play = false;
let win = true;

const startMusic=()=>{
    play = false;
    if(btnAgain.style.display == "block")btnAgain.style.display = "none";
    let i = Math.floor(Math.random()*3);
    let j = Math.floor(Math.random()*3);
    iteradores.push([`${i}${j}`]);
    for(let h=0;h<iteradores.length;h++){
        for (const chil of containGame.children) {
            if(chil.classList.item(1) == iteradores[h]){
                elementos.push(chil);
            }
        };
    }
    pintar(elementos);
}
function pintar(elemento){
    let i = 0;
    let tiempoAPintar = setInterval(() => {
        if(i<elementos.length){
            setTimeout(() => {
                seleccionado(elemento[i]);
                i++;
            }, 1);
        }else{
            clearInterval(tiempoAPintar);
            while(elementos.length > 0)elementos.pop();
            play = true;
        };
    }, 1000);
}
const seleccionado=(chil)=>{
    chil.classList.add("paint");
    setTimeout(() => {
        chil.classList.remove("paint")
    }, 500);
}
const showMaxScore=(s)=>{
    if(s > maxScore){
        maxScore = s;
        textMaxScore.firstElementChild.textContent = maxScore;
    }
}
const verificarClick=(chil)=>{
    if(iteradores[it] == chil.classList.item(1)){
        clickUser++;
        it++;
        score++;
        textScore.firstElementChild.textContent = score;
        if(clickUser == iteradores.length){
            clickUser = 0;
            it = 0;
            startMusic();
        }
    }else{
        play = false;
        showMaxScore(score);
        clickUser = 0;
        it = 0;
        score = 0;
        iteradores = [];
        while(elementos.length > 0)elementos.pop();
        btnAgain.style.display = "block";    
        btnAgain.addEventListener("click",startMusic);
    }
}
const turnoPlayer=(chil)=>{
    if(play){
        seleccionado(chil);
        verificarClick(chil);
    }
}
const startGame=()=>{
    header.style.transform = "translateY(-100px)";
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            const div = document.createElement("div");
            const img = document.createElement("img");
            img.src = `img/${i}${j}.jpg`;
            img.classList.add("img");
            div.classList.add("item-grid",`${i}${j}`);
            div.appendChild(img);
            containGame.appendChild(div);
        }
    }
    for (const chil of containGame.children) {
        chil.onclick=()=>turnoPlayer(chil);
    }
    main.style.display = "flex";
    startMusic();
}



btnStartGame.addEventListener("click",startGame);