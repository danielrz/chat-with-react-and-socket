import { useEffect, useState } from "react";
// import { Socket } from "socket.io-client";
import { NewUser } from "../types/Chat";
import useSocket from "./useSocket";

function useUserInfo(): NewUser {
  const socket = useSocket()
  const [user, setUser] = useState<NewUser>({ userName: '', socketId: ''})
  useEffect(() => {
    socket?.on('newUserResponse', (user: NewUser) => {
      if (user.userName.length === 0) {
        setUser(user)
      }
    })
  }, [])

  return user
}

export default useUserInfo