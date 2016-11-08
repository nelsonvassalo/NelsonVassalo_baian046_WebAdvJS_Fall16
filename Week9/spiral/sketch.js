var r = 0;
var theta = 0;
var position; 

function setup(){
  createCanvas(1680, 1000);
  background(255);
  position = createVector(0, 0); 
}

function draw(){
 
   position.x = r*cos(theta);
   position.y = -r*sin(theta);
   theta += .1;
  fill(255,10);
  rect(0,0,width, height);
  
  fill(0, 0, 255);
  noStroke();
  ellipse(position.x+width/2, position.y+height/2, 10, 10);

  
  r+= .1;
  
}