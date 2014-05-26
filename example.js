var Game = require('./index');
var Mouse = require('crtrdg-mouse');

var game = new Game();
var mouse = new Mouse(game);

var clicked = false;
mouse.on('click', function(){
  if (clicked){
    game.resume();
    clicked = false;
  } else {
    game.pause();
    clicked = true;
  }
});

var box = {
  size: { x: 10, y: 10 },
  position: { x: game.width / 2 - 5, y: game.height / 2 - 5 }
}

box.update = function(){
  box.position.x += rand(-3,3);
  box.position.y += rand(-3,3);
}

box.boundaries = function(){
  if (box.position.x <= 0){
    box.position.x = 0;
  }

  if (box.position.x >= game.width - box.size.x){
    box.position.x = game.width - box.size.x;
  }

  if (box.position.y <= 0){
    box.position.y = 0;
  }

  if (box.position.y >= game.height - box.size.y){
    box.position.y = game.height - box.size.y;
  }
}

box.draw = function(context){
  context.fillStyle = '#fff';
  context.fillRect(box.position.x, box.position.y, box.size.x, box.size.y);
}

game.on('start', function(){
  console.log('started');
});

game.on('update', function(interval){
  box.update();
  box.boundaries();
});

game.on('draw', function(context){
  context.fillStyle = '#f4d3a2';
  context.fillRect(0, 0, game.width, game.height);
  box.draw(context);
});

game.on('pause', function(){
  console.log('paused');
});

game.on('resume', function(){
  console.log('resumed');
});

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}