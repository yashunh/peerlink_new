import { FaSearch } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { contactAtom } from "../store/atom/atoms";
import Avatar from "./Avatar";

export default function Contact() {
    const contacts = useRecoilValue(contactAtom)
    return (
        <div className="m-1">
            <div className="grid grid-cols-12 text-white border rounded-2xl border-slate-800 justify-center items-center px-2">
                <input className="p-2 w-full col-span-11 outline-none" placeholder="search" type="text" id="searchBar"></input>
                <div className="col-span-1" onClick={search}>
                    <FaSearch />
                </div>
            </div>
            <div>
                {contacts.map((contact) => <div>
                    <Avatar name={contact}/>
                    <div>
                        {contact}
                        </div>
                </div>)}
            </div>
        </div>
    )
}

function search() {
    alert("search")
}