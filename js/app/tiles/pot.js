var Pot = Actor.extend({
  MOVEAMOUNT: 200,

  // If the object is raised on a SwitchBlock.
  raised: false,

  init: function() {
    this._super.apply(this, arguments);
    var spriteActor = new Actor(this.x, this.y, tileSize, tileSize);
    this.spriteActor(spriteActor);
    this.src = 'img/meta/transparent.png';
    spriteActor.src = 'img/pot.png';
  },

  tick: function() {
    this.playerPushTick();
    if (this.beingPushed()) {
      this.move();
    }

    // If it's on a raised SwitchBlock, then draw it higher.
    var spriteActor = this.spriteActor();
    if (this.isOnSwitchBlock()) {
      if (!this.raised) {
        this.raised = true;
        spriteActor.yOffset = -20;
      }
    } else {
      if (this.raised) {
        this.raised = false;
        spriteActor.yOffset = 0;
      }
    }
  },
});
Object.assign(Pot.prototype, BEHAVIOUR.pushable);
