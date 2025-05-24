import { useAtom } from "jotai"
import { recieverAtom, sendMessageAtom, sortedMessageAtom, userAtom } from "../store/atom/atoms"
import Avatar from "./Avatar"
import { IoSend } from "react-icons/io5"

export default function Chat(socket: any) {
    // socket.emit("get message with user",)
    const [messages] = useAtom(sortedMessageAtom)
    const [user] = useAtom(userAtom)
    const [reciever] = useAtom(recieverAtom)
    const [sendMessage, setSendMessage] = useAtom(sendMessageAtom)
    return (
        <div className="h-[calc(100vh-83px)]">
            <div className="px-2 py-1 items-center border-b border-slate-800 flex">
                <Avatar name={reciever?.name} />
                <div className="px-2 text-white text-lg">
                    {reciever?.name}
                </div>
            </div>
            <div className="relative flex flex-col-reverse right-0 bottom-0 w-[calc(100vw-275px)] h-[calc(100vh-130px)] overflow-y-auto overflow-x-hidden">
                <div className="px-50 pb-2">
                    <div className="flex text-white border rounded-4xl border-slate-800 justify-between items-center p-2 w-full">
                        <input className="p-2 outline-none w-full" placeholder="send message" type="text" id="messageBar" onChange={(e)=>setSendMessage({
                            content:e.target.value,
                            receiverId: reciever?.id || 0
                        })}></input>
                        <div className="m-2 w-3" onClick={()=>{
                            socket.emit("send message", sendMessage.receiverId,sendMessage.content)
                        }}>
                            <IoSend />
                        </div>
                    </div>
                </div>
                <div>
                    {messages.map((message) => <div className="text-xl pt-2 text-white ">
                        {(message.sender == user?.id && message.reciever == reciever?.id) ? <div className="flex justify-end">
                            <div className="p-2 border border-r-0 border-t-0 border-slate-700 w-fit rounded-xl">{message.content}</div>
                        </div> : (message.sender == reciever?.id && message.reciever == user?.id) ? <div className="border border-l-0 border-t-0 border-slate-700 w-fit p-2 rounded-xl">{message.content}</div> : <div />
                        }
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}