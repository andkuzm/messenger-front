import {useQuery} from "@tanstack/react-query";
import { api } from "../lib/api";

export function useChatsByUser(userId: number) {
    return useQuery({
        queryKey: ["chats", userId],
        queryFn: async () => {
            const res = await api.get(`/by-user/${userId}`);
            return res.data;
        },
        staleTime: 1000 * 60,
        retry: 1,
    });
}