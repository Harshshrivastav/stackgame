// -----------------------------------------------------------------------global bariables and array are created(0)
// buttonColours array
var buttonColours=["red","blue","green","yellow"];

// user click pattern array
var userClickPattern=[];
// initially set start = false  ,level =0
var start=false;
var level=0;
// game pattern array
var gamePattern=[];

//Start Game ----------------------------------------------------------------------------------------game starts from here (1) 
$(document).keypress(function(){
if(!start){
// set level title to level 0 1 2 3 4.....
$("#level-title").text("Level - "+level);
// call the next sequence
nextSequence();
// ----------------------------------------------------------------------------------call returns back and set start =true(8)
start=true;
}
});



//----------------------------------------------------------------------------all btn are assigned with click event listener(0)

$(".btn").click(function(){
// every btn has a unique id of colour name so we gave invoked btn's value to a var userchosencolor
var userChosenColor=$(this).attr("id");
// ----------------------------------------------------------------------------------------push this colour pattern to array(9)
userClickPattern.push(userChosenColor);
//-------------------------------------------------------------------------------------------------------------- play audio(10)
playSound(userChosenColor);
//-------------------------------------------------------------------------------------------------------- animate the btn(12)
animatePress(userChosenColor);
//-------------------------------------------------------------------------------------------check answer putting last index(14)
checkAnswer(userClickPattern.length-1);
});

//-------------------------------------------------------------------------------------------------nextSequence(2-18-25)
function nextSequence(){
  // user pattern is recorded
userClickPattern=[];
// level starts from 1
level++;
// level titile is updated
$("#level-title").text("Level - "+level);
// --------------------------------------------------------------------------------------------------generating random number(3)
var random_Number= Math.floor(Math.random()*4);
// --------------------------------------------------------------------------------------------------random color generator(4)
var random_Choosen_Color=buttonColours[random_Number];
// --------------------------------------------------------------------------------------------sequence stored in game pattern(5)
gamePattern.push(random_Choosen_Color);
// flash genrator
$("#"+random_Choosen_Color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
// ----------------------------------------------------------------------------------------------------function call playsound(6)
playSound(random_Choosen_Color);
}

//----------------------------------------------------------------------------------------------------------- play sound (7-11)
function playSound(play_color_sound){
// new Audio method invoked
var audio=new Audio("sounds/"+ play_color_sound +".mp3");
// audio played
audio.play();
}

//---------------------------------------------------------------------------------------------new animation function created(13)

function animatePress(currentColor) {
  // add animation to button
$("#" + currentColor).addClass("pressed");
setTimeout(function () {
  // remove animation from button
$("#" + currentColor).removeClass("pressed");
}, 100);
}
// ------------------------------------------------------------------------------------------------------check answer pattern(15)
function checkAnswer(currentLevel){
  //------------------------------------------------------------------- check whether user click the button in right sequence(16)
if(gamePattern[currentLevel]===userClickPattern[currentLevel]){
  if(userClickPattern.length===gamePattern.length){
    // just for checking print correct
  console.log("correct");
  // set timer for next sequence
  setTimeout(function(){
    // --------------------------------------------------------call next sequence  when you finished firsh check successfully(17)
  nextSequence();
  },1000);
}
}
//----------------------------------------------------------------------------------------- if user goes in in wrong sequence(19)
else{
  // play wrong sound
  playSound("wrong");
  // add game over class to body
  $("body").addClass("game-over");
  // set time out function
  setTimeout(function(){
    // remove game over class from body
    $("body").removeClass("game-over");
  },100);
  // just for checking print wrong
  console.log("wrong");
//----------------------------------------------------------------------------------------------------------call starover(20)
  startOver();
}
}
//-------------------------------------------------------------------------------------------------- start over the game(21)
function startOver(){ 
// -----------------------------------------------------------------------reset the level,titile,gamepattern,start value(22)
$("#level-title").text("Press A Key to Start");
level=0;
gamePattern=[];
var start=false;
$(document).keypress(function(){
  if(!start){
  // set level title to level 0 1 2 3 4.....
  $("#level-title").text("Level - "+level);
  //------------------------------------------------------------------------------------------------ call the next sequence(23)
  nextSequence();
  start=true;
  }
  });
}
// --------------------------------------------------------THE END-----------------------------------------------------------



