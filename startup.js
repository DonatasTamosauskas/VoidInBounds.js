var visibleGame;
var games = [];

function levelStart() {
  score = 0;
  gen = Neuvol.nextGeneration();
  for(var i = 0; i < populationSize; i++){
    games[i] = new GameAI();
  }
  //visibleGame = new GamePAI();
  level++;
  frames = 0;
}

function welcomeScreen() {
  gameIsRuning = false;
  background(0);
  textSize(32);
  fill(255);
  textAlign(CENTER);
  text("Press <ENTER> to start", width / 2, height / 2);
}

function init() {
  gameIsRuning = true;
  gameHasBegun = true;
  levelStart();
}