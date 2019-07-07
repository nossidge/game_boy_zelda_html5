
// Handle the case where the player is pretty-much not touching the object.
// Just help to nudge them around it.
function nudge(collideSolid, solidObjectsSplat) {
  var pixelSize = 5;
  var pixelsToDodge = 2;
  if (collideSolid.x) {
    var verticalBorders = [playerOffsetBoxes.e, playerOffsetBoxes.w];
    verticalBorders.forEach( function(border) {
      var nearHit = border.nearHit(solidObjectsSplat);
      if (nearHit) {
        if (nearHit.overlap <= pixelsToDodge) {
          player.y += nearHit.overlap * nearHit.direction * pixelSize;
          player.y = Math.round(player.y / pixelSize) * pixelSize;
          player.setDrawnY();
        }
      }
    });
  }
  if (collideSolid.y) {
    var horizontalBorders = [playerOffsetBoxes.n, playerOffsetBoxes.s];
    horizontalBorders.forEach( function(border) {
      var nearHit = border.nearHit(solidObjectsSplat);
      if (nearHit) {
        if (nearHit.overlap <= pixelsToDodge) {
          player.x += nearHit.overlap * nearHit.direction * pixelSize;
          player.x = Math.round(player.x / pixelSize) * pixelSize;
          player.setDrawnX();
        }
      }
    });
  }
}
