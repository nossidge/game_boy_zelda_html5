// Mixins that contain room functions.
// Might make these inherited in the future, depending on how I load them.
var ROOM_TYPES = (function(mod) {

  // These rooms contain floor switches that must all be pressed.
  mod.sokoban = {
    targetReached: false,

    // Find which tile overlaps with the goal.
    // It should only really be a 'stairs_up' tile.
    setup: function() {
      var temp = new Box(
        this.map.goal.x + pixelZoom,
        this.map.goal.y + pixelZoom,
        pixelsPerTile * pixelZoom - pixelZoom * 2,
        pixelsPerTile * pixelZoom - pixelZoom * 2
      );
      this.goalTile = temp.collides(this.stairs_up);
    },

    // Determine if all the switches are being weighed down.
    update: function() {
      var pressed = 0;
      this.floor_switches.forEach( function(obj) {
        if (obj.isDown) pressed++;
      });
      if (this.floor_switches.length == pressed) {
        this.targetReached = true;
        this.goalShow();
      } else if (this.targetReached == true) {
        this.targetReached = false;
        this.goalHide();
      }
    },

    // If the target is met, show the goal tile.
    goalShow: function() {
      this.goalTile.visible = true;
    },

    // If the target was met, but now is not, hide the goal tile.
    goalHide: function() {
      this.goalTile.visible = false;
    },
  };

  return mod;
})(ROOM_TYPES || {});
