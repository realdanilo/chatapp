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
    console.log("new connection")
    //send to front
    socket.emit("message", "welcome to chat app")

    //broadcast when user connects
    //broadcast >> emit everybody except the new user
    socket.broadcast.emit()

    //bradcast everybody
    io.emit("all clients")
})



const port = process.env.PORT || 3000
server.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})