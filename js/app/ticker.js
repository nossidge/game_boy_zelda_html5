// This is a singleton module, used to handle behaviour updates.
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

        // Find the correct border, and return the centre pixel.
        var animLoopMap = {
          pushRight: playerOffsetBoxes.e,
          pushLeft:  playerOffsetBoxes.w,
          pushUp:    playerOffsetBoxes.n,
          pushDown:  playerOffsetBoxes.s,
        };
        var border = animLoopMap[player.animLoop];
        var centre = border.centre();

        // Poll the centre pixel for pushable objects.
        var pushableObject = centre.collides(room.getPushable());
        if (pushableObject) {
          pushableObject.onPlayerPush(player.animLoop);
        }
      }
    } else {
      playerPushingFrames = 0;
    }
  }

  return mod;
})(TICKER || {});
