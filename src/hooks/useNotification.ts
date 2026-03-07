import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";

export function useGetNotifications(chatId: number) {
    return useQuery<number>({
        queryKey: ["notifications", chatId],
        queryFn: async () => {
            const res = await api.get(`/notification/${chatId}`);
            return res.data;
        },
        staleTime: 1000 * 10,
        refetchInterval: 1000 * 10,
        retry: 1,
    });
}

export function useReduceNotifications() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (chatId: number) => {
            await api.put(`/notification/${chatId}/reduce`);
        },
        onSuccess: (_data, chatId) => {
            queryClient.invalidateQueries({ queryKey: ["notifications", chatId] });
        },
    });
}
