import { FaSearch } from "react-icons/fa";
import Avatar from "./Avatar";
import { useAtom } from "jotai";
import { contactIdAtom, filterContactAtom } from "../store/atom/atoms";
type Contact = {
    id: number,
    name: string,
    lastMessage?: string,
    lastMessageTime: Date
}
export default function Contact(socket: any) {
    const [contacts] = useAtom<Contact[]>(filterContactAtom)
    const [, setContactId] = useAtom(contactIdAtom)
    return (
        <div className="m-1">
            <div className="grid grid-cols-12 text-white border rounded-2xl border-slate-800 justify-enter items-center px-2">
                <input className="p-2 w-full col-span-11 outline-none" placeholder="search" type="text" id="searchBar"></input>
                <div className="col-span-1" onClick={contactSearch}>
                    <FaSearch />
                </div>
            </div>
            <div className="my-2">
                {contacts?.map((contact, i) => <div className="flex mb-2 border-b border-slate-900" key={i + " contact"} onClick={async()=>{
                    setContactId(contact.id)
                    await socket.emit("join room", contact.id)
                }}>
                    <div className="">
                        <Avatar name={contact.name}/>
                    </div>
                    <div>
                        <div className="text-white flex items-center mx-2">
                            {contact.name}
                        </div>
                        <div className="text-slate-400 text-xs flex justify-center items-center mx-2">
                            {contact.lastMessage}
                        </div>
                    </div>    
                </div>)}
            </div>
        </div>
    )
}

function contactSearch() {
    alert("contactSearch")
}