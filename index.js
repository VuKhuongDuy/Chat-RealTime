var express = require('express');
var app = express();
app.use(express.static("./public")); 
app.set("view engine","ejs");
app.set("views","./views");
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(3000);


var listClient = [];

io.on('connection',function(socket){
    io.sockets.emit('Server-send-data',listClient);

    socket.on('disconnect',function(){
        console.log(socket.id)
        listClient.splice(
            listClient.indexOf(socket.userName),1
        )
        io.sockets.emit('Server-send-data',listClient);
    })

    socket.on('Client-send-login',function(data){
        if(listClient.includes(data)){
            if(!listClient.includes(data)){
                listClient.push(data)
            }
            socket.emit('Server-send-loginSuccess',data);
            io.sockets.emit('Server-send-data',listClient);
        }
        else socket.emit('Server-send-loginFail');
    })

    socket.on('Client-send-logup',function(data){
        if(listClient.includes(data)){
            socket.emit('Seerver-send-logupFail');
        }else{
            listClient.push(data);
            socket.userName = data;
            console.log(socket.id+"----"+socket.userName)
            socket.emit('Server-send-loginSuccess',data);
            io.sockets.emit('Server-send-data',listClient);
        }
    })
    
    socket.on("Client-send-logout",function(data){
        listClient.splice(
            listClient.indexOf(data),1
        );
        socket.broadcast.emit('Server-send-data',listClient);
    })

    socket.on('Client-send-message',function(data){
        io.sockets.emit('Server-send-message',{user: socket.userName, text: data})
    })
})

app.get('/',function(req,res){
    res.render("trangchu")
})

