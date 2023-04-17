import { atom } from "jotai";

export const connAtom = atom<WebSocket | null>(null)