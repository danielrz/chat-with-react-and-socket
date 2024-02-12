import './App.css'
import socketIO from 'socket.io-client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './routes/home'
import ChatPage from './routes/chat'

const socket = socketIO('http://localhost:4000').connect()
socket.emit('hi', 'hi')

function App() {

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<HomePage socket={socket} />} />
          <Route path="/chat" element={<ChatPage socket={socket} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
