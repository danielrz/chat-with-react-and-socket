import { useEffect } from "react"
import { Socket } from "socket.io-client"
import ChatBar from "../components/ChatBar"
import ChatBody from "../components/ChatBody"
import ChatFooter from "../components/ChatFooter"
import { useState } from "react"
import type { ChatMessage } from "../types/Chat"

function Chat({socket}: {socket: Socket}) {
  const [messages, setMessages] = useState<ChatMessage[]>([])

  useEffect(() => {
    socket.on('messageResponse', (message: ChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })

    socket.on('logMessage', (message: ChatMessage) => {
      console.log('socket::onLog', message)
    })
  
    // Cleanup function to remove the event listener when component unmounts
    return () => {
      socket.off('messageResponse');
      socket.off('logMessage');
    };
  }, [socket]);
  

  return (
    <>
      <div className="chat">
        <ChatBar />
        <div className="chat__main">
          <ChatBody messages={messages} />  
          <ChatFooter socket={socket} />
        </div>
      </div>
    </>
  )
}

export default Chat