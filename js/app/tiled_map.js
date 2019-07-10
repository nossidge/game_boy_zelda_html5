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
});
