import { atom } from "recoil";

export const tokenAtom = atom({
    key: "tokenAtom",
    default: window.localStorage.getItem("token")
})

export const messageAtom = atom({
    key: "messageAtom",
    default: []
})

export const contactAtom = atom({
    key: "contactAtom",
    default: ["abc","def","ghi"]
})