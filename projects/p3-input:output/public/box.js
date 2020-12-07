
class Box {
	constructor(x,y, color) {
		this.x = x;
	    this.y = y;
	    this.w = 50;
	    this.h = 50;
	    this.increment = 30
	    this.color = color
	}

	sizeChanger() {
    	this.w += this.increment;
    	this.h += this.increment;
    	var data = {
    		w: this.w,
    		h: this.h
    	} 	
    	socket.emit('other', data);
	}

	shrinker() {
		console.log("we have collided")
		this.w -= this.increment;
    	this.h -= this.increment;
    	var data = {
    		w: this.w,
    		h: this.h
    	} 	
		socket.emit('other', data);
	}

	render() {
    	fill(this.color);
    	strokeWeight(1);
		rect(this.x, this.y, this.w, this.h);
	}
}

// class Bubble{
// 	constructor(x,y) {
// 		this.x = x;
// 	    this.y = y;
// 	}

// 	render() {
// 		image(opponentMsg, this.x, this.y);
// 	}
// }


class Confetti {
  constructor(_x, _y, _s) {
    this.x = _x;
    this.y = _y;
    this.speed = _s;
    this.time = random(0, 100);
    this.color = random(confettiColor);
    this.amp = random(2, 30);
    this.phase = random(0.5, 2);
    this.size = random(width / 25, height / 55);
    this.form = round(random(0, 1));
  }

  confettiDisplay() {
    fill(this.color);
    strokeWeight(1);
    push();
    translate(this.x, this.y);
    translate(this.amp * sin(this.time * this.phase), this.speed * cos(2 * this.time * this.phase));
    rectMode(CENTER);
    ellipse(0, 0, this.size);
    pop();

    this.time = this.time + 0.1;

    this.speed += 1 / 300;

    this.y += this.speed;
  }
}
