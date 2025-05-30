import io from "socket.io-client";
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar";
import Contact from "../components/Contact";
import { useAtom } from "jotai";
import { contactAtom, messageAtom, tokenAtom, userAtom } from "../store/atom/atoms";
import Chat from "../components/Chat";
import { Socket } from "socket.io-client"
import { useEffect } from "react";
import { flushSync } from "react-dom";

export let socket: Socket

type Contact = {
  id: number,
  username: string,
  lastmessage?: string,
  lastmessagetime: Date
}

type Message = {
  date: Date,
  sender: number,
  receiver: number,
  content: string,
}

type User = {
  username: string,
  id: number
}

export default function Homepage() {
  const navigate = useNavigate()
  const [user, setUser] = useAtom(userAtom)
  const [token] = useAtom(tokenAtom)
  const [, setMessage] = useAtom(messageAtom)
  const [, setContacts] = useAtom(contactAtom)

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
      if (!user?.id) {
        socket?.emit("get user")
      }
      socket?.emit("get contacts")

      socket?.on("set user", (user: User) => {
        setUser(user)
      })

      socket?.on("set messages", (messages: Message[]) => {
        setMessage(messages)
      })

      socket?.on("message send", (msg: Message) => {
        setMessage((prev) => [...prev, msg])
        flushSync(() => {
          setContacts(prev =>
            prev.map(c =>
              (c.id === msg.receiver || c.id === msg.sender)
                ? { ...c, lastmessage: msg.content, lastmessagetime: msg.date }
                : c
            )
          )
        })
      })

      socket?.on("message received", (msg: Message) => {
        setMessage((prev) => [...prev, msg])
        flushSync(() => {
          setContacts(prev =>
            prev.map(c =>
              (c.id === msg.receiver || c.id === msg.sender)
                ? { ...c, lastmessage: msg.content, lastmessagetime: msg.date }
                : c
            )
          )
        })
      })


      socket?.on("set contacts", (contacts: Contact[]) => {
        setContacts(contacts)
      })

      socket?.on("auth error", (err) => {
        window.alert("auth error")
        console.log(err)
      })

    } catch (err) {
      window.localStorage.removeItem("token")
      navigate("/signin");
    }
  }, [])

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