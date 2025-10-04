import type {User} from "@/types/User.ts";

export type Message = {
    id?: number;
    sender: User;
    receiver: User;
    chatId?: number;
    timestamp?: Date;
    message: string;
}