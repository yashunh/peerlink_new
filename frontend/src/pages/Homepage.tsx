import io from "socket.io-client";
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar";
import Contact from "../components/Contact";
import { useAtom } from "jotai";
import { contactAtom, messageAtom, tokenAtom } from "../store/atom/atoms";
import Chat from "../components/Chat";

type Contact = {
  id: number,
  name: string,
  lastMessage?: string,
  lastMessageTime: Date
}

type Message = {
    createdAt: Date,
    sender: number,
    reciever: number,
    content: string,
}

export default function Homepage() {
  const navigate = useNavigate()
  let socket
  
  const[token] = useAtom(tokenAtom)
  const[message,setMessage] = useAtom(messageAtom)
  if (!token || token == "Unknown") {
    window.localStorage.removeItem("token")
    navigate("/signin")
  }
  try {
    socket = io('http://localhost:3000', {
      auth: {
        token: token
      }
    });
  } catch (err) {
    window.localStorage.removeItem("token")
    navigate("/signin");
  }

  socket?.on("message recieved", (msg: Message) => {
    // setMessage(...message,msg)
  })

  const [, setContacts] = useAtom(contactAtom)

  socket?.emit("get contact")
  socket?.on("set contact", (contacts: Contact[]) => {
    setContacts(contacts)
  })
  return (
    <div>
      <div className="bg-black min-h-screen">
        <Navbar />
        <div className="grid grid-cols-6">
          <div className="col-span-1 flex flex-col">
            <Contact socket={socket} />
          </div>
          <div className="col-span-5">
            <Chat socket={socket} />
          </div>
        </div>
      </div>
    </div>
  )
}