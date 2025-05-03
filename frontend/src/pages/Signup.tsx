import { useNavigate } from "react-router-dom";

export default function Signup(){
    const navigate = useNavigate()
    let token = window.localStorage.getItem("token")

    if(token){
        navigate("/home");
    }

    return (
        <div>
            
        </div>
    )
}