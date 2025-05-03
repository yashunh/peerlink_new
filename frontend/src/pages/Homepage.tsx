import { useEffect } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

export default function Homepage(){
    const navigate = useNavigate()
    let token = window.localStorage.getItem("token")

    if(!token){
        navigate("/signin");
    }
    let socket;
    useEffect(()=>{
      try{
        socket = io('http://localhost:3000',{
          auth: {
            token: token
          }
        });
      }catch(err){
        window.localStorage.setItem("token", "")
        navigate("/signin");
      }
    },[])
    return (
        <div>
    
        </div>
    )
}