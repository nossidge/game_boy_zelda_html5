var FloorSwitch = Actor.extend({
  src: new SpriteMap(
    'img/floor_switch.png',
    {
      up:   GLOBAL.animMap(0, 0, 0, 0),
      down: GLOBAL.animMap(1, 0, 1, 0)
    },
    {
      frameW: 16,
      frameH: 16
    }
  ),

  // Whether the button is being pressed by a heavy object.
  isDown: false,

  init: function() {
    this._super.apply(this, arguments);
    this.animLoop = 'up';
    this.assignHitbox(3);
  },

  setDown: function() {
    this.isDown = true;
    this.animLoop = 'down';
    roomUpdate();
  },

  setUp: function() {
    this.isDown = false;
    this.animLoop = 'up';
    roomUpdate();
  },

  // Determine if the tile is being weighed down.
  tick: function() {
    var moveables = room.getPushable().concat(player);
    var collides = this.hitbox.collides(moveables);
    if (this.isDown && !collides) {
      this.setUp();
    } else if (!this.isDown && collides) {
      this.setDown();
    }
  },
});
Object.assign(FloorSwitch.prototype, BEHAVIOUR.hasHitbox);
