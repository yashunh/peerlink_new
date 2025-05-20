import { FaSearch } from "react-icons/fa";
import Avatar from "./Avatar";

export default function Navbar() {
    return (
        <div>
            <div className="flex justify-between items-center border rounded-md px-10 py-4 border-slate-800">
                <div className="text-3xl font-bold text-slate-50">
                    PeerLink
                </div>
                <div className="grid grid-cols-12 text-white border rounded-2xl border-slate-800 justify-center items-center px-2 w-lg">
                    <input className="p-2 w-full col-span-11 outline-none text-center" placeholder="search new contacts" type="text" id="searchBar"></input>
                    <div className="col-span-1 w-3" onClick={search}>
                        <FaSearch />
                    </div>
                </div>
                <div>
                    <Avatar />
                </div>
            </div>
        </div>
    );
}

function search(){
    window.alert("search")
}