
var Pot = Actor.extend({
  MOVEAMOUNT: 200,
  GRAVITY: false,
  CONTINUOUS_MOVEMENT: true,
  DEFAULT_WIDTH: tileSize,
  DEFAULT_HEIGHT: tileSize,
  src: 'img/pot.png',
  tick: function() {
    this.playerPushTick();
    if (this.beingPushed()) {
      this.move();
    }
  }
});
Object.assign(Pot.prototype, BEHAVIOUR.pushable);
