import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import axios from "axios"
import { useState } from "react"

export default function Signin() {
    const navigate = useNavigate()
    let token = window.localStorage.getItem("token")

    if (token) {
        navigate("/home");
    }

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })

    return (
        <div className="flex flex-col bg-black min-h-screen">
            <Navbar />
            <div className="flex items-center h-screen justify-center m-4 mb-40">
                <div className="p-6 w-[350px] flex flex-col justify-center text-white border border-gray-800 shadow-sm font-mono rounded-lg ">
                    <div className="flex justify-between">
                        <div className="font-semibold text-2xl">
                            Signin
                        </div>
                    </div>
                    <label className="py-1" htmlFor="Name">Name</label>
                    <input placeholder="Enter Your Name" id="Name" type="text" onChange={(e) => {
                        setInputs({
                            ...inputs,
                            username: e.target.value
                        })
                    }}
                        className="p-2 mb-3 border border-slate-800  bg-background rounded-lg" />
                    <label className="py-1" htmlFor="password">Password</label>
                    <input placeholder="Enter Your password" id="password" type="text"  onChange={(e) => {
                        setInputs({
                            ...inputs,
                            password: e.target.value
                        })
                    }}
                        className="p-2 mb-3 border border-slate-800  bg-background rounded-lg" />
                    <div className="flex justify-center mt-2">
                        <button className="border border-slate-800 w-full py-2 bg-background rounded-4xl"
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
                                        window.localStorage.setItem("token", response.data.token)
                                        navigate("/home")
                                    } catch (error) {
                                        console.error("Error signing in form:", error);
                                    }
                                }
                            }}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}