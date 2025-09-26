import {useInfiniteQuery, useMutation, useQuery} from "@tanstack/react-query";
import { api } from "../lib/api";
import type {Chat} from "@/types/Chat.ts";
import type {Message} from "@/types/Message.ts";

export function useChatsByUser(userId: number) {
    return useQuery<Chat[]>({
        queryKey: ["chats", userId],
        queryFn: async () => {
            const res = await api.get(`/chat/by-user/${userId}`);
            return res.data;
        },
        staleTime: 1000 * 60,
        retry: 1,
    });
}

export function useChatById(chatId: number) {
    return useQuery<Chat>({
        queryKey: ["chat", chatId],
        queryFn: async () => {
            const res = await api.get(`/chat/${chatId}`);
            return res.data;
        },
        staleTime: 1000 * 60,
        retry: 1,
    });
}

export function useInfiniteMessages(chatId: number, pageSize = 40) {
    return useInfiniteQuery<Message[], Error>({
        queryKey: ["chatMessages", chatId],
        queryFn: async ({ pageParam }) => {
            const params: Record<string, number> = { size: pageSize };
            if (pageParam) {
                // pageParam holds the last fetched messageId for pagination
                if (typeof pageParam === "number") {
                    params.beforeMessageId = pageParam;
                }
            }
            const res = await api.get(`/chat/${chatId}/messages`, { params });
            return res.data;
        },
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => {
            // use the smallest ID from the last batch as the cursor
            if (!lastPage || lastPage.length === 0) return undefined;
            return lastPage[lastPage.length - 1].id;
        },
    });
}

export function useCreateChat(userIds: number[], options: {title?: string}) {
    return useMutation<Response>({
        mutationFn: async () => {
            const params: Record<string, string|number[]> = {};
            params.userIds = userIds;
            if (options?.title) params.title = options.title;

            const res = await api.post(`/chat/create`, { params });
            return res.data;
        },
    });
}