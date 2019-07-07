var MAP = (function(mod) {
  mod.grid = function() {
    return TILED.map();
  };

  mod.blocks = function() {
    return new TileMap(
      mod.grid(),
      { 20: Block },
      { cellSize: [tileSize, tileSize] }
    );
  };

  mod.pots = function() {
    return new TileMap(
      mod.grid(),
      { 21: Pot },
      { cellSize: [tileSize, tileSize] }
    );
  };

  mod.walls = function() {
    return new TileMap(
      mod.grid(),
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
  };

  return mod;
})(MAP || {});
