var mario,runmario,deadmario,bgimage,brickgroup,brickimage,coins,coingroup,coinsound,score=0,pipes,obstacles,jumpsound,overSound;  //always add var
var gameOver=false;
function preload(){
 runmario=loadAnimation("images/mar1.png","images/mar2.png","images/mar3.png","images/mar4.png","images/mar5.png","images/mar6.png","images/mar7.png");
 deadmario=loadAnimation("images/dead.png");
 bgimage=loadImage("images/bgnew.jpg");
 brickimage=loadImage("images/brick.png");
 coins=loadAnimation("images/con1.png","images/con2.png","images/con3.png","images/con4.png","images/con5.png","images/con5.png")
 coinsound=loadSound("sounds/coinSound.mp3")
 pipes=loadImage("images/pipe.png")
 mush=loadAnimation("images/mush1.png","images/mush2.png","images/mush3.png","images/mush4.png","images/mush5.png","images/mush6.png")
 turtle=loadAnimation("images/tur1.png","images/tur2.png","images/tur3.png","images/tur4.png","images/tur5.png")
 jumpsound=loadSound("sounds/jump.mp3");
 overSound=loadSound("sounds/dieSound.mp3")                 //preload functions preload the things before starting the game so it make the game smooth
 
}

function setup() {
createCanvas(1360, 690);
bg=createSprite(600,300);
bg.addImage(bgimage);
mario=createSprite(100,490,20,50);
mario.addAnimation("running",runmario);
bg.scale=0.5
mario.scale=0.2
ground=createSprite(680,580,1360,10)
ground.visible=false;  //ground is there to have that gravity .We Make it invisible 
brickgroup=new Group()
coingroup=new Group()  
obstacles=new Group()

}


function draw() {
 if (keyDown("space")){
 if(mario.y>140) 
 jumpsound.play()   
 mario.velocityY=-10
 }                                      //
 if (keyDown("right")){   
 mario.x+=7
 }
  if (keyDown("left")){   
 mario.x-=7
 }
 mario.velocityY+=0.5
 mario.collide(ground)
 bg.velocityX=-3
 if(bg.x<170)
 bg.x=600 //
 
 createBricks()
 for (let i=0;i<brickgroup.length;i++){
  var temp=brickgroup.get(i)    //temp=temporary variable
  mario.collide(temp) 
 }
 createCoins()
 for(let i=0;i<coingroup.length;i++){
   var temp=coingroup.get(i)
   if (mario.isTouching(temp)){
     temp.destroy()
    coinsound.play()
    score++ //
   }
 }
 createObstacles()
 for (let i=0;i<obstacles.length;i++){
  var temp=obstacles.get(i)    
  if (mario.isTouching(temp)){
    gameOver=true;
  } 
 }

 drawSprites()
 if (gameOver){
  mario.addAnimation(deadmario)
    textFont('Helvetica');
    fill("red")
    textSize(50)
    text("Game Over",500,141)
    overSound.play()
    noLoop();
 }
 textSize(20)
 fill("brown")
 text("Coins Collected:"+score,1100,80)



}  //temp=temp.var

function createCoins(){
  if(frameCount%40==0){
  var coin=createSprite(1000,500,40,40) 
  coin.y=random(200,400) //200-400 ke bich me coins appear honge
  coin.addAnimation("mycoin",coins)
  coin.scale=0.1
  coin.velocityX=-3
  coin.lifetime=550  //lifetime=p5 draw function runs 30 times every one second(30FPS) so the time coin liftime is 550/30s.
  coingroup.add(coin)
}
}

function createBricks(){
  if(frameCount%40==0){
  var brick=createSprite(1000,500,40,10) 
  brick.y=random(200,400) 
  brick.addImage(brickimage)
  brick.scale=0.4
  brick.velocityX=-5
  brick.lifetime=250
  brickgroup.add(brick)
  
}
}

function createObstacles(){
  
  if(frameCount%80==0){  //after every 40 frames (40/30) every obstacle is created.
  var obs=createSprite(1000,550,10,40) 
  var rand=Math.round(random(0.5,3))
  obs.scale=0.1
  switch(rand){
    case 1:
      obs.addAnimation("mush",mush)
      obs.velocityX=-4
      break;
    case 2:
      obs.addAnimation("tut",turtle)
      obs.velocityX=-4
      break;
    case 3:
      obs.addImage(pipes)
      obs.velocityX=-3
      break;  
  } 

  obs.lifetime=350
  obstacles.add(obs)
  
}
}
