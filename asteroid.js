Asteroid = function(pos, r) {
  if (pos) {
    this.pos = pos.copy();
  } else {
    var position = random(0, 40);
    if (position >= 30) {
      this.pos = createVector(random(0, width / 4), random(0, height * 3 / 4));
    } else if (position >= 20) {
      this.pos = createVector(random(width / 4, width), random(0, height / 4));
    } else if (position >= 10) {
      this.pos = createVector(random(width / 4 * 3, width), random(height / 4, height));
    } else {
      this.pos = createVector(random(0, width / 4), random(height * 3 / 4, height));
    }
  }

  if (r) {
    this.r = r * 0.5;
  } else {
    this.r = random(15, 70);
  }

  this.vel = p5.Vector.random2D();
  this.total = floor(random(5, 15));
  this.offset = [];
  this.mass = this.r / 10000;
  for (var i = 0; i < this.total; i++) {
    this.offset[i] = random(-5, 5);
  }

  this.edges = function() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }

    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }

  this.breakup = function() {
    var newA = [];
    newA[0] = new Asteroid(this.pos, this.r);
    newA[1] = new Asteroid(this.pos, this.r);
    return newA;
  }

  this.update = function() {
    this.pos.add(this.vel);
  }

  this.show = function() {

    push();
    translate(this.pos.x, this.pos.y);
    noFill();
    stroke(255);
    beginShape();
    for (var i = 0; i < this.total; i++) {
      var angle = map(i, 0, this.total, 0, TWO_PI);
      var x = (this.r + this.offset[i]) * cos(angle);
      var y = (this.r + this.offset[i]) * sin(angle);

      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
}
