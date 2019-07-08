My attempt to make a Game Boy Zelda clone using HTML5 canvas.

Prototype playable [here](https://tilde.town/~nossidge/zelda/gameboy).
May not be fully up-to-date.


Status
------

Very early stage of development.

The goal for this version is to create a playable Sokoban-style game.
No enemies, no items (except maybe keys), just moving and pushing.

Done:
* Basic player movement and animation
* Block and pot pushing
* Tile object behaviours implemented as mixins
* Separation of Player collider and Sprite
* Loading from [Tiled](https://www.mapeditor.org/) map files
* 'Nudge' effect for if the player is only just colliding with an obstacle
* Separation of Actor collider and Sprite

To do in this version:
* Better organisation of global state
* Better organisation of behaviour mixins
* Floor switch
* Crystal switches and raised/lowered blocks
* Implement events defined in Tiled map
* Room state handling
* Room transitions
* Small keys
* Basic HUD showing key count
* Locked doors
* Treasure chests (containing only keys)
* Readable sign posts
* Decently fun full-dungeon level
* Code refactor


Credits
-------

[Paul Thompson](https://github.com/nossidge/) is the author of this project.

All Javascript code is based around the [HTML5-Canvas-Game-Boilerplate](https://github.com/IceCreamYou/HTML5-Canvas-Game-Boilerplate/) framework by [Isaac Sukin](http://www.isaacsukin.com/contact)
([@IceCreamYou](https://twitter.com/IceCreamYou)).

Sprites and game mechanics are ripped from *The Legend of Zelda* Game Boy titles [*Link's Awakening*](https://en.wikipedia.org/wiki/The_Legend_of_Zelda:_Link's_Awakening), and [*Oracle of Seasons* and *Oracle of Ages*](https://en.wikipedia.org/wiki/The_Legend_of_Zelda:_Oracle_of_Seasons_and_Oracle_of_Ages). Credits to [Nintendo](https://www.nintendo.com/) and [Capcom](http://www.capcom.com/).
