interface ChatMessage {
  id: string
  name: string
  text: string
  socketId: string
}

interface NewUser {
  userName: string
  socketId: string
}

export type {
  ChatMessage,
  NewUser
}