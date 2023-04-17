import { ReceivedMessage } from "@/helpers/events";
import { atom } from "jotai";

export const messages = atom<ReceivedMessage[]>([])