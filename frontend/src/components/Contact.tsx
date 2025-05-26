import Avatar from "./Avatar";
import { useAtom } from "jotai";
import { receiverAtom, sortedContactAtom } from "../store/atom/atoms";
import { socket } from "../pages/Homepage";

type Contact = {
    id: number,
    username: string,
    lastmessage?: string,
    lastmessagetime: Date
}

export default function Contact() {
    const [contacts] = useAtom<Contact[]>(sortedContactAtom)
    const [, setReceiver] = useAtom(receiverAtom)
    return (
        <div className="m-1 border-r border-slate-800 h-[calc(100vh-83px)] overflow-y-auto overflow-x-hidden">
            {/* <div className="grid grid-cols-12 text-white border rounded-2xl border-slate-800 justify-enter items-center px-2">
                <input className="p-2 w-full col-span-11 outline-none" placeholder="search" type="text" id="searchBar"></input>
                <div className="col-span-1" onClick={contactSearch}>
                    <FaSearch />
                </div>
            </div> */}
            <div className="my-2">
                {contacts?.map((contact) => <div className="flex mb-2 border-b border-slate-900" key={contact.id} onClick={async () => {
                    setReceiver({
                        username: contact.username,
                        id: contact.id
                    })
                    // socket?.emit("join room", receiver?.id)
                    socket?.emit("get message with user", contact.id)
                }}>
                    <div className="">
                        <Avatar name={contact.username} />
                    </div>
                    <div>
                        <div className="text-white flex items-center mx-2">
                            {contact.username}
                        </div>
                        <div className="text-slate-400 text-xs flex justify-center items-center mx-2">
                            {contact.lastmessage}
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    )
}