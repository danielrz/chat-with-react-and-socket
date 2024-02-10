import { useNavigate } from 'react-router-dom'
import type { ChatMessage } from '../types/Chat'

function ChatBody({messages}: {messages: ChatMessage[]}) {
  const navigate = useNavigate()

  const onLeaveChatClick = () => {
    localStorage.removeItem('userName')
    navigate('/')
    // window.location.reload()
  }

  return (
    <>
      <header className='chat__mainHeader'>
        <p>Hangout with colleagues</p>
        <button className='leaveChat__btn' onClick={onLeaveChatClick}>
          Leave Chat
        </button>
      </header>
      {/*This shows messages sent from you*/}
      <div className="message__container">
        {messages.map((message) =>
          message.name === localStorage.getItem('userName') ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        <div className="message__status">
          <p>Someone is typing...</p>
        </div>
      </div>
    </>
  )
}

export default ChatBody