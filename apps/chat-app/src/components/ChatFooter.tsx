import { FormEvent, useState } from "react"
import { Socket } from "socket.io-client"
import type { ChatMessage } from "../types/Chat"

function ChatFooter({socket}: {socket: Socket}) {
  const [message, setMessage] = useState('hello')

  const onTextType = (e: FormEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value)
  }
  const onSendMessageClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (message.trim() === '' && localStorage.getItem('userName') === null) {
      return
    }
    socket.emit('message', {
      name: localStorage.getItem('userName'),
      text: message,
      id: `${socket.id}-${Date.now()}`,
      socketId: socket.id
    } as ChatMessage)
    socket.emit('log', {
      name: localStorage.getItem('userName'),
      text: message,
      id: `${socket.id}-${Date.now()}`,
      socketId: socket.id
    } as ChatMessage)
    setMessage('')
  }

  // socket.on('logMessage', (message: ChatMessage) => {
  //   console.log('socket::onLog', message)
  // })
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