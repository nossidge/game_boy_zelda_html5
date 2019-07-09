// The main logic for your project goes in this file.

/**
 * The {@link Player} object; an {@link Actor} controlled by user input.
 */
var player;

/**
 * Keys used for various directions.
 *
 * The property names of this object indicate actions, and the values are lists
 * of keyboard keys or key combinations that will invoke these actions. Valid
 * keys include anything that {@link jQuery.hotkeys} accepts. The up, down,
 * left, and right properties are required if the `keys` variable exists; if
 * you don't want to use them, just set them to an empty array. {@link Actor}s
 * can have their own {@link Actor#keys keys} which will override the global
 * set.
 */
var keys = {
  up: ['up', 'w'],
  down: ['down', 's'],
  left: ['left', 'a'],
  right: ['right', 'd'],
  debug: ['q'],
};

/**
 * An array of image file paths to pre-load.
 */
var preloadables = [
  'img/meta/transparent.png',
  'img/meta/pink.png',
  'img/meta/red.png',
  'img/meta/black.png',
  'img/meta/blue.png',
  'img/meta/yellow.png',
  'img/player.png',
  'img/floor.png',
  'img/block.png',
  'img/pot.png',
  'img/wall_n.png',
  'img/wall_e.png',
  'img/wall_s.png',
  'img/wall_w.png',
  'img/wall_inner_ne.png',
  'img/wall_inner_nw.png',
  'img/wall_inner_se.png',
  'img/wall_inner_sw.png',
];

// Size of the world and pixels.
var tileWidth = 15;
var tileHeight = 11;
var pixelZoom = 5;
var pixelsPerTile = 16;
var tileSize = pixelsPerTile * pixelZoom;

// Collection of objects.
var solidObjects = [];
var solidObjectsSplat = [];

//##############################################################################

// Show debug infomation in the console.
jQuery(document).keydown(keys.debug.join(' '), function() {
  console.log(App.timer.frames);
  DEBUG.drawObjectsToggle();
});

//##############################################################################

/**
 * A magic-named function where all updates should occur.
 */
function update() {
  player.update();

  var collideSolid = player.collideSolid(solidObjects);
  playerOffsetBoxes.move();
  nudge(collideSolid, solidObjectsSplat);

  TICKER.tick();

  // Tick all tickable objects.
  pots.forEach( function(obj) {
    obj.tick();
  });
  blocks.forEach( function(obj) {
    obj.tick();
  });
}

//##############################################################################

/**
 * A magic-named function where all drawing should occur.
 */
function draw() {
  floor.draw();
  walls.draw();
  blocks.draw();
  pots.draw();

  player.draw();
  DEBUG.draw();
}

//##############################################################################

/**
 * A magic-named function for one-time setup.
 *
 * @param {Boolean} first
 *   true if the app is being set up for the first time; false if the app has
 *   been reset and is starting over.
 */
function setup(first) {

  // Do not scale pixels.
  context.imageSmoothingEnabled = false;

  // Switch from side view to top-down.
  Actor.prototype.GRAVITY = false;

  // Change the size of the playable area. Do this before placing items!
  world.resize(tileWidth * tileSize, tileHeight * tileSize);

  setupPlayer();
  setupMap();
}

// Initialize the player.
function setupPlayer() {

  // Query the map for the spawn location.
  // Default to top-left if map has no spawn.
  var spawn = TILED.spawn();
  var spawnX = spawn ? spawn.x : tileSize;
  var spawnY = spawn ? spawn.y : tileSize;
  player = new Player(spawnX + 15, spawnY + 40, tileSize - 30, tileSize - 40);
  player.MOVEAMOUNT = 400;

  // Draw the player sprite on a separate object.
  // The 'player' object will handle the collision,
  // and the playerSprite will show the animations.
  var playerSprite = new Actor(player.x, player.y, tileSize, tileSize);
  player.spriteActor(playerSprite);

  // Offset position from origin of player.
  playerSprite.xOffset = -15;
  playerSprite.yOffset = -40;

  // Use a transparent image to let the player be invisible.
  // Assign the actual player sprites to the child Actor.
  player.src = 'img/meta/transparent.png';
  playerSprite.src = playerSpriteMap();

  // Offset boxes for the player to use for collision.
  playerOffsetBoxes = new PlayerOffsetBoxes(player);
}

// Initialize the map and map objects.
function setupMap() {

  // This is a rectangle array featuring only spaces.
  // It is used to draw the floor tiles.
  var floorPlan = [];
  for (var i = 0; i < 11; i++) floorPlan.push('               ');
  floorPlan = floorPlan.join("\n");
  floor = new TileMap(floorPlan, {' ': Floor}, {cellSize: [tileSize, tileSize]});

  // Add terrain.
  walls = MAP.walls();
  blocks = MAP.blocks();
  pots = MAP.pots();

  // Assign global collections.
  solidObjects = [walls, blocks, pots];
  solidObjectsSplat = [...blocks.getAll(), ...pots.getAll()];
}

//##############################################################################

// Load external files.
$(document).ready(function() {
  TILED.loadAll();
});