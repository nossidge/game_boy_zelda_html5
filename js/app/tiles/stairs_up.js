var StairsUp = Actor.extend({
  src: 'img/stairs_up.png',

  // These are the goals of the level, so they start out invisible.
  visible: false,

  // The actual collider object.
  // Maps to a smaller rectangle inside the sprite.
  collider: null,

  init: function() {
    this._super.apply(this, arguments);
    var offset = 5 * pixelZoom;
    this.collider = new Box(
      this.x + offset,
      this.y + offset,
      this.width  - offset * 2,
      this.height - offset * 2
    );
    this.collider.src = 'img/meta/transparent.png';
  },

  // Don't draw it if it's invisible.
  draw: function() {
    if (!this.visible) return;
    this._super.apply(this, arguments);
  },

  // Determine if the tile is being stepped on.
  tick: function() {
    if (!this.visible) return;
    var collides = this.collider.collides(player);
    if (collides) {
      App.gameOver('a winner is you');
    }
  },
});
