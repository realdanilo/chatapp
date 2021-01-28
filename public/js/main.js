//get username and room URL from query
const {username, room} = Qs.parse(location.search,{ignoreQueryPrefix:true})
// console.log(username, room)

//output msg to dom
function outputMessage(msg){
    let div = document.createElement("div")
    div.classList.add("message")
    div.innerHTML = `
    <p class="meta">${msg.username} <span>${msg.time}</span></p>
	<p class="text"> ${msg.text}</p>
    `

  document.querySelector(".chat-messages").append(div)
}

const chatForm = document.getElementById("chat-form")
const chatMessages = document.querySelector(".chat-messages")
const socket = io()

//join chatroom
socket.emit("joinRoom", {username, room})

//Getting a message
socket.on("message",(message)=>{
    // console.log(message)
    outputMessage(message)
    //scroll down 
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

//Sending a message
chatForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    //target by id, get txt value
    let msg = e.target.elements.msg
    //emit message to server
    socket.emit("chatMessage",msg.value)
    msg.value = ""
    msg.focus();
   
})
