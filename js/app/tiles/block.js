var Block = Actor.extend({
  MOVEAMOUNT: 200,

  init: function() {
    this._super.apply(this, arguments);
    this.assignSpriteActor('img/block.png');
  }
});
Object.assign(Block.prototype, BEHAVIOUR.pushable);
Object.assign(Block.prototype, BEHAVIOUR.pushableOnce);
