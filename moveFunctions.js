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