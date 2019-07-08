// Easier hash generation for animation mapping.
function animMap(startRow, startCol, endRow, endCol) {
  return {
    startRow: startRow,
    startCol: startCol,
    endRow: endRow,
    endCol: endCol,
  };
}

// The SpriteMap for the player.
function playerSpriteMap() {
  var animMaps = {
    right:     animMap(3, 0, 3, 1),
    left:      animMap(1, 0, 1, 1),
    up:        animMap(2, 0, 2, 1),
    down:      animMap(0, 0, 0, 1),
    lookRight: animMap(3, 0, 3, 0),
    lookLeft:  animMap(1, 0, 1, 0),
    lookUp:    animMap(2, 0, 2, 0),
    lookDown:  animMap(0, 0, 0, 0),
    pushRight: animMap(7, 0, 7, 1),
    pushLeft:  animMap(5, 0, 5, 1),
    pushUp:    animMap(6, 0, 6, 1),
    pushDown:  animMap(4, 0, 4, 1),
  };

  return new SpriteMap('img/player.png', {
    stand:     animMaps.lookDown,
    right:     animMaps.right,
    left:      animMaps.left,
    up:        animMaps.up,
    down:      animMaps.down,
    upRight:   animMaps.right,
    upLeft:    animMaps.left,
    downRight: animMaps.right,
    downLeft:  animMaps.left,
    lookRight: animMaps.lookRight,
    lookLeft:  animMaps.lookLeft,
    lookUp:    animMaps.lookUp,
    lookDown:  animMaps.lookDown,
    pushRight: animMaps.pushRight,
    pushLeft:  animMaps.pushLeft,
    pushUp:    animMaps.pushUp,
    pushDown:  animMaps.pushDown,
  }, {
    frameW: 16,
    frameH: 16,
    interval: 220,
    useTimer: false,
  });
}
