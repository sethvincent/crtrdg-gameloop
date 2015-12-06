var createGameLoop = require('gameloop-canvas')
var isarray = require('isarray')

/**
* Create the game
* @name createGame
* @extends module:gameloop-canvas
* @param {Object} options
* @param {Object} [options.canvas] – id or dom node of canvas tag
* @param {Number} [options.fps]
* @example
* var createGame = require('crtrdg-gameloop')
*
* var game = createGame({ canvas: 'game' })
*/
module.exports = function createGame (options) {
  options = options || {}
  var game = createGameLoop(options)

  /**
  * Draw to the canvas
  * @name game.draw
  * @param {Object} renderer
  * @param {Number} delta – time elapsed since last update
  * @fires Game#draw
  */
  game.draw = function crtrdg_gameloop_draw (context, delta) {
    context.clearRect(0, 0, game.width, game.height)
    game.emit('draw-background', context, delta)
    game.drawAllLayers(context, delta)
    game.emit('draw-foreground', context, delta)
  }

  game.drawAllLayers = function crtrdg_gameloop_drawAllLayers (context, dt) {
    if (game.layers && isarray(game.layers)) {
      for (var i = 0; i < game.layers.length; i++) {
        game.emit('draw-layer', game.layers[i], context, dt)

        if (game.layers[i] === 0) {
          game.emit('draw', context, dt)
        }
      }
    } else {
      game.emit('draw', context, dt)
    }
  }

  return game
}

/* gameloop documentation */

/**
* Update the game state. Emits the `update` event. You'll likely never call this method, but you may need to override it. Make sure to always emit the update event with the `delta` time.
* @name game.update
* @param {Number} delta – time elapsed since last update
* @fires Game#update
*/

/**
* End the game. Emits the `end` event/
* @name game.end
* @fires Game#end
* @example
* game.end()
*/

/**
* Pause or start game depending on game state. Emits either the `pause` or `resume` event.
* @name game.toggle
* @example
* game.toggle()
*/

/**
* Resume the game. Emits the `resume` event.
* @name game.resume
* @fires Game#resume
* @example
* game.resume()
*/

/* gameloop events */

/**
* Start event. Fired when `game.start()` is called.
*
* @event Game#start
* @example
* game.on('start', function () {})
*/

/**
* End event. Fired when `game.end()` is called.
*
* @event Game#end
* @example
* game.on('end', function () {})
*/

/**
* Update event.
*
* @event Game#update
* @param {Number} delta
* @example
* game.on('update', function (dt) {
*   console.log(dt)
* })
*/

/**
* Draw event.
*
* @event Game#draw
* @param {Object} renderer
* @param {Number} delta
* @example
* game.on('draw', function (renderer, dt) {
*   console.log(dt)
* })
*/

/**
* Pause event. Fired when `game.pause()` is called.
*
* @event Game#pause
* @example
* game.on('pause', function () {})
*/

/**
* Resume event. Fired when `game.resume()` is called.
*
* @event Game#resume
* @example
* game.on('resume', function () {})
*/

