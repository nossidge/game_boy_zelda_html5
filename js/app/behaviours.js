// Mixins that contains shared functions.
var BEHAVIOUR = (function(mod) {

  // This object can be pushed by the player.
  mod.pushable = {

    // By default, pushables can move as often as the player likes.
    // This method can be overwritten by other mixins.
    canPush: function() {
      return true;
    },

    // If it's being pushed, it will have a destination.
    beingPushed: function() {
      return !!this.destination;
    },

    // When the player attempts to start pushing the object.
    onPlayerPush: function(playerAnimLoop) {
      if (!this.canPush() || this.beingPushed()) return;

      var velocityMap = {
        pushRight: { x:  1, y:  0 },
        pushLeft:  { x: -1, y:  0 },
        pushUp:    { x:  0, y: -1 },
        pushDown:  { x:  0, y:  1 }
      };
      var velocity = velocityMap[playerAnimLoop];
      var destination = {
        x: this.drawnX + velocity.x * tileSize,
        y: this.drawnY + velocity.y * tileSize
      };

      // Poll solid objects in the destination area to see if we can move.
      // Make the temp box slightly smaller, as collision is sometimes iffy.
      var temp = new Box(
        destination.x + pixelZoom,
        destination.y + pixelZoom,
        this.width  - pixelZoom * 2,
        this.height - pixelZoom * 2
      );
      var all = [...walls.getAll(), ...blocks.getAll(), ...pots.getAll()];
      var valid = !temp.collides(all);
      if (valid) {
        this.onValidPush();
        this.xVelocity = velocity.x * this.MOVEAMOUNT;
        this.yVelocity = velocity.y * this.MOVEAMOUNT;
        this.destination = destination;
      }
    },

    // When a valid push has begun. Abstract method.
    onValidPush: function() {},

    // Stop it moving once it reaches the destination.
    playerPushTick: function() {
      if (this.destination) {
        if (
          this.drawnX == this.destination.x &&
          this.drawnY == this.destination.y
        ) {
          this.destination = null;
          this.xVelocity = 0;
          this.yVelocity = 0;
        }
      }
    }
  };

  // This object can be pushed by the player, but only once.
  mod.pushableOnce = {
    pushCountdown: 1,
    canPush: function() {
      return this.pushCountdown > 0;
    },
    onValidPush: function() {
      this.pushCountdown--;
    }
  };

  return mod;
})(BEHAVIOUR || {});
