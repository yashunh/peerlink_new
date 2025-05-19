import { atom } from "jotai"

type Contact = {
    id: number,
    name: string,
    lastMessage?: string,
    lastMessageTime: Date
}

export const tokenAtom = atom(window.localStorage.getItem("token"))

export const messageAtom = atom([])

export const contactAtom = atom<Contact[]>([{
    id: 1,
    name: "abc",
    lastMessage: "bye",
    lastMessageTime: new Date()
},{
    id: 2,
    name: "def",
    lastMessage: "gn",
    lastMessageTime: new Date()
},{
    id: 3,
    name: "ghi",
    lastMessage: "see yeah",
    lastMessageTime: new Date()
}])

export const filterContactAtom = atom(
    (get) => {
        return get(contactAtom).sort((a,b)=>{
            return a.lastMessageTime.getTime() - b.lastMessageTime.getTime()
        }).reverse()
    }
)