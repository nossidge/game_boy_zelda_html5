var CrystalSwitch = Actor.extend({
  src: new SpriteMap(
    'img/crystal_switch.png',
    {
      off: GLOBAL.animMap(0, 0, 0, 0),
      on:  GLOBAL.animMap(1, 0, 1, 0),
    },
    {
      frameW: 16,
      frameH: 16
    }
  ),

  // Whether the crystal ball is currently flashing.
  flashing: false,

  // Time in milliseconds to flash the crystal.
  flashTime: 120,

  // Time in milliseconds to wait until another flash can be initiated.
  toggleTime: 140,

  init: function() {
    this._super.apply(this, arguments);
    this.animLoop = 'off';
  },

  // Flash on, then off.
  flash: function() {
    if (this.flashing) return;
    if (this.animLoop == 'off') {
      this.flashing = true;
      this.animLoop = 'on';
      setTimeout( function(obj){
        obj.animLoop = 'off';
      }, this.flashTime, this);
      setTimeout( function(obj){
        obj.flashing = false;
      }, this.toggleTime, this);
    }
  },

  // Event that is called when the tile is being interacted with.
  interact: function() {
    if (this.flashing) return;
    room.crystal_switches.forEach('flash');
    room.switch_blocks.forEach('toggle');
  },
});
