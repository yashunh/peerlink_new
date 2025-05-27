import { atom } from "jotai"

type Contact = {
    id: number,
    username: string,
    lastmessage?: string,
    lastmessagetime: Date
}

type Message = {
    date: Date,
    sender: number,
    receiver: number,
    content: string,
}

type User = {
    username: string,
    id: number
}

export const tokenAtom = atom(window.localStorage.getItem("token"))

export const userAtom = atom<User>()

export const sendMessageAtom = atom<{
    receiver: number,
    content: string
}>()

export const messageAtom = atom<Message[]>([])

export const sortedMessageAtom = atom(
    (get) => {
        return get(messageAtom).sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
    }
)

export const receiverAtom = atom<User>()

export const contactAtom = atom<Contact[]>([])

export const sortedContactAtom = atom((get) => {
  const contacts = [...get(contactAtom)];
  return contacts
    .sort((a, b) => new Date(b.lastmessagetime).getTime() - new Date(a.lastmessagetime).getTime());
});

export const searchAtom = atom<User[]>([])