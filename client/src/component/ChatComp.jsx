import React, { useState } from 'react'

const ChatComp = ({socket, username, room}) => {

  const [currentMessage, setcurrentMessage] = useState("")

  const sendMessage = async ()=>{
    if(currentMessage !== ""){
      const messageData = {
        id : Math.random(),
        room : room,
        auther : username,
        message : currentMessage,
        time : new Date(Date.now()).getHours()/24 + ":" + new Date(Date.now()).getMinutes()
      }
    }
    
  }

  return (
    <>
    <div className="chat_container">
        <h1>Welcome {username} </h1>
        <div className="chat_box">

            <div className="chat_body">
              <input type="text" value={currentMessage} placeholder='Type Your Message' name="" id="" onChange={(e)=>setcurrentMessage(e.target.value)} />
              <button>&#9658;</button>
            </div>

        </div>
    </div>
    </>
  )
}

export default ChatComp