function GamePAI() {
  this.gameIsAlive = true;
  this.asteroids = [];
  this.lasers = [];

  this.ship = new Ship();
  this.AIShip = new AI();

  for(var i = 0; i < 10; i++){
    this.asteroids.push(new Asteroid());
  }
}

GamePAI.prototype.GameLoop = function(n) {
  if (this.gameIsAlive) {
    frames++;

    // Sends inputs to Neural network, computes output
    var res = gen[n].compute(closestAst(this.AIShip, (nbSensors / 2), this.asteroids));
    // Moves accordingly to output
    if (res[0] > 0.65) {
      this.AIShip.setRotation(0.1);
    } else if (res[0] < 0.45) {
      this.AIShip.setRotation(-0.1);
    } else {
      this.AIShip.setRotation(0);
      this.AIShip.boosting(false);
    }
    if (res[1] > 0.65) {
      this.AIShip.boosting(true);
    } else if (res[1] < 0.45) {
      if (this.AIShip.currentCooldown >= this.AIShip.cooldown) {
        lasers.push(new Laser(this.AIShip.pos, this.AIShip.heading));
        pew.play();
        this.AIShip.currentCooldown = 0;
      }
    } else {
      this.AIShip.setRotation(0);
      this.AIShip.boosting(false);
    }
    this.AIShip.currentCooldown++;

    fill(255);
    textSize(32);
    textAlign(LEFT);
    text("Score is: " + score, 50, 50);
    text("Level " + level, width - 150, 50)

    if (frames >= 1000) {
      var asteroidGroupSize = floor(random(0, 100));
      if (asteroidGroupSize > 95) {
        extraAsteroid();
        extraAsteroid();
        extraAsteroid();
        extraAsteroid();
      } else if (asteroidGroupSize > 75) {
        extraAsteroid();
        extraAsteroid();
        extraAsteroid();
      } else if (asteroidGroupSize > 45) {
        extraAsteroid();
        extraAsteroid();
      } else if (asteroidGroupSize > 20) {
        extraAsteroid();
      }
      if (score > intensityTime) {
        frames = 600;
      } else {
        frames = 600 * score / intensityTime;
      }
    }

    for (var i = 0; i < this.asteroids.length; i++) {
      if (this.AIShip.hits(this.asteroids[i])) {
        Neuvol.networkScore(gen[n], score); // Will destroy the very best AI !!!!!!!!!!!
        this.AIShip.isAlive = false;
      }
      if (this.ship.hits(this.asteroids[i])) {
        this.ship.isAlive = true;//false;
      }
      if (!this.AIShip.isAlive && !this.ship.isAlive) {
        this.gameIsAlive = false;
      }
      this.asteroids[i].show();
      this.asteroids[i].update();
      this.asteroids[i].edges();
    }
    // )

    /*for (var i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i]) && aiAlive == 0) { // Will destroy the very best AI !!!!!!!!!!!
        //ship gotta die
        levelStart();
        gameIsRuning = false;
        break;
      }
    }*/

    for (var i = this.lasers.length - 1; i >= 0; i--) {
      this.lasers[i].update();
      this.lasers[i].render();

      if (this.lasers[i].offscreen()) {
        this.lasers.splice(i, 1);
      } else {
        for (var j = this.asteroids.length - 1; j >= 0; j--) {
          if (this.lasers[i].hits(this.asteroids[j])) {

            boom.play();
            if (this.asteroids[j].r > 15) {
              var newAsteroids = this.asteroids[j].breakup();
              this.asteroids = this.asteroids.concat(newAsteroids);
            }
            this.asteroids.splice(j, 1);
            this.lasers.splice(i, 1);
            break;
          }
        }
      }
    }

    if (this.ship.isAlive) this.ship.render();
    this.ship.turn();
    this.ship.update();
    this.ship.edges();

    if (this.AIShip.isAlive) this.AIShip.render();
    this.AIShip.turn();
    this.AIShip.update();
    this.AIShip.edges();
  }
}
