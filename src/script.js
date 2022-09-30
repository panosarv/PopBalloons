let start;
let totalTime = 0;
let attempts = 0;
const maxAttempts = 10;
let newShapeTime;

function getRandomColor() {
    let color = '#';
   
    var letters = '0123456789ABCDEF';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
    return color;
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}


function makeShapeAppear() {
    let top = getRandomIntInclusive(1, 400);
    let left = getRandomIntInclusive(1, 700);
    let width = getRandomIntInclusive(50, 100);
    document.querySelector("#shape").style.display="block";
    document.querySelector("#shape").style.width=width;
    document.querySelector("#shape").style.top=top;
    document.querySelector("#shape").style.height=width;
    document.querySelector("#shape").style.left=left;
    let col=getRandomColor();
    document.querySelector("#shape").style.backgroundColor=col;
    document.querySelector("#shape").style.cursor="pointer";

    newShapeTime=new Date().getTime()-start;   
}


function appearAfterDelay() {
        let x= getRandomIntInclusive(0,2);
        setTimeout(makeShapeAppear, x*1000);
    }
    



const newGame=document.querySelector("#reset");
const newStartGame=document.querySelector("#start")
const end_time=document.querySelector("#final-reaction-time");
newGame.addEventListener("click",()=>startGame());
newStartGame.addEventListener("click",()=>startGame());
startGame=function(){
    totalTime=0;
    let clickTime=0;
    let dt=0;
    attempts=0;
    start = new Date().getTime();
    appearAfterDelay();
    document.querySelector("#modal-container").style.display="none";
    document.querySelector("#attempts").textContent=maxAttempts-attempts;
    document.querySelector("#timeTaken").textContent=dt+"s";
    document.querySelector("#totalTime").textContent=totalTime+"s";
    attempts++;
    document.querySelector("#shape").onclick = function () {
        if(attempts<maxAttempts){
            document.querySelector("#shape").style.display="none";
            appearAfterDelay();
            clickTime=(new Date().getTime()-start);
            dt=Number(((clickTime-newShapeTime)/1000).toFixed(5));
            totalTime=Number((totalTime+dt).toFixed(5));
            document.querySelector("#attempts").textContent=maxAttempts-attempts;
            document.querySelector("#timeTaken").textContent=dt+"s";
            document.querySelector("#totalTime").textContent=totalTime+"s";
            attempts++;
        }
        else if(attempts==maxAttempts) {
            clickTime=(new Date().getTime()-start);
            dt=Number(((clickTime-newShapeTime)/1000).toFixed(5));
            totalTime=Number((totalTime+dt).toFixed(5));
            document.querySelector("#attempts").textContent=0;
            document.querySelector("#shape").style.display="none";
            document.querySelector("#modal-container").style.display="flex";
            document.querySelector("#timeTaken").textContent=dt+"s";
            document.querySelector("#totalTime").textContent=totalTime+"s";
            end_time.textContent="Reaction time: "+totalTime+"s";
            
        }
    }
}