import type {Chat} from "@/types/Chat.ts";
import type {User} from "@/types/User.ts";

export type Message = {
    id: number;
    sender: User;
    receiver: User;
    chat: Chat;
    timestamp: Date;
    message: string;
}