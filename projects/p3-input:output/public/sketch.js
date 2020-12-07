var socket;
var input;
var myY= 200;
var canvas;
var opponentMsg;
let confettiColor = [], confetti = [];

function preload () {
  opponentMsg = loadImage('images/opponent.png');
}

function aabb(rect1, rect2) {
   return (rect1.x < rect2.x + rect2.w/2 &&
    rect1.x + rect1.w/2 > rect2.x &&
    rect1.y < rect2.y + rect2.h/2 &&
    rect1.y + rect1.h/2 > rect2.y)
}

function checkCollision(rect1, rect2){
  return (rect1.x + rect1.w/2 > rect2.x - rect2.w/2)
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-2');

  rectMode(CENTER);
  textAlign(CENTER);
  
  // title = createElement('h1', 'COMPETE YOUR COMPLAINT');
  // title.position(55, 15);

  // yourTitle = createElement('h2', 'Your Complaints:');
  // yourTitle.position(1050, 135);
  // yourTitle.style('z-index', '-1');

  // opponentsTitle = createElement('h2', "Your Opponent's:");
  // opponentsTitle.position(100, 135);
  // opponentsTitle.style('z-index', '-1');

  socket = io.connect('http://localhost:3000');
  socket.on('in', otherGreeting);
  socket.on('other', function(data){
     otherBox.w = data.w;
     otherBox.h = data.h;
   });

  box = new Box(825, 350, "#4363E5");
  otherBox = new Box(525, 350, "#F03B3B");

  input = createInput();
  input.position(1030, 600);

  button = createButton('SUBMIT');
  button.position(input.x + input.width + 10, 600);
  button.mousePressed(greet);

  confettiColor = confettiColor = [color('#80E3D8'), color('#B5FF9A'), color('#FF7C55'), color('#FFFB90'), color('#FFA5F8'), color('#2F57FF'), color('#D911CA')];
  for (let i = 0; i < 100; i++) {
    confetti[i] = new Confetti(random(0, width), random(-height, 0), random(-1, 1));
  }

}

function greet() {
  let name = input.value();

  complaints = createElement('h3', name);
  complaints.position(1050, myY);

  input.value('');

  myY = myY + 25;

  var data = {
		message: name,
	}

	socket.emit('in', data);
}

function otherGreeting(data) {
	myY = myY + 25;

	otherComplaints = createElement('h3', data.message);
  otherComplaints.position(200, myY);

  // bubble = new Bubble(otherComplaints.x, otherComplaints.y)
}


function keyPressed() {
   	if (keyCode===ENTER){
   	box.sizeChanger();
	 	greet();
	}
 }

function draw() {
  // background(360);

  fill(255);
  rect(1150, 350, 250, 425);
  rect(200, 350, 250, 425);

  line(1025, 200, 1275, 200);
  line(75, 200, 325, 200);

	box.render();
  otherBox.render();

  // bubble.render();

  	if (checkCollision(otherBox, box)) {
        console.log("aabb is true")

        if (box.w > otherBox.w){
          canvas.style('z-index', '1');

          background("#4363E5");

          title = createElement('h1', 'Congrats on the Pity Party!');
          title.position(200, 200);

          for (let i = 0; i < confetti.length / 2; i++) {
          confetti[i].confettiDisplay();

          if (confetti[i].y > height) {
            confetti[i] = new Confetti(random(0, width), random(-height, 0), random(-1, 1));
          }
        }

        for (let i = int(confetti.length / 2); i < confetti.length; i++) {
          confetti[i].confettiDisplay();

          if (confetti[i].y > height) {
            confetti[i] = new Confetti(random(0, width), random(-height, 0), random(-1, 1));
          }
        }
        

        } else {
          background("#F03B3B");

          canvas.style('z-index', '1');

          title = createElement('h1', 'Try Harder Next Time!');
          title.position(300, 200);
        }

    }
}