import { useEffect, useState } from 'react'
import io from "socket.io-client"

const socket = io.connect("http://localhost:3001")

function App() {
  const [room, setRoom] = useState("")

  const [message, setMessage] = useState("")
  const [messageReceive, setMessageReceive] = useState("")

  const joinRoom = () => {
    if (room !== '') {
      socket.emit('join_room', room)
    }
  }

  const sendMessage = () => {
    socket.emit('send_message', { message, room })
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceive(data.message)
    })
  }, [socket])

  return (
    <div className="App">
      <input
        onChange={(e) => setRoom(e.target.value)}
        placeholder='Room'
      />
      <button onClick={joinRoom}>Join Room</button>
      <input
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Message...'
      />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message:</h1>
      <p>{messageReceive}</p>
    </div>
  )
}

export default App
