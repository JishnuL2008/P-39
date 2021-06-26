var back, backImg;
var thief, thiefImg;
var police, policeImg;
var invisibleGround;
var handcuff, handcuffImg, handcuffG;
var coin, coinImg, coinG;
var gameState = "start";
var score = 0;
var distance=0;
var gameOver, gameOverImg;

function preload() {
  backImg = loadImage("background.jpg");
  thiefImg = loadImage("thief.png");
  
  handcuffImg = loadImage("handcuff.png");
  coinImg = loadImage("goldcoin.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(600,220);

  back = createSprite(250, 0);
  back.addImage(backImg);
  back.velocityX = 5;
  back.scale = 1.5;

  thief = createSprite(80, 187.5, 10, 10);
  thief.addImage(thiefImg); 
  thief.scale = 0.25;





  invisibleGround = createSprite(250, 220, 550, 10)
  invisibleGround.visible = false;

  handcuffG = new Group();
  coinG = new Group();
}

function draw() {
  background(100);

  if (gameState === "start") {

    back.x = 1200;
    coinG.setVelocityXEach(0);
    handcuffG.setVelocityXEach(0);
    thief.visible = false;
    coinG.visible = false;
    fill("cyan")
    textSize(14);
    text("Try   to   run   away   with   the   Thief.   Don't    get   caught   and   collect   some   Gold Coins.", 15, 110);
    text("Press   Space   to   jump   and   Press   Enter   to   start   the   game.", 50, 130);
    if (keyDown("enter")) {
      gameState = "play";
    }
  }
  if (gameState === "play") {
    distance = distance + Math.round(getFrameRate()/49);
    if (back.x > 350) {
      back.x = 220;
    }
    thief.visible = true;
    if (keyDown("space") && thief.y >= 150) {
      thief.velocityY = -14;
    }

    thief.velocityY = thief.velocityY + 0.8;
    thief.collide(invisibleGround);

    if (handcuffG.isTouching(thief)) {
      gameState = "end";
    }

    if (coinG.isTouching(thief)) {
      score = score + 1;
      coinG.destroyEach();
     
    }
    
    //camera.position.x=x+1
    //camera.position.x=500/2;
    camera.position.x = (thief.x+240);
    spawnCoins();
  spawnHandcuff();
    //camera.position.y=(thief.x+250);
  }
  if (gameState === "end") {
    background(gameOverImg);
   // background(16,67,51)
    gameOverImg.scale=0.00005;
    back.visible = false;
    back.velocityX = 0;
    thief.velocityY = 0;
    thief.visible=false;
    handcuffG.destroyEach();
    coinG.destroyEach();
    handcuffG.setVelocityXEach(0);
    coinG.setVelocityXEach(0);
    handcuffG.setLifetimeEach(-1);
    coinG.setLifetimeEach(-1);

    //fill("black");
    //textSize(20);
    //text("Game Over ", 220, 120);
  }

  //spawnCoins();
  //spawnHandcuff();
  //dist();
  drawSprites();
  stroke("black");
  fill("yellow");
  textSize(13);
  text("Coins Collected: " + score, 350, 40);
  stroke("black");
    fill("yellow");
    textSize(13);
    text("Distance Covered: " +distance,350,60);
 
}

function spawnHandcuff() {
  if (frameCount % 195 === 0) {
    handcuff = createSprite(550, 190, 10, 10);
    handcuff.addImage(handcuffImg);
    handcuff.scale = 0.15;
    handcuff.velocityX = -4;
    handcuffG.add(handcuff);
  }
}

function spawnCoins() {
  if (frameCount % 80 === 0) {
    coin = createSprite(550, 190, 10, 10);
    coin.addImage(coinImg);
    coin.velocityX = -4;
    coin.scale = 0.15;
    coinG.add(coin);
  }
}
function dist(){
  if(getFrameRate % 1 === 0){
    distance=distance+1;
    
  }
}