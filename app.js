let gameseq=[];
let userseq=[];
let highscore = [];

let btns = ["yellow","blue","green","red"];

let started = false;
let level = 0;


let h2 = document.querySelector('h2');

function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    //random button
    let randomidx = Math.floor(Math.random() * 3);
    let randomcolor = btns[randomidx];
    let randombtn = document.querySelector(`.${randomcolor}`);

    gameseq.push(randomcolor);
    gameflash(randombtn);
}

document.addEventListener("keypress",function(){
    if(started == false){
    started = true;

    levelup();
    }
});


function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function (){
        btn.classList.remove("flash")
    },250);
}


function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function (){
        btn.classList.remove("userflash")
    },250);
}


function checkans(idx) {

    if(userseq[idx] == gameseq[idx]){
        if(gameseq.length == userseq.length){
           setTimeout(levelup,1000);
        }
    }
    else{
        
        highscore.push(`${level-1}`);
        let max=0;
        for(let i=0 ; i<highscore.length;i++){
            if(highscore[max]<highscore[i]){
                max=i;
            }
        }
        h2.innerHTML = `Game over! Your score was <b>${level-1}</b> </br> Press any key to start </br>your High score is ${highscore[max]}`;
        reset();
    }
    
}
function btnpress(){
    let btn = this;
    userflash(btn);

    usercolor = btn.getAttribute("id");
   userseq.push(usercolor);

   checkans(userseq.length-1);
}

let allbtns = document.querySelectorAll('.btn');
for(btn of allbtns){
    btn.addEventListener("click",btnpress);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}



