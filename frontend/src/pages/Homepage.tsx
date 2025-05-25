import io from "socket.io-client";
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar";
import Contact from "../components/Contact";
import { useAtom } from "jotai";
import { contactAtom, messageAtom, tokenAtom } from "../store/atom/atoms";
import Chat from "../components/Chat";
import { Socket } from "socket.io-client"
import { useEffect } from "react";

export let socket: Socket

type Contact = {
    id: number,
    name: string,
    lastmessage?: string,
    lastmessagetime: Date
}

type Message = {
  createdAt: Date,
  sender: number,
  reciever: number,
  content: string,
}

export default function Homepage() {
  const navigate = useNavigate()
  const [token] = useAtom(tokenAtom)
  const [message, setMessage] = useAtom(messageAtom)

  useEffect(() => {
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
  },[])

  socket?.on("set messages", (messages: Message[]) => {
    setMessage(messages)
  })
  socket?.on("message received", (msg: Message) => {
    setMessage([...message, msg])
  })

  const [, setContacts] = useAtom(contactAtom)

  socket?.emit("get contacts")
  socket?.on("set contacts", (contacts: Contact[]) => {
    setContacts(contacts)
  })
  return (
    <div>
      <div className="bg-black min-h-screen">
        <Navbar />
        <div className="grid grid-cols-6">
          <div className="col-span-1 flex flex-col">
            <Contact />
          </div>
          <div className="col-span-5">
            <Chat />
          </div>
        </div>
      </div>
    </div>
  )
}