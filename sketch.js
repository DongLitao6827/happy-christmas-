var myBg
var myDeer
var myTree

function preload() {
  myBg = loadImage('images/bg.png');
  myDeer = loadImage('images/deer.png');
  myTree = loadImage('images/tree.png')
  
 
}
 var snowflakes = []
 
function setup() {
  createCanvas(360,640);

  
  //Deal with microphone
  mic = new p5.AudioIn();
  mic.start();

   
}

function draw() {
  var volume = mic.getLevel();
  
  //If the volume is not enought, re-map it (set a higher newMax).
  var newMax = 5;
  volume = map(volume,0,1,0,newMax);
  
  push();
  translate(width/2,height/2-100);
  imageMode(CENTER)
  image(myBg,0,100,360,640);
  
  pop()
  
  
     
  var deerX = map(volume,0,5,110,160);
  image(myDeer,deerX,310 );   
  image(myTree,160,210,myTree.width/2.5, myTree.height/2.5);
    
 //SNOWFLAKES
  if(true){
    var amount= map(volume,0,1,0,5);
    for(i=1; i <= amount; i++) {
      var obj = {
        x: random(0,1),
        y: random(0,-height/10),
        size: random(1, amount+2)
      }
      //add snowflake to the array of snowflakes
      snowflakes.push(obj);
    }
  }
  
  
  for(var i=0; i< snowflakes.length; i++) {
    var fallingSpeed = 1;
    
    // Increase the single snowflake vertical position
    snowflakes[i].y += fallingSpeed + snowflakes[i].y*0.006; // the last piece needs to simulate gravity
    
    // Create a new ellipse using the x and y properties of the snowflake object
    fill(235,235,188)
    noStroke();
    fill(255);
    ellipse(snowflakes[i].x*width, snowflakes[i].y, snowflakes[i].size);
  }
  
  // Ideally at the end of the sketch:
  // remove elements from array when they go out of the window
  // (not a minimum requirement, just useful for better performances)
  for (var i=snowflakes.length-1; i>= 0; i--){
    if (snowflakes[i].y > height){
      snowflakes.splice(i,1);
    }
  }
}
