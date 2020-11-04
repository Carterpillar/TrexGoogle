var trex;
var trex_running;
var ground;
var groundImage;
var invisibleGround;
var score;
var cloud;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var play = 1;
var end = 0;
var gamestate = play;
var trex_collided;
var gameOver;
var restart;
var gameOverImg,restartImg;
var jumpSound;
var dieSound;
var cpSound;
function preload(){
trex_running = loadAnimation("trex1.png","trex3.png","trex4.png"); 
trex_collided = loadImage("trex_collided.png");
groundImage  = loadImage("ground2.png");
  
cloudImage = loadImage("cloud.png");
obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");
obstacle5 = loadImage("obstacle5.png");
obstacle6 = loadImage("obstacle6.png");
restartImg = loadImage("restart.png");
gameOverImg = loadImage("gameOver.png");
  
jumpSound = loadSound("jump.mp3");
dieSound = loadSound("die.mp3");
cpSound = loadSound("checkPoint.mp3");
}
function setup(){
createCanvas(600,200);
score = 0;
  
trex = createSprite(50,180,20,50);  
trex.addAnimation("trex_running",trex_running);
trex.addAnimation("collided",trex_collided);
trex.scale = 0.5;  

  
ground = createSprite(200,180,400,20); ground.addImage("ground",groundImage);
ground.x = ground.width /2;
gameOver = createSprite(300,100);
gameOver.addImage("collided",gameOverImg);
gameOver.scale = 0.5;
restart = createSprite(300,140);
restart.addImage("restartImg",restartImg);
restart.scale = 0.5; 
  
invisibleGround = createSprite(200,190,400,10); invisibleGround.visible = false;   
  
obstaclesGroup = createGroup();
cloudsGroup = createGroup();  
  
trex.setCollider("circle",0,0,10);
trex.debug =false;
}
function draw(){
background("white");
textSize(12.5);
text(score,500,50);
console.log(frameCount);
  
if (gamestate==play){ 
score = score+Math.round(getFrameRate()/60); 
gameOver.visible=false;
restart.visible=false;
ground.velocityX =-(4+4*score/100); 
if (keyDown("space") && trex.y>=155) {
trex.velocityY = -20;  
jumpSound.play();

} 

if (score>0 && score%100==0){
cpSound.play();    
}
if (ground.x<0){
ground.x = ground.width/2;  
}
 
trex.velocityY = trex.velocityY + 1.5; 
  
spawnClouds();
spawnObstacles();
if(obstaclesGroup.isTouching(trex)){
gamestate = end;   
dieSound.play();  
}
}
else
if (gamestate==end){
gameOver.visible = true;
restart.visible = true;
ground.velocityX =0;    
trex.velocityY = 0; 
trex.changeAnimation("collided",trex_collided);
obstaclesGroup.setLifetimeEach(-1);    
cloudsGroup.setLifetimeEach(-1);
obstaclesGroup.setVelocityXEach(0);
cloudsGroup.setVelocityXEach(0);
if (mousePressedOver(restart)){
reset();
}
}

trex.collide(invisibleGround);

drawSprites(); 
}
function reset(){
gameOver.visible = false;  
restart.visible  = false; 
obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();
trex.changeAnimation("trex_running",trex_running);
score = 0;
gamestate= play;
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX =-(5+score/300);
   
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
     
      default: break;
    }
   
      
    obstacle.scale = 0.8;
    obstacle.lifetime = 300;
   
   
  obstaclesGroup.add(obstacle);  
 }
}

function spawnClouds() {
  
   if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
   
    cloud.lifetime = 200;
    

    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
  cloudsGroup.add(cloud);
    
    }
}