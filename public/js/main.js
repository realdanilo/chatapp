//output msg to dom
function outputMessage(msg){
    let div = document.createElement("div")
    div.classList.add("message")
    div.innerHTML = `
    <p class="meta">Test <span>9:12pm</span></p>
	<p class="text"> ${msg}</p>
    `

  document.querySelector(".chat-messages").append(div)
}

const chatForm = document.getElementById("chat-form")
const chatMessages = document.querySelector(".chat-messages")
const socket = io()
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
   
})
