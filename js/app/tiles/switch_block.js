var SwitchBlock = Actor.extend({
  src: new SpriteMap(
    'img/switch_block.png',
    {
      up:   animMap(0, 0, 0, 0),
      mid:  animMap(1, 0, 1, 0),
      down: animMap(2, 0, 2, 0)
    },
    {
      frameW: 16,
      frameH: 16
    }
  ),

  // Whether the button down.
  isDown: false,

  // Whether the button is in the process of being toggled.
  toggling: false,

  // Time in milliseconds to wait until another toggle can be initiated.
  toggleTime: 120,

  // The actual collider object.
  // Maps to a smaller rectangle inside the sprite.
  // TODO: This is not implemented yet.
  collider: null,

  // Only collide if it's in the 'up' position.
  isSolid: function() {
    return this.isDown;
  },

  init: function() {
    this._super.apply(this, arguments);
    this.animLoop = 'down';

    var offset = 1 * pixelZoom;
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
  },

  setUp: function() {
    this.isDown = false;
    this.animLoop = 'up';
  },

  toggle: function() {
    if (this.toggling) return;
    this.animLoop = 'mid';
    this.toggling = true;
    if (this.isDown) {
      setTimeout( function(obj){
        obj.setUp();
      }, 40, this);
    } else {
      setTimeout( function(obj){
        obj.setDown();
      }, 40, this);
    }
    setTimeout( function(obj){
      obj.toggling = false;
    }, this.toggleTime, this);
  },
});
