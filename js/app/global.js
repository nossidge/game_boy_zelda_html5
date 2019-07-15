// A namespace for global variables and functions.
var GLOBAL = (function(mod) {

  // Size of the world and pixels.
  mod.tileWidth = 15;
  mod.tileHeight = 11;
  mod.pixelZoom = 5;
  mod.pixelsPerTile = 16;
  mod.tileSize = mod.pixelsPerTile * mod.pixelZoom;

  // Handle the case where the player is pretty-much not touching the object.
  // Just help to nudge them around it.
  mod.nudge = function(collideSolid, solidObjects) {
    var pixelsToDodge = 2;
    if (collideSolid.x) {
      var verticalBorders = [playerOffsetBoxes.e, playerOffsetBoxes.w];
      verticalBorders.forEach(function(border) {
        var nearHit = border.nearHit(solidObjects);
        if (nearHit) {
          if (nearHit.overlap <= pixelsToDodge) {
            player.y += nearHit.overlap * nearHit.direction * mod.pixelZoom;
            player.y = Math.round(player.y / mod.pixelZoom) * mod.pixelZoom;
            player.setDrawnY();
          }
        }
      });
    }
    if (collideSolid.y) {
      var horizontalBorders = [playerOffsetBoxes.n, playerOffsetBoxes.s];
      horizontalBorders.forEach(function(border) {
        var nearHit = border.nearHit(solidObjects);
        if (nearHit) {
          if (nearHit.overlap <= pixelsToDodge) {
            player.x += nearHit.overlap * nearHit.direction * mod.pixelZoom;
            player.x = Math.round(player.x / mod.pixelZoom) * mod.pixelZoom;
            player.setDrawnX();
          }
        }
      });
    }
  };

  // Easier hash generation for animation mapping.
  mod.animMap = function(startRow, startCol, endRow, endCol) {
    return {
      startRow: startRow,
      startCol: startCol,
      endRow: endRow,
      endCol: endCol,
    };
  };

  // The SpriteMap for the player.
  mod.playerSpriteMap = function() {
    var animMaps = {
      right:     mod.animMap(3, 0, 3, 1),
      left:      mod.animMap(1, 0, 1, 1),
      up:        mod.animMap(2, 0, 2, 1),
      down:      mod.animMap(0, 0, 0, 1),
      lookRight: mod.animMap(3, 0, 3, 0),
      lookLeft:  mod.animMap(1, 0, 1, 0),
      lookUp:    mod.animMap(2, 0, 2, 0),
      lookDown:  mod.animMap(0, 0, 0, 0),
      pushRight: mod.animMap(7, 0, 7, 1),
      pushLeft:  mod.animMap(5, 0, 5, 1),
      pushUp:    mod.animMap(6, 0, 6, 1),
      pushDown:  mod.animMap(4, 0, 4, 1),
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
      frameW: mod.pixelsPerTile,
      frameH: mod.pixelsPerTile,
      interval: 220,
      useTimer: false,
    });
  };

  return mod;
})(GLOBAL || {});
