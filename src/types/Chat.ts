import type {Message} from "@/types/Message.ts";

class Users {
}

export type Chat = {
    id: number;
    users: Users[];
    messageIDs: Message[];
    title: string;
};