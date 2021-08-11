const socket = io()

let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')

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

 // Send to server
 socket.emit('messageSend', msg)
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

// receive messages
// this will be client code this runs in browser not in server
socket.on('messageEvent', ()=>{

})
