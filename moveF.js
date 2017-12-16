//function keyReleased() {
//  visibleGame.ship.setRotation(0);
//  visibleGame.ship.boosting(false);
//}

function keyPressed() {
  if (keyCode == ENTER) {
    init();
  }
  if(key == ' ') {
    if(gameDisplayMode == true) gameDisplayMode = false;
    else gameDisplayMode = true;
  }
  /*if (key == ' ') {
    visibleGame.lasers.push(new Laser(visibleGame.ship.pos, visibleGame.ship.heading));
    pew.play();
  }
  if (keyCode == RIGHT_ARROW) {
    visibleGame.ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    visibleGame.ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    visibleGame.ship.boosting(true);
  }*/
}

/*function closestAst(AIPlayer, n, asteroids) {
  var temp = [];
  var inputs = [];
  var minA = 0;
  var tempD = 10000;
  arrayCopy(asteroids,temp,asteroids.length);
  //inputs.push(AIPlayer.pos.x);
  //inputs.push(AIPlayer.pos.y);

  for (var j = 0; j < n * 2; j++) {
    for (var i = 0; i < temp.length; i++) {
      var d = dist(AIPlayer.pos.x, AIPlayer.pos.y, temp[i].pos.x, temp[i].pos.y);
      if (d < tempD) {
          console.log("veri close");
        tempD = d;
        minA = i;
      }
    }
    var vect = createVector(0, 0);
    vect = temp[minA].pos.sub(ship.pos);
    inputs.push(tempD);
    console.log(tempD);
    //inputs.push(vect.y);
    temp.splice(minA, 1);
  }
  return inputs;
}*/

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
        //console.log(map((p5.Vector.fromAngle(Player.heading)).angleBetween(PlayerVectorCopy), 0, 2, 0, 1));
    } else inputs.push(0);
  }
  return inputs;
}
