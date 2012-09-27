var tilemap = require('tilemap');
var io = require('socket.io-browserify');

var tilestate = [];

var grid = tilemap(window.outerWidth, window.outerHeight);
grid.appendTo(document.body);

var socket = io.connect('http://localhost:3000');

for (var x = -5; x <= 5; x++) {
    for (var y = -5; y <= 5; y++) {
        createTile(x,y);
    }
}

socket.on('tiles', function(data){

    for(var i = 0; i < 11; i++)
    {
        for(var j = 0; j < 11; j++)
        {
            if(data.tiles[i][j])
            {
                //Convert from zero-based to cartesian, fill
                grid.tileAt(i-5,j-5).element.attr('fill', 'rgba(255,127,127,0.8)');
            }
        }
    }
});

//Receive a location and state from the server, change the specified tile accordingly
socket.on('tilechange', function(data){
    var tile = grid.tileAt(data.x - 5, data.y - 5);
    if(data.state)
    {
        tile.element.attr('fill', 'rgba(255,127,127,0.8)');
    }
    else
    {
        tile.element.attr('fill', 'rgba(210,210,210,1.0)');
    }
});

function createTile(x,y)
{
    var tile = grid.createTile(x, y);
        tile.element.attr('fill', 'rgba(210,210,210,1.0)');
        tile.element.attr('stroke-width', '1');
        tile.element.attr('stroke', 'rgb(255,255,200)');
        tile.state = false;
        tile.on('mouseup', function(){
            //Convert from cartesian to zero-based, emit
            socket.emit('tileclick', {"x": x+5, "y": y+5});
        });
}