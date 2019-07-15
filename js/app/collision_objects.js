// All of this is somewhat hacky at the moment.
// Ideally I'd like to create a 'child' Box system,
// where the Boxes would automatically move with the parent.
// But this will do in the meantime.

//##############################################################################

// Takes in a Player, a debug src image, and an x and y offset amount.
var OffsetBox = Actor.extend({
  init: function(player, offsetX, offsetY, src) {
    this._super.apply(this, [offsetX, offsetY, GLOBAL.pixelZoom, GLOBAL.pixelZoom]);
    this.player = player;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.src = src;
  },
  move: function() {
    this.x = this.player.drawnX + this.offsetX;
    this.y = this.player.drawnY + this.offsetY;
  }
});

//##############################################################################

// A row or column of collision boxes.
var OffsetBorder = Class.extend({
  init: function(player, src, offset, isRow) {
    this.player = player;
    this.src = src;
    this.offset = offset;
    this.isRow = isRow;

    // Create the Collection, and add each box.
    this.collection = new Collection();
    var offsetX = isRow ? 0 : offset;
    var offsetY = isRow ? offset : 0;
    var maxCount = isRow ? player.width : player.height;
    for (var i = 0; i < maxCount; i += GLOBAL.pixelZoom) {
      var indexX = isRow ? i : 0;
      var indexY = isRow ? 0 : i;
      var x = offsetX + indexX;
      var y = offsetY + indexY;
      var obj = new OffsetBox(player, x, y, src);
      this.collection.add(obj);
    }
  },
  centre: function() {
    var centreIndex = Math.round(this.collection.length / 2);
    return this.collection[centreIndex];
  },
  draw: function() {
    this.collection.forEach('draw');
  },
  move: function() {
    this.collection.forEach('move');
  },
  collideCount: function(collideWith) {
    var collideIndeces = [];
    $(this.collection).each(function(index, obj) {
      if (obj.collides(collideWith)) collideIndeces.push(index);
    });
    return {
      collides: collideIndeces.length > 0,
      collideIndeces: collideIndeces
    };
  },
  nearHit: function(collideWith) {
    var collideStatus = this.collideCount(collideWith);
    if (!collideStatus.collides) return null;

    var min = Math.min(...collideStatus.collideIndeces);
    var max = Math.max(...collideStatus.collideIndeces);
    var overlap = max - min + 1;

    // Direction to move the player so that it will no longer be in collision.
    // This is always either 1 or -1.
    // Assumes that always (min == 0 || max == this.height or .width)
    // The idea is to be able to 'correct' the player by moving it
    // (overlap * direction * pixel_size) along x or y.
    var direction = min == 0 ? 1 : -1;
    return {
      overlap: overlap,
      direction: direction
    };
  }
});

//##############################################################################

// These objects are not absolute collision detectors; that is the purpose
// of the Player object. Collision of these are used to determine what
// object the player is immediately adjacent to.
var PlayerOffsetBoxes = Class.extend({
  all: function(player) {
    return [this.n, this.e, this.s, this.w];
  },
  init: function(player) {
    var img = 'img/meta/blue.png';
    this.player = player;
    this.n = new OffsetBorder(this.player, img, -GLOBAL.pixelZoom, true);
    this.e = new OffsetBorder(this.player, img, this.player.width, false);
    this.s = new OffsetBorder(this.player, img, this.player.height, true);
    this.w = new OffsetBorder(this.player, img, -GLOBAL.pixelZoom, false);
  },
  draw: function() {
    this.all().forEach(function(obj) {
      obj.draw();
    });
  },
  move: function() {
    this.all().forEach(function(obj) {
      obj.move();
    });
  }
});
