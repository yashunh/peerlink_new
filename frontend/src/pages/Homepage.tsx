import { useEffect } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar";

export default function Homepage() {
  const navigate = useNavigate()
  let token: string;
  useEffect(() => {
    token = window.localStorage.getItem("token")?.toString() || "Unknown"
    if (!token || token == "Unknown") {
      window.localStorage.removeItem("token")
      navigate("/signin");
    }
  },[])
  let socket;
  useEffect(() => {
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
  }, [])

  return (
    <div>
      <div className="bg-black">
        <Navbar />
      </div>
    </div>
  )
}