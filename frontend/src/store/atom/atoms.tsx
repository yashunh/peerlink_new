import { atom } from "jotai"

type Contact = {
    id: number,
    name: string,
    lastMessage?: string,
    lastMessageTime: Date
}

type Message = {
    createdAt: Date,
    sender: number,
    reciever: number,
    content: string,
}

export const tokenAtom = atom(window.localStorage.getItem("token"))

export const userAtom = atom({
    id: 4,
    name: "xyz"
})

export const sendMessageAtom = atom({
    receiverId: 0,
    content: ''
})

export const messageAtom = atom<Message[]>([{
    createdAt: new Date(),
    sender: 4,
    reciever: 2,
    content: "hi there",
}, {
    createdAt: new Date(),
    sender: 2,
    reciever: 4,
    content: "hello",
}, {
    createdAt: new Date(),
    sender: 4,
    reciever: 2,
    content: "how are you",
}, {
    createdAt: new Date(),
    sender: 3,
    reciever: 4,
    content: "hi",
}, {
    createdAt: new Date(),
    sender: 4,
    reciever: 1,
    content: "hlo",
}])

export const sortedMessageAtom = atom(
    (get) => {
        return get(messageAtom).sort((a, b) => {
            return a.createdAt.getTime() - b.createdAt.getTime()
        })
    }
)

export const recieverAtom = atom({
    id: 2,
    name: "ghi"
})

export const contactAtom = atom<Contact[]>([{
    id: 1,
    name: "abc",
    lastMessage: "bye",
    lastMessageTime: new Date()
}, {
    id: 2,
    name: "def",
    lastMessage: "gn",
    lastMessageTime: new Date()
}, {
    id: 3,
    name: "ghi",
    lastMessage: "see yeah",
    lastMessageTime: new Date()
}])

export const sortedContactAtom = atom(
    (get) => {
        return get(contactAtom).sort((a, b) => {
            return a.lastMessageTime.getTime() - b.lastMessageTime.getTime()
        }).reverse()
    }
)