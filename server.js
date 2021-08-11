const express = require('express')
const app = express()
const http =require('http').createServer(app)


const PORT = process.env.PORT || 3000 // when deployed that env would our port otherwise default as 3000

http.listen(PORT, ()=>{
    console.log(`Listening to port ${PORT}`)
})

// middelWare for other pages/files
app.use(express.static(__dirname + '/public'))
// create a route
app.get('/', (req , res)=> {
    res.sendFile(__dirname + '/index.html') // This to send our index file to the server
})
