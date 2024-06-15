import { useNavigate } from 'react-router-dom'
// import { Socket } from 'socket.io-client'
import type { ChatMessage, NewUser } from '../types/Chat'
import useUserInfo from '../hooks/useUserInfo'
import { getSocket } from '../handlers/socketHandler'
// import useSocket from '../hooks/useSocket'

interface Props {messages: ChatMessage[]}

function ChatBody({props}: {props: Props}) {
  // const socket = useSocket()
  const socket = getSocket()
  const { messages } = props
  const navigate = useNavigate()
  const userInfo: NewUser = useUserInfo()

  const onLeaveChatClick = () => {
    console.log('onLeaveChatClick', localStorage.getItem('userName'))
    localStorage.removeItem('userName')
    // socket.close()
    navigate('/')
    // window.location.reload()
  }

  return (
    <>
      <header className='chat__mainHeader'>
        <p><strong>{userInfo.userName} - {localStorage.getItem('userName')} - {socket?.id}</strong>, Hangout with colleagues</p>
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