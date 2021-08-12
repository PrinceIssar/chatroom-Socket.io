const socket = io()

let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')
let audio = new Audio('/img/ring.mp3')

do{
 name = prompt('Please enter your name: ')
}while (!name) // not name

textarea.addEventListener('keyup', (e)=>{
 if (e.key === 'Enter'){ // if enter button is pressed this function will work
  sendMessage(e.target.value)  // we send the message and whatever is write will be provided
 }

})

function sendMessage(message){ //
// logic to send msg

 let msg = {
  user:name,
  message:message.trim() //to trim the white line under message box
 }
 //append the message
 appendMessage(msg,'outgoing')

 // now once the msg is send we need to remove from the textarea the msg
textarea.value ='';
 // call the function for scroll
 scrollToBottom()


 // Send to server
 socket.emit('message', msg)
}

function appendMessage(msg, type){
   let mainDiv = document.createElement('div')
   let className = type
 mainDiv.classList.add(className, 'message')

 let markup =`
 <h4>${msg.user}</h4>
 <p>${msg.message}</p>
`
 mainDiv.innerHTML= markup

 messageArea.appendChild(mainDiv)

}

// Receive messages
// this will be client code this runs in browser not in server
socket.on('message', (msg)=>{
 // this will start sending msg to both browser
 appendMessage(msg, 'incoming') // it need to parameter one msg and other is incoming
// audio
 audio.play();
 // 2nd time when we receive msg ; call the function for scroll
 scrollToBottom()

 //left
 socket.on('left', name=>{
  appendMessage(`${name} left the chat`, 'left')
 })

})




// when written many msg it should scroll down
function scrollToBottom(){
 messageArea.scrollTop = messageArea.scrollHeight
}
