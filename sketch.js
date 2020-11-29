        var ghost,ghostImage,ghostJump;
        var tower,towerImage;
        var door,doorImage;
        var climber,climberImage;
        var doorGroup,climberGroup;
        var invisibleBlock,invisibleBlockGroup;
        var collidingBlock,collidingBlockGroup;
        var spooky;
        var PLAY=1;
        var END=0;
        var gameState=PLAY;
        var score=0;
        var startWall;


function preload() {
        towerImage=loadImage("tower.png");
        ghostImage=loadImage("ghost-standing.png");
        ghostJump=loadImage("ghost-jumping.png");
        doorImage=loadImage("door.png");
        climberImage=loadImage("climber.png");
        spooky=loadSound("spooky.wav")
}

function setup() {
        createCanvas(600,600);

        tower=createSprite(300,300,600,600);
        tower.addImage("tow",towerImage);
        tower.velocityY=1.5;

        ghost=createSprite(300,500,20,20);
        ghost.addImage("gho",ghostImage);
        ghost.addImage("ju",ghostJump);
        ghost.scale=0.35;

        startWall=createSprite(300,570,600,10);
        startWall.lifetime=75;
        startWall.shapeColor="white";

        doorGroup=new Group();
        climberGroup=new Group();
        invisibleBlockGroup=new Group();
        collidingBlockGroup=new Group();
}


function draw() {
        background("black");

        if(gameState===PLAY) {

          if(tower.y>400){
        tower.y=300;
        }

        if(keyDown("left")) {
          ghost.velocityX=-3;

        }
        if(keyWentUp("left")) {
          ghost.velocityX=0;

        }

        if(keyDown("right")) {
          ghost.velocityX=3;

        }
        if(keyWentUp("right")) {
          ghost.velocityX=0;

        }

        if(keyDown("space")) {

        ghost.velocityY=-5;  
        ghost.changeAnimation("ju",ghostJump)
         }


       if(keyWentUp("space")) {

        ghost.velocityY=0;  
        ghost.changeAnimation("gho",ghostImage);

        }
        ghost.velocityY=ghost.velocityY+0.2;
        spooky.loop()

        ghost.depth=ghost.depth+100;
        ghost.collide(collidingBlockGroup);

       // ghost.debug=true;
        ghost.setCollider("circle",0,0,110);

        spawnDoor();

       ghost.collide(startWall);


          if(ghost.isTouching(invisibleBlockGroup)) {
             gameState=END;

          }

          if(ghost.y>600){
            gameState=END;
          }

        drawSprites() ;  

        fill("white");
        textSize(25);
        text("Score:"+score,450,40);
         score= score+ Math.round(getFrameRate()/60);

      }
      else if (gameState===END){
       textSize(30);
       fill("yellow");
       text("GAME OVER",230,300);

      }
      }
 function spawnDoor() {
  
  if(frameCount%200 ===0) {
    
    
          door=createSprite(300,-50,10,10);
          door.addImage("do",doorImage)
          door.scale=1;
          door.velocityY=1;
          door.x =Math.round(random(100,400));
          door.lifetime=400;
          doorGroup.add(door);


         climber=createSprite(300,10,10,10);
         climber.addImage("climb",climberImage);
         climber.lifetime=400;
         climber.velocityY=1;
         climber.x= door.x;
         climberGroup.add(climber);


          invisibleBlock=createSprite(300,15,70,5);
          invisibleBlock.lifetime=400;
          invisibleBlock.velocityY=1;
          invisibleBlock.x=climber.x;
          invisibleBlockGroup.add(invisibleBlock);
          invisibleBlock.visible=false;

          collidingBlock=createSprite(300,5,70,5);
          collidingBlock.x=climber.x;
          collidingBlock.lifetime=400;
          collidingBlock.velocityY=1;
          collidingBlockGroup.add(collidingBlock);
          collidingBlock.visible=false;
        }
        }
