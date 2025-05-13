import Avatar from "./Avatar";

export default function Navbar() {
    return (
        <div>
            <div className="flex justify-between items-center border rounded-md px-10 py-4 border-slate-800">
                <div className="text-3xl font-bold text-slate-50">
                    PeerLink
                </div>
                <div>
                    <Avatar />
                </div>
            </div>
        </div>
    );
}
