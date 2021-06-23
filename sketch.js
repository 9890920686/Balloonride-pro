
var bagroundimg
var groundb, ground
var balloon, balloonimg
var database

var balloonposition
var position

function preload(){
  bagroundimg = loadImage("b1.png")
  balloonimg = loadImage("b2.png")
}
function setup() {
  createCanvas(1367, 640);

  database = firebase.database();

  balloonposition = database.ref('balloon/position')
  balloonposition.on("value", readPosition, showError)

 

  ground = createSprite(683.5, 640, 1367, 10);

  balloon = createSprite(100, 100, 20, 20)
  balloon.addImage(balloonimg)
  balloon.scale = 0.5
}

function draw() {

  background(bagroundimg);

  if (position != undefined) {

    if (keyDown(LEFT_ARROW)) {
      writePosition(-1, 0);
    }
    else if (keyDown(RIGHT_ARROW)) {
      writePosition(1, 0);
    }
    else if (keyDown(UP_ARROW)) {
      writePosition(0, -1);
    }
    else if (keyDown(DOWN_ARROW)) {
      writePosition(0, +1);
    }

    drawSprites();

  }
}

function writePosition(x, y) {

  database.ref('balloon/position').set({
    'x': position.x + x,
    'y': position.y + y
  })
}

function readPosition(data) {
  position = data.val();

  balloon.x = position.x
  balloon.y = position.y
}

function showError() {
  console.log("sorry system cant acess database right now")
}