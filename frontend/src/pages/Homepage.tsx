import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar";
import Contact from "../components/Contact";
// import { useSetRecoilState } from "recoil";
// import { contactAtom } from "../store/atom/atoms";

export default function Homepage() {
  const navigate = useNavigate()
  let token = window.localStorage.getItem("token") || "Unknown"
    if (!token || token == "Unknown") {
      window.localStorage.removeItem("token")
      navigate("/signin")
    }
  let socket;
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

  socket?.on("message",()=>{
    
  })

  // const setContacts = useSetRecoilState(contactAtom)

  // // socket?.emit("get contact")
  // // socket?.on("set contact", (contacts)=>{
  // //   setContacts(contacts)
  // // })
  return (
    <div>
      <div className="bg-black min-h-screen">
        <Navbar />
        <div className="grid grid-cols-6">
          <div className="col-span-1 flex flex-col">
            <Contact/>
          </div>
          <div className="col-span-5 bg-amber-300">
            chat
          </div>
        </div>
      </div>
    </div>
  )
}