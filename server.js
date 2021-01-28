const express = require("express")
const path = require("path")
const http = require("http")
const socketio = require("socket.io")


const app =  express()
const server = http.createServer(app)
const io = socketio(server)
const formatMessage = require("./utils/message")
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require("./utils/user")

//set static folder
app.use(express.static(path.join(__dirname, "public")))

//run when client connects
io.on("connection",(socket)=>{
    socket.on("joinRoom",({username, room})=>{
        //create user and join room
        const user = userJoin(socket.id, username, room)
        socket.join(user.room)

        //send to front (a msg)
        socket.emit("message", formatMessage("Chat Bot", "Welcome to chat"))

        //broadcast when user connects
        //broadcast >> emit everybody except the new user
        //broadcast to specific room, where user room is at
        socket.broadcast.to(user.room).emit("message", formatMessage("Chat Bot",`${user.username} has joined the chat`))

        //bradcast everybody
        //io.emit("message","all clients")


    })


   
    // listen for chat message
    socket.on("chatMessage", (msg)=>{
        //get user info
        const user = getCurrentUser(socket.id)
        //io.to() >> emits to specific room
        io.to(user.room).emit("message" , formatMessage(user.username,msg))
    })

    //runs when client disconnects
    socket.on("disconnect",()=>{
        const user = userLeave(socket.id)
        // console.log(user)
        io.to(user.room).emit("message", formatMessage(user.username, `${user.username} has left the chat`))
    })

})



const port = process.env.PORT || 3000
server.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})