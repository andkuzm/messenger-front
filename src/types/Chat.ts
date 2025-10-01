import type {Message} from "@/types/Message.ts";

type User = {
    id: number;
    username: string;
}

export type Chat = {
    id: number;
    users: User[];
    messageIDs: Message[];
    title: string;
};