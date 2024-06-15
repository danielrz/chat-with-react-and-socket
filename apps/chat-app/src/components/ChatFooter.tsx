import { FormEvent, useState } from "react"
// import { Socket } from "socket.io-client"
// import useSocket from "../hooks/useSocket"
import type { ChatMessage } from "../types/Chat"
import { getSocket } from "../handlers/socketHandler"

function ChatFooter() {
  // const socket = useSocket()
  const [message, setMessage] = useState('')

  const onTextType = (e: FormEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value)
  }
  const onSendMessageClick = (e: FormEvent<HTMLFormElement>) => {
    const socket = getSocket()
    e.preventDefault()
    if (message.trim() === '' && localStorage.getItem('userName') === null) {
      return
    }
    socket?.emit('message', {
      name: localStorage.getItem('userName'),
      text: message,
      id: `${socket?.id}-${Date.now()}`,
      socketId: socket?.id
    } as ChatMessage)

    socket?.emit('log', {
      name: localStorage.getItem('userName'),
      text: message,
      id: `${socket?.id}-${Date.now()}`,
      socketId: socket?.id
    } as ChatMessage)
    setMessage('')
  }

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={onSendMessageClick}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={onTextType}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  )
}

export default ChatFooter