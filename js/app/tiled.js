// Load external tilemap files created using Tiled.
var TILED = (function(mod) {

  // The maps that are to be loaded.
  var mapURLs = [
    'maps/first_draft.tmx',
    'maps/sokoban.tmx',
  ];

  // Hash of loaded maps, by their URL.
  // Contents parsed as XML using DOMParser.
  var maps = {};

  // TODO: Replace this hard-coded layer name.
  mod.mapGrid = function(mapURL) {
    return mapGrid(mapURL, 'main');
  };

  // Whether all maps have finished loading.
  // (All are loaded when no values are false)
  mod.allLoaded = function() {
    return Object.keys(maps).every(function(mapURL) {
      return maps[mapURL];
    });
  };

  // Load all tilemaps.
  mod.loadAll = function() {

    // Create a key for each map, but set the value to 'false'.
    // We do this before loading any files, to make sure we don't have any
    // false positives in the 'allLoaded' function.
    mapURLs.forEach(function(mapURL) {
      maps[mapURL] = false;
    });

    // Load each map.
    mapURLs.forEach(function(mapURL) {
      loadMap(mapURL);
    });
  };

  // Find the spawn x and y coords.
  mod.spawn = function(mapURL) {
    return findXY(mapURL, 'spawn');
  };

  // Find the goal x and y coords.
  mod.goal = function(mapURL) {
    return findXY(mapURL, 'goal');
  };

  // Find the type of goal for the map.
  mod.type = function(mapURL) {
    var xmlDoc = maps[mapURL];
    var path = '/map/objectgroup/properties/property[@name="type"]';
    var node = xpath(xmlDoc, path);
    if (!node) return false;
    return node.getAttribute('value');
  };

  //############################################################################

  // Find the x and y coords of a named object.
  function findXY(mapURL, name) {
    var xmlDoc = maps[mapURL];
    var path = '/map/objectgroup/object[@name="' + name + '"]';
    var node = xpath(xmlDoc, path);
    if (!node) return false;
    return {
      x: node.getAttribute('x') * pixelZoom,
      y: node.getAttribute('y') * pixelZoom,
    };
  }

  // Load a tilemap from a .tmx file.
  function loadMap(mapURL) {
    var x = new XMLHttpRequest();
    x.open('GET', mapURL, true);
    x.responseType = 'xml';
    x.onload = function() {
      var response = x.response;
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(response, 'text/xml');
      maps[mapURL] = xmlDoc;
    };
    x.send();
  }

  // Find the 2d string grid of tiles for a given layer.
  // Return the grid string as a 2d array.
  function mapGrid(mapURL, layerName) {
    var xmlDoc = maps[mapURL];
    var path = '/map/layer[@name="main"]/data';
    var node = xpath(xmlDoc, path);
    var grid = node.innerHTML.trim();
    var grid2d = grid.split('\n');
    for (var i = 0; i < grid2d.length; i++) {
      grid2d[i] = grid2d[i].replace(/,$/, '').split(',');
    }
    return grid2d;
  }

  // The default is way too verbose.
  // Wrap it up in a nice function.
  function xpath(xml, path) {
    return xml.evaluate(path, xml, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }

  return mod;
})(TILED || {});
