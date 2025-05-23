import { FaSearch } from "react-icons/fa";
import Avatar from "./Avatar";
import { useAtom } from "jotai";
import { recieverAtom, sortedContactAtom } from "../store/atom/atoms";
type Contact = {
    id: number,
    name: string,
    lastMessage?: string,
    lastMessageTime: Date
}
export default function Contact(socket: any) {
    const [contacts] = useAtom<Contact[]>(sortedContactAtom)
    const [, setReciever] = useAtom(recieverAtom)
    return (
        <div className="m-1 border-r border-slate-800 h-[calc(100vh-83px)] overflow-y-auto overflow-x-hidden">
            <div className="grid grid-cols-12 text-white border rounded-2xl border-slate-800 justify-enter items-center px-2">
                <input className="p-2 w-full col-span-11 outline-none" placeholder="search" type="text" id="searchBar"></input>
                <div className="col-span-1" onClick={contactSearch}>
                    <FaSearch />
                </div>
            </div>
            <div className="my-2">
                {contacts?.map((contact) => <div className="flex mb-2 border-b border-slate-900" key={contact.id} onClick={async () => {
                    setReciever({
                        name: contact.name,
                        id: contact.id
                    })
                    await socket.emit("join room", contact.id)
                }}>
                    <div className="">
                        <Avatar name={contact.name} />
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