var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var fruitGroup, obstacleGroup
var ground;
var gameState = 1;
var PLAY = 1;
var END = 0;
var score = 0;
var survivalTime = 0;

function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {
  createCanvas(400, 400);
  monkey = createSprite(50, 300, 30, 30);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.08;
  ground = createSprite(200, 350, 500, 10);
  fruitGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background("white");
  if (gameState === PLAY) {
    if (keyDown("space") && monkey.y > 180) {
      monkey.velocityY = -12;
    }
  }
  if(gameState!=END){
   survivalTime = Math.ceil(frameCount / frameRate());
  }else{
   survivalTime=survivalTime+0;
  }  
  monkey.velocityY = monkey.velocityY + 1;
  monkey.collide(ground);
  var select = Math.round(random(1, 2));
  if (frameCount % 50 === 0) {
    if (select === 1) {
      spawnFruits();
    }
    if (select === 2) {
      spawnObstacle();
    }
  }
  if (monkey.isTouching(fruitGroup)) {
    score = score + 10;
    fruitGroup.destroyEach();
  }

  if (monkey.isTouching(obstacleGroup)) {
    gameState = END;
  }

  if (gameState === END) {
    obstacleGroup.setLifetimeEach(0);
    fruitGroup.setLifetimeEach(0);
    obstacleGroup.setVelocityEach(0);
    fruitGroup.setVelocityEach(0);
    monkey.x = 200;
    monkey.y = 200;
    textSize(30);
    fill("red");
    text("GAME OVER", 130, 180);
    score = 0
    survivalTime = 0;
  }
  drawSprites();
  textSize(15);
  fill("green");
  text("score:" + score, 50, 50);

  textSize(20);
  fill("brown")
  text("survivalTime:" + survivalTime, 180, 50);

}

function spawnObstacle() {
  obstacle = createSprite(452, 315, 20, 20)
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.2;
  obstacle.velocityX = -5;
  obstacle.lifetime = 200;
  obstacleGroup.add(obstacle);
}

function spawnFruits() {
  banana = createSprite(420, Math.round(random(100, 200)), 20, 20);
  banana.addImage(bananaImage);
  banana.scale = 0.08;
  banana.velocityX = -7;
  banana.lifetime = 200;
  fruitGroup.add(banana);
}
