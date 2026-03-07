import { useParams } from "react-router-dom";
import EmptyChatField from "./EmptyChatField.tsx";
import { useChatById, useInfiniteMessages } from "@/hooks/useChat.ts";
import { Virtuoso, type VirtuosoHandle } from "react-virtuoso";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Center, IconButton, Spinner } from "@chakra-ui/react";
import ChatSendMessagePlate from "@/features/chat/components/ChatSendMessagePlate.tsx";
import Message from "@/features/message/components/Message.tsx";
import { useAppSelector } from "@/stores/store.ts";
import { LuArrowDown } from "react-icons/lu";
import { useReduceNotifications } from "@/hooks/useNotification.ts";

const START_INDEX = 100_000;

export default function Chat() {
    const chatId = parseInt(useParams()["chatId"] as string);
    const { userId } = useAppSelector((state) => state.auth);
    const { data: chat, isLoading, error } = useChatById(chatId);
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
        useInfiniteMessages(chatId);
    const reduceNotifications = useReduceNotifications();

    useEffect(() => {
        if (chatId) {
            reduceNotifications.mutate(chatId);
        }
    }, [chatId]);

    const messages = useMemo(
        () => data?.pages.flatMap((p) => p).reverse() ?? [],
        [data],
    );

    const [firstItemIndex, setFirstItemIndex] = useState(START_INDEX);
    const prevCountRef = useRef(0);

    useEffect(() => {
        const added = messages.length - prevCountRef.current;
        // Only anchor scroll when prepending older messages, not on initial load
        if (added > 0 && prevCountRef.current > 0) {
            setFirstItemIndex((prev) => prev - added);
        }
        prevCountRef.current = messages.length;
    }, [messages.length]);

    const virtuosoRef = useRef<VirtuosoHandle>(null);
    const [atBottom, setAtBottom] = useState(true);

    const scrollToBottom = useCallback(() => {
        virtuosoRef.current?.scrollToIndex({
            index: "LAST",
            behavior: "smooth",
        });
    }, []);

    const handleStartReached = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    if (!chatId) {
        return <EmptyChatField />;
    }

    if (error) {
        return <Center>{error.message}</Center>;
    }

    if (isLoading || !data || !chat) {
        return (
            <Center>
                <Spinner />
                <p>Chat is being loaded</p>
            </Center>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <p>
                Other users that can read this chat:
                {chat.users.map((user) => {
                    if (user.id == userId) return "";
                    return " " + user.username;
                })}
            </p>
            <div style={{ flex: "1 1 0", minHeight: 0, position: "relative" }}>
                <Virtuoso
                    ref={virtuosoRef}
                    style={{ height: "100%" }}
                    firstItemIndex={firstItemIndex}
                    initialTopMostItemIndex={messages.length - 1}
                    data={messages}
                    followOutput="smooth"
                    startReached={handleStartReached}
                    atBottomStateChange={setAtBottom}
                    itemContent={(_, msg) => <Message msg={msg} />}
                />
                {!atBottom && (
                    <Box position="absolute" bottom="4" right="4">
                        <IconButton
                            color="#272830"
                            size="sm"
                            onClick={scrollToBottom}
                            variant="solid"
                        >
                            <LuArrowDown />
                        </IconButton>
                    </Box>
                )}
            </div>
            <ChatSendMessagePlate
                chat={chat}
                refetch={refetch}
                stickyScroll={scrollToBottom}
            />
        </div>
    );
}
