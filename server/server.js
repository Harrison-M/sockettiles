var io = require('socket.io').listen(3000);
var _tiles = [];

for(var i = 0; i < 11; i++)
{
    _tiles[i] = [];
    for(var j = 0; j < 11; j++)
    {
        _tiles[i][j] = false;
    }
}

io.sockets.on('connection', function(socket){
    socket.emit('tiles', {"tiles": _tiles});
    socket.on('tileclick', function(data){
        _tiles[data.x][data.y] = !_tiles[data.x][data.y];
        data.state = _tiles[data.x][data.y];
        io.sockets.emit('tilechange',data);
    });
});