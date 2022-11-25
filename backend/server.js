import express from 'express';
import { Server } from 'socket.io' 
import http from 'http'
import { isPromise } from 'util/types';


const app = express();
const server = http.createServer(app)
const io = new Server(server)
const port = 3000

io.on("connection", socket => {
    console.log('New client connected')
    socket.on('chat message', msg => {
        console.log(msg)
        io.emit('chat message', msg)
    })
})

io.off("chat message", socket => {
    console.log('Client disconnected')
})

server.listen(port, () => console.log(`Listening on port ${port}`));