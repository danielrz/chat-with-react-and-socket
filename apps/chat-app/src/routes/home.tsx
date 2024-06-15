import { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
// import { Socket } from 'socket.io-client'
import type { NewUser } from '../types/Chat'
import { getSocket } from '../handlers/socketHandler'
// import useSocket from '../hooks/useSocket'

function Home() {
  const navigate = useNavigate()
  // const socket = useSocket()
  const [userName, setUserName] = useState('')

  const onUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    localStorage.setItem('userName', userName)
    const socket = getSocket()
    socket?.emit('newUser', { userName, socketId: socket.id } as NewUser)
    navigate('/chat')
  }

  return (
    <form className="home__container" onSubmit={onFormSubmit}>
      <h2 className='home__header'>
        Sign in to open chat
      </h2>
      <label htmlFor="username">
        Username
      </label>
      <input type="text" minLength={6} name="username" id="username" className="username__input" onChange={onUserNameChange} />
      <button className='home__cta'>SIGN-IN</button>
    </form>
  )
}

export default Home