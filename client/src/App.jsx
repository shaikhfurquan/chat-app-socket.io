import { useState } from 'react'
import React from 'react'
import io from 'socket.io-client'
import ChatComp from './component/ChatComp'
import joinMusic from './audio/notification.mp3'



const socket = io.connect("http://localhost:2000")


const App = () => {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)

  const notification = new Audio(joinMusic)

  const joinChat = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room)
      setShowChat(true)
      notification.play()
    }
  }

  return (
    <>
      {!showChat && (<div className="join_room">
        <h1>Join Chat</h1>

        <input type="text" placeholder='Enter Your Name'
          onChange={(e) => setUsername(e.target.value)}
          name="" id="" />

        <input type="text" placeholder='Enter Chat Room'
          onChange={(e) => setRoom(e.target.value)}
          onKeyPress={(e) => { e.key === "Enter" && joinChat()}} />
        <button onClick={joinChat}>Join</button>
      </div>)}

      {
        showChat && (
          <ChatComp socket={socket} username={username} room={room} />
        )
      }
    </>
  )
}

export default App