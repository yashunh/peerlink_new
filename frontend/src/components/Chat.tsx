import { useAtom } from "jotai"
import { connectionAtom, sortedMessageAtom, userAtom } from "../store/atom/atoms"
import Avatar from "./Avatar"
import { IoSend } from "react-icons/io5"

export default function Chat(socket: any) {
    // socket.emit("get message with user",)
    const [messages] = useAtom(sortedMessageAtom)
    const [user] = useAtom(userAtom)
    const [connection] = useAtom(connectionAtom)
    return (
        <div>
            <div className="px-2 py-1 items-center border-b border-slate-800 flex">
                <Avatar name={connection.name} />
                <div className="px-2 text-white text-lg">
                    {connection.name}
                </div>
            </div>
            <div className="absolute right-0 bottom-0 w-[calc(100vw-270px)]">
                <div>
                    {messages.map((message) => <div className="text-xl pt-2 text-white ">
                        {(message.sender == user.id && message.reciever == connection.id) ? <div className="flex justify-end">
                            <div className="p-2 border border-r-0 border-t-0 border-slate-700 w-fit rounded-xl">{message.content}</div>
                        </div> : (message.sender == connection.id && message.reciever == user.id) ? <div className="border border-l-0 border-t-0 border-slate-700 w-fit p-2 rounded-xl">{message.content}</div> : <div />
                        }
                    </div>
                    )}
                </div>
                <div className="px-50 pb-2">
                    <div className="flex text-white border rounded-4xl border-slate-800 justify-between items-center p-2 w-full">
                        <input className="p-2 outline-none w-full" placeholder="send message" type="text" id="messageBar"></input>
                        <div className="m-2 w-3" onClick={send}>
                            <IoSend />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function send() {
    window.alert("send")
}