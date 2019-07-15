var StairsUp = Actor.extend({
  src: 'img/stairs_up.png',

  // These are the goals of the level, so they start out invisible.
  visible: false,

  init: function() {
    this._super.apply(this, arguments);
    this.assignHitbox(7);
  },

  // Don't draw it if it's invisible.
  draw: function() {
    if (!this.visible) return;
    this._super.apply(this, arguments);
  },

  // Determine if the tile is being stepped on.
  tick: function() {
    if (!this.visible) return;
    var collides = this.hitbox.collides(player);
    if (collides) {
      App.gameOver('a winner is you');
    }
  },
});
Object.assign(StairsUp.prototype, BEHAVIOUR.hasHitbox);
