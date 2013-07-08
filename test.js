var Game = require('./index');

var game = new Game({
  canvasId: 'game',
  width: '800',
  height: '400',
  backgroundColor: '#ff1f1f'
});

game.on('update', function(interval){
  console.log('update', interval);
  game.pause();
  game.resume();
});

game.on('draw', function(context){
  console.log('draw', context);
  context.fillStyle = '#fff';
  context.fillRect(10, 10, 10, 10);
});

game.on('pause', function(){
  console.log('paused');
});

game.on('resume', function(){
  console.log('resumed');
});