import {useQuery} from "@tanstack/react-query";
import { api } from "../lib/api";
import type {Chat} from "@/types/Chat.ts";

export function useChatsByUser(userId: number) {
    return useQuery<Chat[]>({
        queryKey: ["chats", userId],
        queryFn: async () => {
            const res = await api.get(`/by-user/${userId}`);
            return res.data;
        },
        staleTime: 1000 * 60,
        retry: 1,
    });
}