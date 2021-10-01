// preload assets
function preload(){
  idleUp=loadImage('mouseup1.png')
  idleRight=loadImage('mouseright1.png')
  idleDown=loadImage('mousedown1.png')
  idleLeft=loadImage('mouseleft1.png')
  cheeseSprite=loadImage('cheese.png')
// font credit--https://www.1001fonts.com/press-start-font.html
  pixelFont=loadFont('prstart.ttf')
// sound credit--https://freesound.org/people/LittleRobotSoundFactory/packs/16681/
  collectSound=loadSound('collectSound.wav')
  selectSound=loadSound('select.wav')
  gameOver=loadSound('gameover.wav')
  countdown=loadSound('321.wav')
  go=loadSound('go.wav')
}
// declaring objects
let rat={
  x:116,
  y:84,
  speedx:0,
  speedy:0,
}
let direction=3
let cheese={
  x:120,
  y:112
}
let bot={
  on:false,
  sound:true,
  text:true,
  k6:false,
  k6i:false,
  k6uptime:0,
  go:function(){
    if(rat.y+24<cheese.y){
        direction=3
        rat.speedy=1.5
      }
      else if(rat.y>cheese.y+16){
        direction=1
        rat.speedy=-1.5
    }
    if(rat.x>cheese.x+16){
        direction=4
        rat.speedx=-2
      }
      else if(rat.x+24<cheese.x){
        direction=2
        rat.speedx=2
    }
}
}
// declaring game states
let gameStart=false
let freeModeSound=true
let freeMode=false
// declaring numbers
let score=0
let highScore=0
let timer=30
// setup
function setup() {
  createCanvas(256, 192);
}
//animation
function draw() {
  background(200,200,150);
  noStroke()
  textFont(pixelFont)
//animate rat based on direction facing
if(direction==1){
   image(idleUp,rat.x,rat.y)
 }
 else if(direction==2){
   image(idleRight,rat.x,rat.y)
 }
 else if(direction==3){
   image(idleDown,rat.x,rat.y)
 }
 else if(direction==4){
   image(idleLeft,rat.x,rat.y)
}
// cheese block
  image(cheeseSprite,cheese.x,cheese.y)
// timer text
  stroke(0)
  strokeWeight(2)
  fill(100)
  textSize(16)
if(freeMode==false&&timer<=0){
    text("0:00",96,20)
  }
  else if(freeMode==false&&timer<10){
    text("0:0"+timer,96,20)
  }
  else if(freeMode==false){
    text("0:"+timer,96,20)
  }
// bot text
if(bot.on==true&&bot.text==true){
  (stroke(0))
  strokeWeight(4)
  fill(255,0,0)
  textSize(8)
  text("BOT MODE",191,16)
  }
if(bot.text==true){
  setTimeout(function(){
    bot.text=false
  },500)
  }
  else{
  setTimeout(function(){
    bot.text=true
   },500)  
}
// freemode text
if(freeMode==true){
  stroke(0)
  strokeWeight(2)
  fill(50)
  rect(66,1,122,27)
  fill(255,120,120)
  stroke(100)
  strokeWeight(8)
  textSize(12)
  text("FREEMODE!",74,20)
}
// game over text
  noStroke()
  fill(0)
if(timer<=-1){
  textSize(18)
  text("GAME OVER",50,150)
  textSize(8)
  text("PRESS SPACE TO TRY AGAIN",36,160)
}
// score text
  fill(100)
  stroke(0)
  strokeWeight(2)
  textSize(12)
  text("SCORE:"+score,8,184)
// high score text
  stroke(0)
  fill(100)
if(score>=highScore&&score>0){
    text("NEW HIGH:"+highScore,124,184)
    }
    else{
      text("HIGH:"+highScore,172,184)
    }
// title screen
if(gameStart==false){
  fill(200,200,150)
  rect(0,0,256,192)
  fill(50)
  rect(17,5,222,31)
  stroke(100)
  strokeWeight(8)
  fill(255,120,120)
  textSize(16)
  text("RODDY THE RAT",25,28)
  noStroke()
  fill(0)
  textSize(8)
  text("HELP RODDY GET THE CHEESE!",25,60)
  stroke(0)
  strokeWeight(2)
  fill(100)
  textSize(12)
  text("W",123,80)
  image(idleDown,rat.x,rat.y)
  text("A    D",93,105)
  text("S",123,130)
  noStroke()
  fill(0)
  textSize(8)
  text("PRESS SPACE TO START",48,160)
  stroke(0)
  fill(100)
  textSize(12)
  text("HIGH:"+highScore,172,184)
}
// setting sound volumes
  collectSound.setVolume(0.1)
  selectSound.setVolume(0.1)
  gameOver.setVolume(0.1)
// declaring functions
function reset(){
  rat.x=116
  rat.y=84
  rat.speedx=0
  rat.speedy=0
  direction=3
  cheese.x=120
  cheese.y=112
}
// spacebar to start/reset the game
if(keyIsDown(32)){
  frameCount=1
  gameStart=true
  reset()
  score=0
  timer=30
}
// escape to go back
if(keyIsDown(ESCAPE)){
  gameStart=false
  freeMode=false
  freeModeSound=true
  bot.on=false
  bot.sound=true
}
// free mode
if(keyIsDown(BACKSPACE)&&freeModeSound==true){
  freeMode=true
  freeModeSound=false
  collectSound.play()
}
// make sound if game state is changed
if(frameCount==3){
  selectSound.play()
}
  
// starting the game
if(gameStart==false){
  frameCount=1
}
if(frameCount>=240){
  }
  else{
    reset()
  }
// timer
if(freeMode==false&&frameCount%60==0&&frameCount>240&&timer>=0){
  timer--
}
if(timer<=-1){
  reset(0)
  frameCount=1
}
// countdown
if(frameCount==60){
  countdown.play()
}
if(frameCount==120){
  countdown.play()
}
if(frameCount==180){
  countdown.play()
}
if(frameCount==240){
  go.play()
}
// game over tune
if(freeMode==false&&frameCount==2099){
  setTimeout(
  gameOver.play(),1000)
}
// laws of rat's movement
  rat.x+=rat.speedx
  rat.y+=rat.speedy
  rat.x=constrain(rat.x,-2,234)
  rat.y=constrain(rat.y,-5,167)
//rat's movement
if(keyIsDown(87)||keyIsDown(73)){
  direction=1
  rat.speedy=-1.5
  }
  else if(keyIsDown(83)||keyIsDown(75)){
    direction=3
    rat.speedy=1.5
  }
  else{
    rat.speedy=0
}
if(keyIsDown(68)||keyIsDown(76)){
    direction=2
    rat.speedx=2
  }
  else if(keyIsDown(65)||keyIsDown(74)){
    direction=4
    rat.speedx=-2
  }
  else{
    rat.speedx=0
}
// bot behavior
if(bot.on==true){
  bot.go()
}
if(keyIsDown(54)){
  bot.k6i=true
  bot.k6=true
}
if(bot.k6i==true){
  bot.k6uptime=millis()+1000
  bot.k6i=false
  }
if(millis()>=bot.k6uptime){
  bot.k6=false
}
if(bot.k6==true&&keyIsDown(57)&&bot.sound==true){
  bot.sound=false
  bot.on=true
  collectSound.play()
}
// cheese collect
if(rat.y+24>cheese.y&&rat.x<cheese.x+16&&rat.y<cheese.y+16&&rat.x+24>cheese.x){
  cheese.x=random(-2,234)
  cheese.y=random(26,156)
  collectSound.play()
  score=score+1
  console.log(score)
if(freeMode==false&&bot.on==false&&score>=highScore){
  highScore=score
}
}
}