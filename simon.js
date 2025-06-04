let gameseq=[];
let userseq=[];
let highestscore=[];

let btns=["yellow","red","purple","green"];

let started=false;  //this variable sees that whether the game has started or not!
let level=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){  //on keypress game starts!
    if(started==false){
        console.log("Game is started");
        started=true;
        
        levelup();
    }
});

function gameflash(btn){
    btn.classList.add("gameflash");
    setTimeout(function(){
        btn.classList.remove("gameflash");
    },250);
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}


function levelup(){
    userseq=[];//to reset the userseq after each level up

    level++;
    h2.innerText=`Level ${level}`;

    //random btn choose
    //to get random color
    let randidx= Math.floor(Math.random()*3);
    let randcolor=btns[randidx];
    let randbtn=document.querySelector(`.${randcolor}`);
    // console.log(randidx);
    // console.log(randcolor);
    // console.log(randbtn);
    gameseq.push(randcolor);
    console.log(gameseq);
    gameflash(randbtn);
}

function checkans(idx){
    // console.log("current level:",level);
   
    //if the length of gameseq==userseq and user[idx]==game[idx] that means user did correct and therefore levelup() function will be called to move to next level
    if(userseq[idx]==gameseq[idx]){
        if(userseq.length==gameseq.length){
            setTimeout(levelup,1000);
        }
    } else{
        highestscore.push(level);
        highscore(highestscore);
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";

        },150);

       

        reset();
    }

}

function btnpress(){
    console.log(this);
    let btn=this;
    userflash(btn);

    usercolor=btn.getAttribute("id");
    // console.log(usercolor);
    userseq.push(usercolor);
    // console.log(userseq);
    checkans(userseq.length-1);
}



let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnpress);
}

function reset(){
    started=false;
    gameseq=[];
    userseq=[];
    level=0;


}

function highscore(highestscore){
    let high=highestscore[0];
    for(let score of highestscore){
        if(score>high){
            high=score;
        }
       
    }
    h2.innerHTML=`Game Over! Your score was <b>${level}</b> <br>
                Highest Score: <b>${high}</b> <br> Press any key to start!`;

};
