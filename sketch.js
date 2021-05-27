const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
var thunder, thunder1,thunder2,thunder3,thunder4;
var batAnimation,bat;


var engine, world;

var rand;

var raindrops = []


var thunderCreatedFrame=0;

function preload(){
    thunder1 = loadImage("1.png");
    thunder2 = loadImage("2.png");
    thunder3 = loadImage("3.png");
    thunder4 = loadImage("4.png");

    batAnimation = loadAnimation("bat1.png","bat2.png","bat3.png",
                        "bat4.png","bat5.png","bat6.png",
                        "bat7.png","bat8.png","bat9.png",
                        "bat10.png","bat11.png","bat12.png");
   
}

function setup(){
    engine = Engine.create();
    world = engine.world;

    createCanvas(700,700);
    umbrella = new Umbrella(200,500);

    //create drops
    for (var l = 20; l <=width-10; l=l+50) 
  {
    raindrops.push(new Rain(360));
  }
    
}

function draw(){
    Engine.update(engine);
    background("Black"); 

    //creating thunder
    rand = Math.round(random(1,4));
    if(frameCount%80===0){
        thunderCreatedFrame=frameCount;
        thunder = createSprite(random(10,370), random(10,30), 10, 10);
        switch(rand){
            case 1: thunder.addImage(thunder1);
            break;
            case 2: thunder.addImage(thunder2);
            break; 
            case 3: thunder.addImage(thunder3);
            break;
            case 4: thunder.addImage(thunder4);
            break;
            default: break;
        }
        thunder.scale = random(0.3,0.6)
    }
   

    bat= createSprite(Math.round(random(0,400)),Math.round(random(0,400)));
    bat.addAnimation("moving_bat",batAnimation);
    bat.visible = false;
    if(frameCount % 100 === 0){
       bat.visible = true;
        bat.velocityX = Math.round(random(-4,4));
        bat.velocityY = Math.round(random(-4,4));
        bat.scale=0.4;
        
       
    }
    if (frameCount% 6 === 0){
        raindrops.push(new Rain(random(width/2 -30,width/2 +30),10,10))
      
      }

    if(thunderCreatedFrame + 10 ===frameCount && thunder){
        thunder.destroy();
    }
    if (frameCount% 100){
        raindrops.push(new Rain(random(1,1570), random(1,3), 10, 10))
        raindrops.velocityY = 10
    }
    
    umbrella.display();

    //display rain drops
    for (var l = 0; l < raindrops.length; l++) {
        raindrops[l].display();
      }

    drawSprites();
}   

