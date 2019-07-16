var SwitchBlock = Actor.extend({
  src: new SpriteMap(
    'img/switch_block.png',
    {
      up:   GLOBAL.animMap(0, 0, 0, 0),
      mid:  GLOBAL.animMap(1, 0, 1, 0),
      down: GLOBAL.animMap(2, 0, 2, 0)
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

  // Only collide if it's in the 'up' position.
  isSolid: function() {
    return this.isDown;
  },

  init: function() {
    this._super.apply(this, arguments);

    // Change the collision box to more accurately reflect the sprite.
    // Only the height needs to change, the width is pretty much okay.
    var yOffset = 5 * GLOBAL.pixelZoom;
    this.y += yOffset;
    this.height -= yOffset;

    // Offset sprite position from top of player.
    this.assignSpriteActor(this.src, 0, -yOffset);
    this.useAnimation('down');
  },

  setDown: function() {
    this.isDown = true;
    this.useAnimation('down');
    if (player) {
      if (this.collides(player)) {
        player.lowerOnPlatform();
      }
    }
  },

  setUp: function() {
    this.isDown = false;
    this.useAnimation('up');
    if (player) {
      if (this.collides(player)) {
        player.raiseOnPlatform();
      }
    }
  },

  toggle: function() {
    if (this.toggling) return;
    this.useAnimation('mid');
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
Object.assign(SwitchBlock.prototype, BEHAVIOUR.hasSpriteActor);
