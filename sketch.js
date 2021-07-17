//declaring objects and score
var monkey, monkeyRunning,monkeyCollided;
var back, backImage;
var obstaclesGroup, obstacle, obstacleImage;
var bananasGroup, banana, bananaImage
var ground, groundImage;
var score;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameOver, gameOverImage, restart, reastartImage;

//loading images and animations
function preload(){
backImage=loadImage("forest.jpg");
monkeyRunning=loadAnimation("monkey1.png","monkey2.png","monkey3.png","monkey4.png","monkey5.png","monkey6.png","monkey6.png","monkey7.png","monkey8.png");
monkeyCollided=loadAnimation("monkey9.png");
obstacleImage=loadImage("obstacle.png");
bananaImage=loadImage("banana.png");
groundImage=loadImage("Wood.png");
gameOverImage=loadImage("Picture1.png");
restartImage=loadImage("Picture2.png");
}

//creating objects and score
function setup() {
createCanvas(windowWidth, windowHeight);
back=createSprite(width/4,height-10,width,100);
back.addImage(backImage);
back.scale=3;
monkey=createSprite(100,height-70,20);
monkey.addAnimation("running",monkeyRunning);
monkey.addAnimation("collided",monkeyCollided);
monkey.scale=0.2;
ground=createSprite(350,650);
ground.addImage(groundImage);
ground.scale=1;
obstaclesGroup=createGroup();
bananasGroup=createGroup();
score=0;
gameOver=createSprite(350,200);
gameOver.addImage(gameOverImage);
gameOver.scale=0.2
restart=createSprite(350,300);
restart.addImage(restartImage);
restart.scale=0.2;
}

function draw() {
background("white");
if (gameState===PLAY){
  back.velocityX=-5;
  monkey.changeAnimation("running", monkeyRunning);
  if (back.x<=0) {
  back.x=back.width/2;
  }
//setting collider
ground.debug=false;
ground.setCollider("rectangle",0,330);
 if ((touches.length>0||keyDown("space"))){
 monkey.velocityY=-16;
     }
//adding gravity
monkey.velocityY=monkey.velocityY+0.8;
monkey.collide(ground);
gameOver.visible=false;
restart.visible=false;
bananas();
obstacles();
 if (monkey.isTouching(obstaclesGroup)){
 gameState=END;  
 }
 if (monkey.isTouching(bananasGroup)){
  score=score+1;
  bananasGroup.destroyEach();
  } 
}
else if (gameState===END){
score=0;
  monkey.y=height-70;
gameOver.visible=true;
restart.visible=true;
back.velocityX=0;
obstaclesGroup.destroyEach();
bananasGroup.destroyEach();
 if ((touches.length>0)||mousePressedOver(restart)){
 gameState=PLAY;
 }
monkey.changeAnimation("collided", monkeyCollided);
monkey.collide(ground);
}
drawSprites();
//displaying score in text
fill("white")
textSize(20);
text ("SCORE:"+score,500,50);
  
}
//creating a function for obstacles
function obstacles(){
  if (frameCount%300===0){
   obstacle=createSprite(300,450);
   obstacle.addImage(obstacleImage);
   obstacle.scale=0.2;
   obstacle.lifetime=150;
   obstacle.velocityX=-5;
   obstaclesGroup.add(obstacle);
  } 
}
//creating a function for bananas
function bananas(){
  if(frameCount%80===0){
    banana=createSprite(300,350);
    banana.y=Math.round(random(250,200));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-5;
    banana.lifetime=150;
    bananasGroup.add(banana);
  }
}




