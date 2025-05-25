import { atom } from "jotai"

type Contact = {
    id: number,
    name: string,
    lastmessage?: string,
    lastmessagetime: Date
}

type Message = {
    createdAt: Date,
    sender: number,
    reciever: number,
    content: string,
}

type User = {
    name: string,
    id: number
}

export const tokenAtom = atom(window.localStorage.getItem("token"))

export const userAtom = atom<User>()

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

export const recieverAtom = atom<User>()

export const contactAtom = atom<Contact[]>([{
    id: 1,
    name: "abc",
    lastmessage: "bye",
    lastmessagetime: new Date()
}, {
    id: 2,
    name: "def",
    lastmessage: "gn",
    lastmessagetime: new Date()
}, {
    id: 3,
    name: "ghi",
    lastmessage: "see yeah",
    lastmessagetime: new Date()
}])

export const sortedContactAtom = atom(
    (get) => {
        return get(contactAtom).sort((a, b) => {
            return a.lastmessagetime.getTime() - b.lastmessagetime.getTime()
        }).reverse()
    }
)

export const searchAtom = atom<User[]>([])