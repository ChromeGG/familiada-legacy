export type TEAM = 'RED' | 'BLUE'

// TODO
// 1. Middleware do rozpoznawania userów?
// 2. Użytkownicy trzymani jako referencje (id) w firstHitach, odpowiedziach... ? - TAK
// 3. Tworzenie gry to powinien być osobny event

// HTTP request z tworzeniem gry:
// Payload: gameId, userId
// Server bootstrapuje Grę z Rundami
// Ustawia admina gry na userId

// teraz gracze dołączają:
// Payload: gameId, socketId, userName, userTeam
// Serwer znajduje gre o podanym Id i przypisuje jej usera
// const users = games.find(gameId).users
// socket.join(gameId)
// server.to(gameId).broadcast(updateUserList, users)

// Rozpoczynanie gry przez admina
// Payload: brak (user wyciągany z socketId)
// client wysyła event o rozpoczęciu gry (i ustawia timeout 5s do striggerowania emit('startRound'))
// TODO: emit czegoś po 5 sekundach na tym samym on() jest możliwy?
// server broadcastuje, że gra sie zaczyna

// Rozesłanie pytania
// Payload: brak
// client triggeruje emit('startRound')
// server broadcastuje pytanie
// clienty odbierają pytanie i printują je

// Zgłoszenie chęci odpowiedzi
// Payload: brak
// client zgłasza, że chce odpowiedzieć
// server odbiera i zapisuje w Round[0] hitAnswer z userId

// wysłanie odpowiedzi
// Payload: string z odpowiedzią
// serwer sprawdza, czy odpowiedź pasuje

// TODO rename User to Player
export interface User {
  // TODO rename name to id
  name: string
  team: TEAM
}

export interface Answer {
  position: 1 | 2 | 3 | 4 | 5
  score: number
  text: string
  user: User
}

export interface HitAnswer {
  time: Date
  user: User
}

export interface Round {
  question: string
  firstHit: HitAnswer
  answers: [Answer]
}

export interface Game {
  id: string
  adminId: string
  users: [User]
  actualRound: 1 | 2 | 3 | 4 | 5
  rounds: [Round]
}

// ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData

export type ClientToServerEvents = {
  join: (user: User) => void
  answer: (user: User) => void
}
export type ServerToClientEvents = { userJoined: (user: User) => void }

export interface SocketData {
  gameId: string
  user: User
}
