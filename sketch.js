var Neuvol; //global
var gen = []; //global
var generation = 0; //..
var ships; //class
var ship; //class
var song; //global
var pew; //global
var boom; //global
var asteroids = []; //class
var lasers = []; //class
var frames; //class
var level = -1; //global
var intensityTime = 60; //global
var gameIsRuning = false; //global
var framesForText = 0; //global
var score = 0; //global
var gameHasBegun = false; //global
var nbSensors = 2; //global
var gameDisplayMode = true;
var fastGens = 200;
var populationSize = 3;

function setup() {
  createCanvas(1300, 600);

  Neuvol = new Neuroevolution({
    population: populationSize,
    network: [nbSensors, [9], 3],
    randomBehaviour: 0.05,
    mutationRate: 0.05,
    mutationRange: 2,
  });

  /*song = loadSound("track.wav", loaded);
  pew = loadSound("PEW.wav");
  boom = loadSound("BOOM.wav");*/

  frames = 0;
  welcomeScreen();
  if (gameIsRuning) {
    levelStart();
  }
}

function draw() {
  if(gameHasBegun && gameIsRuning && gameDisplayMode){
    background(0);
    if(frames % 20 == 0) score ++;
    frames++;
    var allAiIsDead = true;
    for(var i in games){
      games[i].GameLoop(i);
      if(games[i].gameIsAlive) allAiIsDead = false;
    }

    if(allAiIsDead){
      gameIsRuning = false;
    }
  // Switch between levels
} else if(gameHasBegun && gameDisplayMode) {
    background(0);
    gameIsRuning = true;
    levelStart();
  } else if(gameHasBegun && !gameDisplayMode){
    var fastGensPlayed = 0;

    while(!gameDisplayMode && fastGensPlayed <= fastGens && score < 2000){
      if(frames % 20 == 0) score ++;
      frames++;
      var allAiIsDead = true;
      for(var i in games){
        games[i].GameLoop(i);
        if(games[i].gameIsAlive) allAiIsDead = false;
      }
      if(allAiIsDead){
        score = 0;
        gen = Neuvol.nextGeneration();
        for(var i in games){
          games[i] = new GameAI();
        }
        console.log("fastModeBoi");
        fastGensPlayed++;
        level++;
        frames = 0;
      }
    }
    gameDisplayMode = true;
  }
}

extraAsteroid = function() {
  var side = floor(random(0, 40));
  if (side > 30) {
    asteroids.push(new Asteroid(createVector(-50, floor(random(height)))));
  } else if (side > 20) {
    asteroids.push(new Asteroid(createVector(width + 50, random(height))));
  } else if (side > 10) {
    asteroids.push(new Asteroid(createVector(random(width), -50)));
  } else {
    asteroids.push(new Asteroid(createVector(random(width), height + 50)));
  }
}

/*setInterval(function() {
  score++;
}, 200);*/

/*function draw() { old draw
  // Game running loop
  if(gameHasBegun && gameIsRuning){
    background(0);
    var allAiIsDead = true;
    //visibleGame.GameLoop(0);
    for(var i in games){
      games[i].GameLoop(i);
      if(games[i].gameIsAlive) allAiIsDead = false;
    }

    if(!visibleGame.gameIsAlive && allAiIsDead){
      gameIsRuning = false;
    }
  // Switch between levels
  } else if (gameHasBegun) {
    background(0);
    framesForText++;
    if (framesForText <= 200) {
      text("Next level in: " + (200 - framesForText), width / 2 - 50, height / 2 - 50, width / 2 + 50, height / 2 + 50);
    } else if(framesForText > 200){
      framesForText = 0;
      gameIsRuning = true;
      levelStart();
    //}
  }
} */
