const express = require("express")
const path = require("path")
const http = require("http")
const socketio = require("socket.io")


const app =  express()
const server = http.createServer(app)
const io = socketio(server)
const formatMessage = require("./utils/message")

//set static folder
app.use(express.static(path.join(__dirname, "public")))

//run when client connects
io.on("connection",(socket)=>{
    //send to front (a msg)
    socket.emit("message", formatMessage("Chat Bot", "Welcome to chat"))

    //broadcast when user connects
    //broadcast >> emit everybody except the new user
    socket.broadcast.emit("message", formatMessage("Chat Bot","user has joined the chat"))

    //bradcast everybody
    io.emit("message","all clients")

    //runs when client disconnects
    socket.on("disconnect",()=>{
        io.emit("message", formatMessage("Chat Bot", "user has left the chat"))
    })

    // listen for chat message
    socket.on("chatMessage", (msg)=>{
        io.emit("message" , formatMessage("USER",msg))
    })
})



const port = process.env.PORT || 3000
server.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})