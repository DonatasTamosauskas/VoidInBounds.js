var Neuvol; //global
var gen = []; //global
var song; //global
var pew; //global
var boom; //global
var asteroids = []; //class
var lasers = []; //class
var frames; //class
var level = -1; //global
var intensityTime = 60; //global
var gameIsRuning = false; //global
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
    mutationRange: 2
  });

  song = loadSound("track.wav", function () {
      song.loop()
  });
  pew = loadSound("pew.wav");
  boom = loadSound("boom.wav");

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

function closestAst(Player, n, asterArr){
    var inputs = [];
    var PlayerVectorCopy = Player.pos.copy();
    var minDistance = sqrt(width * width + height * height);
    var minAsteroidId;
    for(var i = 0; i < asterArr.length; i++) {
        var d = dist(Player.pos.x, Player.pos.y, asterArr[i].pos.x, asterArr[i].pos.y);
        if(d < minDistance) {
            //console.log(map(minD, 0, sqrt(width * width + height * height), 0, 5));
            minDistance = d;
            minAsteroidId = i;
        }
    }
    for(var i = 0; i < n / 2; i++) {
        if(minDistance < 200){
            inputs.push(map(minDistance, 0, width, 0, 1));
            PlayerVectorCopy.sub(asterArr[minAsteroidId].pos);
            inputs.push(map((p5.Vector.fromAngle(Player.heading)).angleBetween(PlayerVectorCopy), 0, 2 * Math.PI, 0, 1));
        } else inputs.push(0);
    }
    return inputs;
}