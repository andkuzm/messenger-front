import { useQuery, useMutation } from "@tanstack/react-query";
import {api} from "@/lib/api.ts";
import type {Message} from "@/types/Message.ts";

// GET /message/{messageId}
export function useGetMessage(messageId: number) {
    return useQuery({
        queryKey: ["message", messageId],
        queryFn: async () => {
            const res = await api.get(`/message/${messageId}`);
            return res.data;
        },
        retry: 1,
    });
}

// PUT /message/change/{messageId}
export function useChangeMessage() {
    return useMutation({
        mutationFn: async ({ messageId, content }: { messageId: number; content: string }) => {
            const res = await api.put(`/message/change/${messageId}`, content, {
                headers: { "Content-Type": "text/plain" },
            });
            return res.data;
        },
    });
}

// POST /message/send
export function useSendMessage() {
    return useMutation({
        mutationFn: async (message: Message) => {
            const res = await api.post(`/message/send`, message);
            return res.data;
        },
    });
}
