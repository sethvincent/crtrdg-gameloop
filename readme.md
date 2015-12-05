# crtrdg gameloop

> canvas animation using requestAnimationFrame

## Goals for the crtrdg gameloop:

-   Initialize 2d canvas and animate using requestAnimationFrame.
-   Create a gameloop that emits update and draw events.
-   Emit pause and resume events.

## Install

    npm install crtrdg-gameloop

## Other `crtrdg` modules:

-   [crtrdg-entity](http://github.com/sethvincent/crtrdg-entity)
-   [crtrdg-keyboard](http://github.com/sethvincent/crtrdg-keyboard)
-   [crtrdg-mouse](http://github.com/sethvincent/crtrdg-mouse)

## Contributing

-   Fork this repository.
-   Create a branch for you changes.
-   Include tests if applicable.
-   Add/edit documentation for any changes.
-   Submit a pull request.

## API

### createGame

Create the game

**Parameters**

-   `options` **Object** 
    -   `options.canvas` **[Object]** – id or dom node of canvas tag
    -   `options.fps` **[Number]** 

**Examples**

```javascript
var createGame = require('crtrdg-gameloop')

var game = createGame({ canvas: 'game' })
```

### game.draw

Draw to the canvas

**Parameters**

-   `renderer` **Object** 
-   `context`  
-   `delta` **Number** – time elapsed since last update

### game.end

End the game. Emits the `end` event/

**Examples**

```javascript
game.end()
```

### game.resume

Resume the game. Emits the `resume` event.

**Examples**

```javascript
game.resume()
```

### game.toggle

Pause or start game depending on game state. Emits either the `pause` or `resume` event.

**Examples**

```javascript
game.toggle()
```

### game.update

Update the game state. Emits the `update` event. You'll likely never call this method, but you may need to override it. Make sure to always emit the update event with the `delta` time.

**Parameters**

-   `delta` **Number** – time elapsed since last update

### Game#draw

Draw event.

**Parameters**

-   `renderer` **Object** 
-   `delta` **Number** 

**Examples**

```javascript
game.on('draw', function (renderer, dt) {
  console.log(dt)
})
```

### Game#end

End event. Fired when `game.end()` is called.

**Examples**

```javascript
game.on('end', function () {})
```

### Game#pause

Pause event. Fired when `game.pause()` is called.

**Examples**

```javascript
game.on('pause', function () {})
```

### Game#resume

Resume event. Fired when `game.resume()` is called.

**Examples**

```javascript
game.on('resume', function () {})
```

### Game#start

Start event. Fired when `game.start()` is called.

**Examples**

```javascript
game.on('start', function () {})
```

### Game#update

Update event.

**Parameters**

-   `delta` **Number** 

**Examples**

```javascript
game.on('update', function (dt) {
  console.log(dt)
})
```

## License

MIT
