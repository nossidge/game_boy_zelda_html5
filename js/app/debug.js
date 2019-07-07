// Draw the debug objects that are just used for collision.
var DEBUG = (function(mod) {
  var _drawObjects = false;
  mod.drawObjects = function(bool) {
    if (typeof bool !== 'undefined') {
      this._drawObjects = bool;
      player.src = bool ? 'img/meta/pink.png' : 'img/meta/transparent.png';
    }
    return this._drawObjects;
  };
  mod.drawObjectsToggle = function() {
    this.drawObjects(!this._drawObjects);
  };
  mod.draw = function() {
    if (this._drawObjects) {
      playerOffsetBoxes.draw();
    }
  };
  return mod;
})(DEBUG || {});
