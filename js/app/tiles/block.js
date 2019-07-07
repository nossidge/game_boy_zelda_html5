
var Block = Actor.extend({
  MOVEAMOUNT: 200,
  GRAVITY: false,
  CONTINUOUS_MOVEMENT: true,
  DEFAULT_WIDTH: tileSize,
  DEFAULT_HEIGHT: tileSize,
  src: 'img/block.png',
  tick: function() {
    this.playerPushTick();
    if (this.beingPushed()) {
      this.move();
    }
  }
});
Object.assign(Block.prototype, BEHAVIOUR.pushable);
Object.assign(Block.prototype, BEHAVIOUR.pushableOnce);
