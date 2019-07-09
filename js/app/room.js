// A container to store the objects in a given room.
var Room = Class.extend({

  // All tile types in the game have a separate collection.
  floor:            new Collection(),
  walls:            new Collection(),
  blocks:           new Collection(),
  pots:             new Collection(),
  floor_switches:   new Collection(),
  crystal_switches: new Collection(),
  switch_blocks:    new Collection(),
  chests:           new Collection(),
  lock_blocks:      new Collection(),
  stairs_down:      new Collection(),
  stairs_up:        new Collection(),

  // All tile objects in the room.
  allTiles: function() {
    return new Collection(
      this.floor,
      this.walls,
      this.blocks,
      this.pots,
      this.floor_switches,
      this.crystal_switches,
      this.switch_blocks,
      this.chests,
      this.lock_blocks,
      this.stairs_down,
      this.stairs_up
    );
  },

  // These are solid and should be collided with.
  getSolid: function() {
    var output = new Collection();
    output.concat(
      this.walls,
      this.blocks,
      this.pots,
      this.crystal_switches,
      this.chests,
      this.lock_blocks
    );

    // TODO: 'switch_blocks' collision varies based on up/down state

    return output;
  },

  // Can be pushed by the player.
  getPushable: function() {
    return new Collection(
      this.blocks,
      this.pots
    );
  },

  // These are interactive by the player pressing the action button when
  // standing in front of and looking at them.
  getInteractive: function() {
    return new Collection(
      this.crystal_switches,
      this.chests
    );
  },

  // These give off an event when the player is colliding with them.
  getAutoInteractive: function() {
    return new Collection(
      this.lock_blocks,
      this.stairs_down,
      this.stairs_up
    );
  },

  // Draw all objects in the room.
  draw: function() {
    this.allTiles().draw();
  },

  // Tick all tickable objects.
  tick: function() {
    this.pots.forEach('tick');
    this.blocks.forEach('tick');
  },
});
