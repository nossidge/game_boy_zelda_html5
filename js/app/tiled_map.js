// Load all the info from the TILED file collection.
var TiledMap = Class.extend({

  // Save to variables, so they don't have to be read repeatedly.
  init: function(mapURL) {
    this.mapURL  = mapURL;
    this.mapGrid = TILED.mapGrid(this.mapURL);
    this.spawn   = TILED.spawn(this.mapURL);
    this.goal    = TILED.goal(this.mapURL);
    this.type    = TILED.type(this.mapURL);
  },

  walls: function() {
    return new TileMap(
      this.mapGrid,
      {
        2:  WallN,
        9:  WallE,
        14: WallS,
        7:  WallW,
        1:  WallInnerNW,
        3:  WallInnerNE,
        15: WallInnerSE,
        13: WallInnerSW
      },
      { cellSize: [tileSize, tileSize] }
    );
  },

  blocks: function() {
    return new TileMap(
      this.mapGrid,
      { 20: Block },
      { cellSize: [tileSize, tileSize] }
    );
  },

  pots: function() {
    return new TileMap(
      this.mapGrid,
      { 21: Pot },
      { cellSize: [tileSize, tileSize] }
    );
  },

  floor_switches: function() {
    return new TileMap(
      this.mapGrid,
      { 27: FloorSwitch },
      { cellSize: [tileSize, tileSize] }
    );
  },

  stairs_up: function() {
    return new TileMap(
      this.mapGrid,
      { 26: StairsUp },
      { cellSize: [tileSize, tileSize] }
    );
  },

  crystal_switches: function() {
    return new TileMap(
      this.mapGrid,
      { 22: CrystalSwitch },
      { cellSize: [tileSize, tileSize] }
    );
  },

  // These are the same object, but they can be set to 'up' or 'down'.
  switch_blocks: function() {
    var switch_block_down = new TileMap(
      this.mapGrid,
      { 30: SwitchBlock },
      { cellSize: [tileSize, tileSize] }
    );
    switch_block_down.forEach(function(obj) {
      obj.setDown();
    });
    var switch_block_up = new TileMap(
      this.mapGrid,
      { 29: SwitchBlock },
      { cellSize: [tileSize, tileSize] }
    );
    switch_block_up.forEach(function(obj) {
      obj.setUp();
    });
    return new Collection(
      switch_block_down.getAll(),
      switch_block_up.getAll()
    );
  },
});
