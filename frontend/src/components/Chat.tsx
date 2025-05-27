import { useAtom } from "jotai"
import {  receiverAtom, sendMessageAtom, sortedMessageAtom, userAtom } from "../store/atom/atoms"
import Avatar from "./Avatar"
import { IoSend } from "react-icons/io5"
import { socket } from "../pages/Homepage"
import { useRef } from "react"

export default function Chat() {
    // socket.emit("get message with user",)
    const [messages] = useAtom(sortedMessageAtom)
    const [user] = useAtom(userAtom)
    const [receiver] = useAtom(receiverAtom)
    const [sendMessage, setSendMessage] = useAtom(sendMessageAtom)
    const inputRef = useRef<HTMLInputElement>(null)
    return (
        <div className="h-[calc(100vh-83px)]">
            {receiver ? <div>
                <div className="px-2 py-1 items-center border-b border-slate-800 flex">
                    <Avatar name={receiver?.username} />
                    <div className="px-2 text-white text-lg">
                        {receiver?.username}
                    </div>
                </div>
                <div className="relative flex flex-col-reverse right-0 bottom-0 w-[calc(100vw-275px)] h-[calc(100vh-130px)] overflow-y-auto overflow-x-hidden">
                    <div className="px-50 pb-2">
                        <div className="flex text-white border rounded-4xl border-slate-800 justify-between items-center p-2 w-full">
                            <input className="p-2 outline-none w-full" placeholder="send message" type="text" id="messageBar" ref={inputRef} onChange={(e) => setSendMessage({
                                content: e.target.value,
                                receiver: receiver?.id || 0
                            })}></input>
                            <div className="m-2 w-3" onClick={() => {
                                socket?.emit("send message", sendMessage?.receiver, sendMessage?.content)
                                console.log("click")
                                inputRef.current ? inputRef.current.value = '' : ""
                            }}>
                                <IoSend />
                            </div>
                        </div>
                    </div>
                    <div>
                        {receiver && user ? messages?.map((message, i) => <div className="text-xl pt-2 text-white" key={i + "th message"}>
                            {(message.sender == user?.id && message.receiver == receiver?.id) ? <div className="flex justify-end">
                                <div className="p-2 border border-r-0 border-t-0 border-slate-700 w-fit rounded-xl">{message.content}</div>
                            </div> : (message.sender == receiver?.id && message.receiver == user?.id) ? <div className="border border-l-0 border-t-0 border-slate-700 w-fit p-2 rounded-xl">{message.content}</div> : <div />
                            }
                        </div>
                        ) : <div/>}
                    </div>
                </div>
            </div> : <div>
                <div className="flex justify-center items-center text-slate-500 text-4xl h-[calc(100vh-83px)]">
                    <div>
                        Select A Contact To Chat
                    </div>
                </div>
            </div>}
        </div>
    )
}