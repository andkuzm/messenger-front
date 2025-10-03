import {useParams} from "react-router-dom";
import EmptyChatField from "./EmptyChatField.tsx";
import {useInfiniteMessages} from "@/hooks/useChat.ts";
import { useVirtualizer } from "@tanstack/react-virtual"
import {useEffect, useRef} from "react";
import { ScrollArea } from "@chakra-ui/react";
import ChatSendMessagePlate from "@/features/chat/components/ChatSendMessagePlate.tsx";


export default function Chat() {
    const chatId = parseInt(useParams()['chatId'] as string);
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteMessages(chatId);

    const messages = data?.pages.flatMap((p) => p) ?? [];

    const virtualizer = useVirtualizer({
        count: messages.length,
        getScrollElement: () => scrollRef.current,
        estimateSize: () => 80,
        overscan: 10,
    });

    useEffect(() => {
        const [first] = virtualizer.getVirtualItems();
        if (first && first.index === 0 && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage, virtualizer]);

    if (!chatId) {
        return <EmptyChatField />
    }
    return (
        <div className="h-full">
            <ScrollArea.Root>
                <ScrollArea.Viewport ref={scrollRef}>
                    <div>
                        {virtualizer.getVirtualItems().map((vi) => {
                            const msg = messages[vi.index];
                            return (
                                <div>
                                    <div>
                                        <strong>{msg.sender.username}</strong>: {msg.message}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </ScrollArea.Viewport>

                <ChatSendMessagePlate chatId={chatId}/>
                <ScrollArea.Scrollbar />
            </ScrollArea.Root>
        </div>
    );
}