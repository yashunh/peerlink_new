import { FaSearch } from "react-icons/fa";
import Avatar from "./Avatar";
import { useAtom } from "jotai";
import { recieverAtom, searchAtom, userAtom } from "../store/atom/atoms";
import { useState } from "react";

type User = {
    name: string,
    id: number
}

export default function Navbar(socket: any) {
    const[username, setUsername] = useState('')
    const [searchResult, setSearchResult] = useAtom(searchAtom)
    const [user] = useAtom(userAtom)
    const [,setReciever] = useAtom(recieverAtom)
    return (
        <div>
            <div className="flex justify-between items-center border rounded-md px-10 border-slate-800">
                <div className="text-3xl font-bold text-slate-50">
                    PeerLink
                </div>
                <div className="grid grid-cols-12 text-white border rounded-2xl border-slate-800 justify-center items-center px-2 w-lg">
                    <input className="p-2 w-full col-span-11 outline-none text-center" placeholder="enter username to search" type="text" id="searchBar" onChange={(e)=>setUsername(e.target.value)}></input>
                    <div className="col-span-1 w-3"onClick={()=>{
                        socket.emit("search user",username)
                        socket.on("found user",(users: User[])=>{
                            setSearchResult(users)
                        })
                    }}>
                        <FaSearch />
                    </div>
                    {searchResult ? <div className="p-2 w-full">
                            {searchResult.map((user)=><div onClick={()=>{
                                setReciever(user)
                            }}>{user.name}</div>)}
                    </div> : <div></div>}
                </div>
                <div className="pt-1">
                    <Avatar name={user?.name} />
                    <div className="text-white flex justify-center">
                        {user?.name}
                    </div>
                </div>
            </div>
        </div>
    );
}