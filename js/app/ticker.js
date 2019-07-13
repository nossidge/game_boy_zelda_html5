// This is a singleton module, used to handle behaviour updates.
// TODO: Some of this should be moved elsewhere.
var TICKER = (function(mod) {

  // Tick all events.
  mod.tick = function() {
    playerPushing();
  };

  var playerPushingFrames = 0;
  function playerPushing() {
    if (player.pushing()) {
      playerPushingFrames++;

      if (playerPushingFrames >= 60) {
        playerPushingFrames = 0;

        // Poll the centre pixel for pushable objects.
        var pushableObject = playerFacingCollider().collides(room.getPushable());
        if (pushableObject) {
          pushableObject.onPlayerPush(player.cardinalDirection);
        }
      }
    } else {
      playerPushingFrames = 0;
    }
  }

  // The object the player is currently touching.
  mod.playerInteractObject = function() {
    return playerFacingCollider().collides(room.getInteractive());
  };

  // The collider object for the direction the player is facing.
  function playerFacingCollider() {
    var n = player.lastLooked.includes('up');
    var e = player.lastLooked.includes('right');
    var s = player.lastLooked.includes('down');
    var w = player.lastLooked.includes('left');

    // Find the correct border and return the centre pixel.
    if (n) {
      return playerOffsetBoxes.n.centre();
    } else if (e) {
      return playerOffsetBoxes.e.centre();
    } else if (s) {
      return playerOffsetBoxes.s.centre();
    } else if (w) {
      return playerOffsetBoxes.w.centre();
    }
  }

  return mod;
})(TICKER || {});
