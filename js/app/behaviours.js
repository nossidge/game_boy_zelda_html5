// Mixins that contains shared functions.
var BEHAVIOUR = (function(mod) {

  // Create a 'spriteActor' and make the main object invisible.
  mod.hasSpriteActor = {
    assignSpriteActor: function(src, xOffset = 0, yOffset = 0) {
      var spriteActor = new Actor(this.x, this.y, GLOBAL.tileSize, GLOBAL.tileSize);
      spriteActor.src = src;
      spriteActor.xOffset = xOffset;
      spriteActor.yOffset = yOffset;
      this.spriteActor(spriteActor);
      this.src = 'img/meta/transparent.png';
    },
  },

  // Create an invisible interaction hotbox.
  // This is located in the centre of the object tile.
  mod.hasHitbox = {
    hitbox: null,

    // 'pixelMargin' is the distance from the edge of the main Actor
    // to the outside of the hitbox.
    assignHitbox: function(pixelMargin) {
      var offset = pixelMargin * GLOBAL.pixelZoom;
      var hitbox = new Box(
        this.x + offset,
        this.y + offset,
        this.width  - offset * 2,
        this.height - offset * 2
      );
      hitbox.src = 'img/meta/transparent.png';
      this.hitbox = hitbox;
    },
  },

  // This object can be pushed by the player.
  mod.pushable = {

    // If the object is raised on a SwitchBlock.
    raised: false,

    // Tick the object every frame.
    tick: function() {
      this.playerPushTick();
      if (this.beingPushed()) {
        this.move();
      }

      // If it's on a raised SwitchBlock, then draw it higher.
      var spriteActor = this.spriteActor();
      if (this.isOnSwitchBlock()) {
        if (!this.raised) {
          this.raised = true;
          spriteActor.yOffset = -4 * GLOBAL.pixelZoom;
        }
      } else {
        if (this.raised) {
          this.raised = false;
          spriteActor.yOffset = 0;
        }
      }
    },

    // Can the object be pushed?
    // Can't push an object that is on a raised SwitchBlock,
    // unless the player is also on a raised SwitchBlock.
    canPush: function() {
      return !(this.raised && !player.raised);

    },

    // Determine if the object is on top of a raised SwitchBlock.
    isOnSwitchBlock: function() {
      var switchBlock = this.collides(room.switch_blocks);
      return !(!switchBlock || switchBlock.isSolid());
    },

    // If it's being pushed, it will have a destination.
    beingPushed: function() {
      return !!this.destination;
    },

    // When the player attempts to start pushing the object.
    onPlayerPush: function(direction) {
      if (!this.canPush() || this.beingPushed()) return;

      var directionToVelocity = {
        e: { x:  1, y:  0 },
        w: { x: -1, y:  0 },
        n: { x:  0, y: -1 },
        s: { x:  0, y:  1 },
      };
      var velocity = directionToVelocity[direction];
      var destination = {
        x: this.drawnX + velocity.x * GLOBAL.tileSize,
        y: this.drawnY + velocity.y * GLOBAL.tileSize
      };

      // Poll solid objects in the destination area to see if we can move.
      // Make the temp box slightly smaller, as collision is sometimes iffy.
      var temp = new Box(
        destination.x + GLOBAL.pixelZoom,
        destination.y + GLOBAL.pixelZoom,
        this.width  - GLOBAL.pixelZoom * 2,
        this.height - GLOBAL.pixelZoom * 2
      );
      var valid = !temp.collides(room.getSolidForObject(this));
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
          this.x = this.destination.x;
          this.y = this.destination.y;
          this.xVelocity = 0;
          this.yVelocity = 0;
          this.destination = null;
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
