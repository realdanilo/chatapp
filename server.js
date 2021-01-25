const express = require("express")
const path = require("path")
const http = require("http")
const socketio = require("socket.io")


const app =  express()
const server = http.createServer(app)
const io = socketio(server)

//set static folder
app.use(express.static(path.join(__dirname, "public")))

//run when client connects
io.on("connection",(socket)=>{
    //send to front
    socket.emit("message", "welcome to chat app")

    //broadcast when user connects
    //broadcast >> emit everybody except the new user
    socket.broadcast.emit("message", "user has joined the chat")

    //bradcast everybody
    io.emit("all clients")

    //runs when client disconnects
    socket.on("disconnect",()=>{
        io.emit("message", "user has left the chat")
    })

    // listen for chat message
    socket.on("chatMessage", (msg)=>{
        console.log(msg)
    })
})



const port = process.env.PORT || 3000
server.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})