var CrystalSwitch = Actor.extend({
  src: 'img/crystal_switch.png',

  // Event that is called when the tile is being interacted with.
  interact: function() {
    room.switch_blocks.forEach('toggle');
  },
});
