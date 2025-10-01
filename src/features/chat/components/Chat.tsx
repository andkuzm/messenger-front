import {useParams} from "react-router-dom";
import EmptyChatField from "./EmptyChatField.tsx";
import {useInfiniteMessages} from "@/hooks/useChat.ts";
import { useVirtualizer } from "@tanstack/react-virtual"
import {useEffect, useRef} from "react";
import { ScrollArea } from "@chakra-ui/react";


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
        <ScrollArea.Root height="100%" maxWidth="full">
            <ScrollArea.Viewport ref={scrollRef}>
                <div
                    style={{
                        height: `${virtualizer.getTotalSize()}px`,
                        width: "100%",
                        position: "relative",
                    }}
                >
                    {virtualizer.getVirtualItems().map((vi) => {
                        const msg = messages[vi.index];
                        return (
                            <div
                                key={msg.id}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: `${vi.size}px`,
                                    transform: `translateY(${vi.start}px)`,
                                }}
                            >
                                <div className="p-2">
                                    <strong>{msg.sender.username}</strong>: {msg.message}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar />
        </ScrollArea.Root>
    );
}