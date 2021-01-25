const chatForm = document.getElementById("chat-form")
const socket = io()
socket.on("message",(message)=>{
    console.log(message)
})
chatForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    //target by id, get txt value
    let msg = e.target.elements.msg
    //emit message to server
    socket.emit("chatMessage",msg.value)
    msg.value = ""
   
})