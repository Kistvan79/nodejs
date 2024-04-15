
import express from "express";
import {createServer} from "http";
import { Server } from "socket.io";
import path from "path";

const app = express()
const httpServer = createServer(app)
const socketIO = new Server(httpServer)

app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public")
})


// on "connection" sker när en klient kopplar sig till servern
socketIO.on("connection", function (socket) {
  console.log("A user connected")


  // Säger till servern att lyssna efter "scream" emit från klienten
  socket.on("scream", function (data) {
    console.log("I heard a scream: " + data)
  })
})


httpServer.listen(3000, function () {
  console.log("listening on *:3000")
})
