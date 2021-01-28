const express = require('express')
const app = express()


const http = require('http').Server(app)

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:4444",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        console.log(msg)
        io.emit('event', msg)
    })
})

http.listen(4444, () => {
    console.log("Escutando na porta 4444")
})