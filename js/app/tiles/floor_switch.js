var FloorSwitch = Actor.extend({
  src: new SpriteMap(
    'img/floor_switch.png',
    {
      up:   animMap(0, 0, 0, 0),
      down: animMap(1, 0, 1, 0)
    },
    {
      frameW: 16,
      frameH: 16
    }
  ),

  // Whether the button is being pressed by a heavy object.
  isDown: false,

  // The actual collider object.
  // Maps to the rectangle of the button sprite.
  collider: null,

  init: function() {
    this._super.apply(this, arguments);
    this.animLoop = 'up';

    var offset = 3 * pixelZoom;
    this.collider = new Box(
      this.x + offset,
      this.y + offset,
      this.width  - offset * 2,
      this.height - offset * 2
    );
    this.collider.src = 'img/meta/transparent.png';
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
    var collides = this.collider.collides(moveables);
    if (this.isDown && !collides) {
      this.setUp();
    } else if (!this.isDown && collides) {
      this.setDown();
    }
  },
});
