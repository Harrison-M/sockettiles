# Sockettiles
A demo application using substack's [tilemap](https://github.com/substack/tilemap "Tilemap") and [socket.io](http://socket.io "Socket.io").

Portions of the client code borrowed from the [tilemap](https://github.com/substack/tilemap "Tilemap") example files.

## How to use

Build client/bundle.js using [browserify](https://github.com/substack/node-browserify "Browserify") (if I've been good about keeping it updated, you can skip this)

    browserify main.js -o bundle.js

Run server/server.js
    node server.js

Open client/index.html in a couple of windows.  Click tiles to light them up.  Lit tiles should be synced across windows in real-time.

Note that you'll have to modify client/main.js and rebuild if you change the port or host the server anywhere besides localhost.

## License
MIT