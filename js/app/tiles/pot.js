var Pot = Actor.extend({
  MOVEAMOUNT: 200,

  init: function() {
    this._super.apply(this, arguments);
    this.assignSpriteActor('img/pot.png');
  }
});
Object.assign(Pot.prototype, BEHAVIOUR.pushable);
