import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import axios from "axios"
import { useEffect, useState } from "react"
import { useAtom } from "jotai"
import { tokenAtom, userAtom } from "../store/atom/atoms"

export default function Signin() {
    const navigate = useNavigate()
    const [,setUser] = useAtom(userAtom)
        const [token,setToken] = useAtom(tokenAtom)
        useEffect(() => {
            if (token && token != "Unknown") {
                navigate("/home");
            }
        }, [])
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })

    return (
        <div className="flex flex-col bg-black min-h-screen">
            <Navbar />
            <div className="flex items-center h-full mt-40 justify-center m-4">
                <div className="p-6 w-[350px] flex flex-col justify-center text-white border border-gray-800 shadow-sm font-mono rounded-lg ">
                    <div className="flex justify-between">
                        <div className="font-semibold text-2xl">
                            Signin
                        </div>
                    </div>
                    <label className="py-1" htmlFor="Username">Username</label>
                    <input placeholder="Enter Your Username" id="Username" type="text" onChange={(e) => {
                        setInputs({
                            ...inputs,
                            username: e.target.value
                        })
                    }}
                        className="p-2 mb-3 border border-slate-800  bg-background rounded-lg" />
                    <label className="py-1" htmlFor="password">Password</label>
                    <input placeholder="Enter Your password" id="password" type="text" onChange={(e) => {
                        setInputs({
                            ...inputs,
                            password: e.target.value
                        })
                    }}
                        className="p-2 mb-3 border border-slate-800  bg-background rounded-lg" />
                    <div className="flex justify-center mt-2">
                        <button className="border border-slate-800 w-full py-2 bg-background rounded-md"
                            onClick={async () => {
                                if (!inputs.password || !inputs.username) {
                                    window.alert("Please fill in all fields.");
                                    return;
                                }
                                else {
                                    try {
                                        const response = await axios.post("http://localhost:3000/signin", {
                                            inputs
                                        })
                                        console.log(response)
                                        if (response.data.msg == "User does not exist") {
                                            alert("User does not exist Signup")
                                        }
                                        else if (response.data.msg == "Invalid Inputs") {
                                            alert("Invalid Inputs")
                                        }
                                        else {
                                            window.localStorage.setItem("token", response.data.token)
                                            console.log(response.data)
                                            setToken(response.data.token)
                                            setUser(response.data.user)
                                            navigate("/home")
                                        }
                                    } catch (error) {
                                        console.error("Error signing in form:", error);
                                    }
                                }
                            }}
                        >
                            Submit
                        </button>
                    </div>
                    <div className="py-2 flex justify-center">
                        <div>
                            Don't have account
                        </div>
                        <div className="underline pl-2" onClick={() => navigate("/signup")}>
                            Signup
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}