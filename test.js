var Game = require('./index');
var test = require('tape');

test('Game', function (t) {
    t.test('start: should fire the start event', function (t) {
      t.plan(1);
      var game = new Game();
      game.on('start', function () {
        t.pass('start event fired');
      });
      game.start();
    });

    t.test('pause: should pause game loop and fire event', function (t) {
      t.plan(3);
      var game = new Game();
      game.on('pause', function () {
        t.pass('pause event fired');
      });
      game.pause();
      t.ok(game.paused, 'game paused');
      t.ok(game.ticker.paused, 'ticker paused');
    });

    t.test('resume: should make the gameloop resume', function (t) {
      t.plan(3);
      var game = new Game();
      game.pause();
      game.on('resume', function () {
        t.pass('resume event fired');
      });
      game.resume();
      t.ok(!game.paused, 'game resumed')
      t.ok(!game.ticker.paused, 'ticker running');
    });

    t.test('update: should fire update event', function (t) {
      t.plan(1);
      var game = new Game();
      game.start();
      game.on('update', function (interval) {
        t.pass('update fired once');
        game.pause(); // only once
      })
    });

    t.test('draw: should fire events', function (t) {
      t.plan(3);
      var game = new Game();
      game.on('draw-background', function () {
        t.pass('draw-background event fired');
      });
      game.on('draw-foreground', function () {
        t.pass('draw-foreground event fired');
      });
      game.on('draw', function () {
        t.pass('draw event fired');
      });
      game.draw();
    });
    
    t.test('drawAllLayers: draw all layers in correct order', function (t) {
      var game = new Game();
      game.layers = [1,2,6,8];
      t.plan(4);
      var i = 0;
      game.on('draw-layer', function (layer, context) {
        t.ok(layer === game.layers[i], 'shoud fire 4 times');
        i++;
      });
      game.drawAllLayers();
    });
});
