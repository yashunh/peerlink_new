import { io } from "socket.io-client";
import './App.css'

function App() {
  const socket = io('http://localhost:3000');
  return (
    <>
      <div>
        hi there
      </div>
      {socket}
    </>
  )
}

export default App
