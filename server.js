const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const routes = require('./routes/index');
const cors = require('cors');
const fs = require('fs'); 
const request = require('request');

app.use(cors());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use('/api/', routes);
app.get('/', function(req, res) {
    fs.readFile(__dirname + '/public/index.html',
        function (error, data) {
            if (error) {
                console.log(error);
                res.writeHead(500);
                return res.end('An unexpected error occured. Error: ' + error);
            }

            res.writeHead(200);
            res.end(data);
        });
});

io.sockets.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('create', function(room) {
        console.log('creating or joining room:'+room);
        socket.join(room);
    });

    socket.on('message', function(data){
        console.log(data.room);
        console.log(data.msg);
        if(!data.translate)
            io.to(data.room).emit('message', data.msg);
        else{
            request('http://www.transltr.org/api/translate?text='+data.msg+'&to='+data.toLang+'&from='+data.fromLang, function (error, response, body) {
                var msg = JSON.parse(body); 
                console.log(msg.translationText);
                console.log(msg)
                io.to(data.room).emit('message', msg.translationText); 
            });
        }
    })

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

http.listen(3000, () => {
    console.log('server listening on port: 3000');
});

/*mongoose.connect('mongodb://localhost:27017');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
	console.log('mondodb connected at: mongodb://localhost:27017');
	app.listen(3000, () => {
		console.log('server listening on port: 3000');
	});
});*/