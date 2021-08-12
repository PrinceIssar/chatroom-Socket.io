const express = require('express')
const {use} = require("express/lib/router");
const app = express()
const http =require('http').createServer(app)


const PORT = process.env.PORT || 3000 // when deployed that env would our port otherwise default as 3000

//server
http.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`)
})

// middelWare for other pages/files
app.use(express.static(__dirname + '/public'))

// create a route
app.get('/', (req , res)=> {
    res.sendFile(__dirname + '/index.html') // This to send our index file to the server
})

//Socket

//import socket
const io = require('socket.io')(http)

io.on('connection', (socket)=> {
    console.log('Connected...')
    //listen to emit
    socket.on('message', (msg)=>{
        //send the message to client or browsers
        socket.broadcast.emit('message',msg)  // broadcast:  it'll send all the connection the message but not only to the sender
    })
//leave message
//     socket.on('disconnect', message =>{
//         socket.broadcast.emit('left', name[socket.id]);
//         delete user[socket.id];
//     })

    // socket.on('forceDisconnect', function(){
    //     socket.disconnect(true);
    // });

    socket.on('disconnect', () => {
        socket.broadcast.emit('left', socket.id);
    });
})



