// This is a singleton module, used to handle behaviour updates.
// TODO: Some of this should be moved elsewhere.
var TICKER = (function(mod) {

  // Tick all events.
  mod.tick = function() {
    playerPushing();
    playerFallOffPlatform();
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

  // If the player was raised on a platform,
  // but no longer has a platform underneath.
  function playerFallOffPlatform() {
    if (player.raised) {
      if (!player.collides(room.switchBlocksRaised())) {
        player.lowerOnPlatform();
      }
    }
  }

  // The object the player is currently touching.
  mod.playerInteractObject = function() {
    return playerFacingCollider().collides(room.getInteractive());
  };

  // The collider object for the direction the player is facing.
  // Find the correct border and return the centre pixel.
  function playerFacingCollider() {
    return playerOffsetBoxes[player.cardinalDirection].centre();
  }

  return mod;
})(TICKER || {});
