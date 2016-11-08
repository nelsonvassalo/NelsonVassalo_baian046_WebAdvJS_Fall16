var classNames = ["Kuldeep", "Karl", "Paul", "Aimee", "Qinwen", "Nelson",
"Jie", "Rebecca", "Shuang", "Julia", "Liang", "Sydney" ];
var num = classNames.length;

function setup() {
  smooth();
  createCanvas(500,500);
  background(0,0,255);
  textSize(60);
  textFont("Helvetica");
  textAlign(CENTER);  
 
}

function draw() {
 
}

function mouseMoved() {
  fill(0,0,255,60);
  rect(0,0,width, height);
  fill(255);  
  
  text(classNames[int(random(num))],mouseX, mouseY);
}