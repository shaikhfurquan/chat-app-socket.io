import React, { useState, useEffect, useRef } from 'react'
import receiveMusic from '../audio/ding.mp3'


const ChatComp = ({ socket, username, room }) => {

  const [currentMessage, setcurrentMessage] = useState("")
  const [messageList, setMessageList] = useState([])

  const notification = new Audio(receiveMusic)

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        id: Math.random(),
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() % 12 + ":" + new Date(Date.now()).getMinutes()
      }

      await socket.emit("send_message", messageData)
      setMessageList((list) => [...list, messageData])
      setcurrentMessage("");
      notification.play()

    }

  }

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMessageList((list) => [...list, data])
    }
    socket.on("receive_message", handleReceiveMessage)

    return () => {
      socket.off("receive_message", handleReceiveMessage)
    }
  }, [socket])


  const containRef = useRef(null)
  useEffect(() => {

    containRef.current.scrollTop = containRef.current.scrollHeight
  }, [messageList])

  return (
    <>
      <div className="chat_container">
        <h1>Welcome {username} </h1>
        <div className="chat_box">
          <div className="auto-scrolling-div" ref={containRef} style={{ height: '450px', overflowY: "auto"}}>

            {
              messageList.map((data) => (
                <div key={data.id} className="message_content" id={username == data.author ? "you" : "other"} >
                  <div>
                    <div className="msg" id={username == data.author ? "y" : "b"}>
                      <p>{data.message}</p>
                    </div>
                    <div className="msg_details">
                      <p>{data.author}</p>
                      <p>{data.time}</p>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>

          <div className="chat_body">
            <input type="text" value={currentMessage} placeholder='Type Your Message' name="" id="" onChange={(e) => setcurrentMessage(e.target.value)} onKeyPress={(e) => { e.key === "Enter" && sendMessage() }} />
            <button onClick={sendMessage}>&#9658;</button>
          </div>

        </div>
      </div >
    </>
  )
}

export default ChatComp