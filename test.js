var test = require('tape')
var createGame = require('./index')

var canvas = document.createElement('canvas')
var ctx = canvas.getContext('2d')

test('Game', function (t) {
  t.test('start: should fire the start event', function (t) {
    t.plan(1)
    var game = createGame()

    game.once('start', function () {
      t.pass('start event fired')
    })

    game.start()
  })

  t.test('pause: should pause game loop and fire event', function (t) {
    t.plan(2)
    var game = createGame()

    game.once('pause', function () {
      t.pass('pause event fired')
      t.ok(game.paused, 'game paused')
    })

    game.start()
    game.pause()
  })

  t.test('resume: should make the gameloop resume', function (t) {
    t.plan(2)
    var game = createGame()
    game.start()
    game.pause()
    game.once('resume', function () {
      t.pass('resume event fired')
      t.ok(!game.paused, 'game resumed')
    })
    game.resume()
  })

  t.test('update: should fire update event', function (t) {
    t.plan(1)
    var game = createGame()
    game.start()
    game.once('update', function (interval) {
      t.pass('update fired once')
      game.pause() // only once
    })
  })

  t.test('draw: should fire events', function (t) {
    t.plan(3)
    var game = createGame()
    game.once('draw-background', function () {
      t.pass('draw-background event fired')
    })
    game.once('draw-foreground', function () {
      t.pass('draw-foreground event fired')
    })
    game.once('draw', function () {
      t.pass('draw event fired')
    })
    game.start()
    game.draw(ctx)
  })

  t.test('drawAllLayers: draw all layers in correct order', function (t) {
    var game = createGame()
    game.layers = [1, 2, 6, 8]
    t.plan(4)
    var i = 0

    game.on('draw-layer', function (layer, context) {
      t.ok(layer === game.layers[i], 'shoud fire 4 times')
      i++
    })

    game.start()
    game.drawAllLayers(ctx)
    console.log('huh')
  })
})
