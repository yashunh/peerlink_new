import { FaSearch } from "react-icons/fa";
import Avatar from "./Avatar";
import { useAtom } from "jotai";
import { filterContactAtom } from "../store/atom/atoms";
type Contact = {
    id: number,
    name: string,
    lastMessage?: string,
    lastMessageTime: Date
}
export default function Contact() {
    const [contacts] = useAtom<Contact[]>(filterContactAtom)
    return (
        <div className="m-1">
            <div className="grid grid-cols-12 text-white border rounded-2xl border-slate-800 justify-center items-center px-2">
                <input className="p-2 w-full col-span-11 outline-none" placeholder="search" type="text" id="searchBar"></input>
                <div className="col-span-1" onClick={search}>
                    <FaSearch />
                </div>
            </div>
            <div className="my-2">
                {contacts?.map((contact, i) => <div className="flex mb-2 border-b border-slate-900" key={i + " contact"}>
                    <div className="">
                        <Avatar name={contact.name}/>
                    </div>
                    <div className="text-white flex justify-center items-center mx-2">
                        {contact.name}
                    </div>
                </div>)}
            </div>
        </div>
    )
}

function search() {
    alert("search")
}