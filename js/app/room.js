// A container to store the objects in a given room.
var Room = Class.extend({

  init: function(mapURL) {
    this.mapURL = mapURL;
    this.map = new TiledMap(mapURL);

    // Mixin functionality depending on the type of room.
    // This is specified in the Tiled map file .tmx file.
    Object.assign(this, ROOM_TYPES[this.map.type]);
  },

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
    var output = new Collection(
      this.walls,
      this.blocks,
      this.pots,
      this.crystal_switches,
      this.chests,
      this.lock_blocks
    );
    this.switch_blocks.forEach(function(obj) {
      if (!obj.isSolid()) output.add(obj);
    });
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
  // TODO: Use Layers.
  draw: function() {
    this.floor.draw();
    this.walls.draw();
    this.floor_switches.draw();
    this.stairs_up.draw();
    this.crystal_switches.draw();
    this.switch_blocks.draw();
    this.blocks.draw();
    this.pots.draw();
  },

  // Tick all tickable objects.
  tick: function() {
    this.pots.forEach('tick');
    this.blocks.forEach('tick');
    this.floor_switches.forEach('tick');
    this.stairs_up.forEach('tick');
  },

  // Handle room-level logic and events.
  // For example, an object that appears when all 'floor_switches' are down.
  // Abstract method -- this is custom for each room.
  update: function() {}
});
