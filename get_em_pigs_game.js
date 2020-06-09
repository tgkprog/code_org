var score = 0;
var typed = "";

var selected = 's';
var score2 = 0;
var powerBtnClicks = 2;

const IDLE_STAGE = 10
const CANNON_STAGE = 11
const PIG_HIT_STAGE = 12
var stage = IDLE_STAGE;


const PIG_IDLE = 0;
const PIG_MOVING = 1;

var pigXAccelerate = 2;
var pigYAccelerate = 0.3;
var pigPosState = 1;

var pigSizeIncBy = .5;
var pigSizeSign = -1;//size becomes smaller this phase
var pigAnimTmrHandle;

const pigId = "kingPig";

onEvent("appl2", "click", function() {
  console.log("apl1 click score " + score + " , stage " + stage);//+ " key " + event.key);
  //event.stopImmediatePropagation();
  gotoScrn2();
  //setText("label1", score);
});
onEvent("screen1", "keypress", function(event) {
  console.log("s Key: " + event.key + ", typed :[" + typed + "]");
  
  if(selected == 'a'){
    switch (typed) {
      case '':
        checkTyped(event.key, 'a', 'A');
        break;
        
        case 'A':
          checkTyped(event.key, 'v', null);
        break;
        case 'Av':
          checkTyped(event.key, 'y', null);
        break;
        case 'Avy':
          checkTyped(event.key, 'a', null);
        break;
        case 'Avya':
          checkTyped(event.key, 'n', null);
          if(typed == 'Avyan'){
            typed = '';
            score = score +1;
            if(score ==2){
              winPrizeTmrScreen2();
            
            }
            
          }
        
    }
  }
    setText("label1", score);
      console.log("s Key: " + event.key + ", typed :[" + typed + "]");
});

function checkTyped(keyTyped, check, add){
 
    var nowTyped = keyTyped.toLowerCase();
    var k2 = check.toLowerCase();
    if(add == null){
      add = k2;
    }
    if(nowTyped == check){
      typed = typed + add;
      setText("lbl2", "Typed " + typed + ".");
    }

}
onEvent("screen1", "click", function(event) {
  console.log("screen1 clicked!");
  
});
onEvent("button1", "click", function(event) {
  console.log("button1 clicked!");
  
});

//screen 2


function gotoScrn2(){
  selected = 'a';
  if(score2 < 8){
          score2++;
    }else{
         winPrizeTmrScreen2();
  
          
    }
   
}
function winPrizeTmrScreen2(){
  setTimeout(function() {
            setScreen("screen2");
          }, 1300);
          showElement("chocoPrizeS1");
}
  
onEvent("aplBtn", "click", function(event) {
  console.log("aplBtn clicked!");
  gotoScrn2();
});
onEvent("quickGoBtn", "click", function(event) {
  console.log("quickGoBtn clicked!");
  setScreen("screen2");
  score2 = 8;
});
onEvent("aplBtn", "click", function(event) {
  console.log("aplBtn clicked!");
});
onEvent("aplBtn", "click", function(event) {
  console.log("aplBtn clicked!");
});

//pig move
var pigLoopTimerHandle = timedLoop(1000, kingPigMoveNext());

function kingPigMoveNext(){
  var x = getProperty(pigId, "x");
  //var rnd = 
  //kingPig  
}
onEvent("screen2", "click", function(event) {
  //start game screen 3
  setScreen("screen3");
  restartGame();
});


function restartGame(){
  score = 0;
  typed = "";
  stage = IDLE_STAGE;
  selected = 's';
  score2 = 0;
  
  powerBtnReset();
  
  pigPosState = 1;  
  startPigAni();
}



/*const IDLE_STAGE = 10
const CANNON_STAGE = 11
const PIG_HIT_STAGE = 12
var stage = IDLE_STAGE;


const PIG_IDLE = 0;
const PIG_MOVING = 1;

var pigXAccelerate = 2;
var pigYAccelerate = 0.3;
var pigPosState = 1;*/

onEvent("kingPig3", "mouseup", function( ) {
  
});

function startPigAni(){//pig is at x 210, y 11, width 80, h 50
  var sign  = 1;
  pigXRestart();
  var top = randomNumber(0, 1);
  var ysign = 1;
  if(top == 0)ysign = -1;
 
  pigYAccelerate = ysign * (0.3 * randomNumber(1, 4));
  var startX = randomNumber(1, 50) + (280 * sign);
  var startY = randomNumber(1, 10) + (50 * top);
  
  /*pigSizeIncBy = .5;
var pigSizeSign*/
  pigSizeSign =  randomNumber(0, 1) ;
  var pigWidth = randomNumber(5, 25) + (pigSizeSign * 7);
  var pigHeight = randomNumber(4, 17) + (pigSizeSign * 45);
  if(pigSizeSign == 0)pigSizeSign=-1;//decrease
  pigSizeIncBy =  pigSizeSign * (randomNumber(3, 12) / 10);
  setPosition(pigId, startX, startY, pigWidth, pigHeight);
  setTimeout(function() {
    pigAnimTmrHandle = pigPosSizeChange();
  }, 1100);
  
  //Math.random();
  
}

function pigXRestart(){
  var sign  = 1;
  var right = randomNumber(0, 1);
  if(right == 1) sign = -1;
  pigXAccelerate = sign * (0.3 * randomNumber(1, 10));
}

function pigPosSet(x, y, w, h){
  //-1 on any param means, keep that same as current
}

function pigPosSizeChange(){
  var x = getProperty(pigId, "x");
  var y = getProperty(pigId, "y");
  var w = getProperty(pigId, "width");
  var h = getProperty(pigId, "height");
  x += pigXAccelerate;
  y += pigYAccelerate;
  w += pigSizeIncBy;
  h += pigSizeIncBy;
  
  if(x > 225){
    pigXRestart();
    x = getProperty(pigId, "x");
    x += pigXAccelerate;
  }
  setPosition(pigId, startX, startY, pigWidth, pigHeight);
}

onEvent("powerBtn", "click", function(event) {
  powerBtnClicks--;
  setText("powerWarnLbl", "Again to reset game. Move bird to cancel");
  setProperty("powerWarnLbl", "hidden", false);
  if(powerBtnClicks == 0){
    setScreen("screen2");
  }
});
onEvent("bird", "click", function(event) {
  console.log("bird clicked!");
  powerBtnReset();
});


var prev2MovX = -1;
var prev2MovY = -1;
var prevMovX = -1;
var prevMovY = -1;

onEvent("screen3", "mousemove", function(event) {
  var s = "x = "+Math.round(event.x)+" y =" + Math.round(event.y);
  console.log(s);
  setText("powerWarnLbl", s);
  prevMovX = event.x;
  prevMovY = event.y;
  prev2MovX = prevMovX;
  prev2MovY = prevMovY;
});



function powerBtnReset(){
  setText("powerWarnLbl", "");
  powerBtnClicks = 2;
  setProperty("powerWarnLbl", "hidden", true);
  
}


//debug
  setScreen("screen3");
  restartGame();
  setProperty("powerWarnLbl", "hidden", false);
