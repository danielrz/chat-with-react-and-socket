import { useEffect, useState } from "react"
// import { Socket } from "socket.io-client"
// import useSocket from "../hooks/useSocket"
import { NewUser } from "../types/Chat"
import { getSocket } from "../handlers/socketHandler"

function ChatBar() {
  // const socket = useSocket()
  const [users, setUsers] = useState<NewUser[]>([])

  useEffect(() => {
    const socket = getSocket()
    socket?.on('usersResponse', (users: NewUser[]) => {
    console.log('users', users)
    setUsers(users)
  })
}, [])

  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {users.map((user) => {
            return (
              <p key={user.socketId}>{user.userName}</p>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ChatBar