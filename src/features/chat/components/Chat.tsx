import {useParams} from "react-router-dom";
import EmptyChatField from "./EmptyChatField.tsx";
import {useChatById, useInfiniteMessages} from "@/hooks/useChat.ts";
import {useVirtualizer, type VirtualItem} from "@tanstack/react-virtual"
import {useCallback, useEffect, useMemo} from "react";
import {Box, Center, IconButton, ScrollArea, Spinner} from "@chakra-ui/react";
import ChatSendMessagePlate from "@/features/chat/components/ChatSendMessagePlate.tsx";
import { useStickToBottom } from "use-stick-to-bottom"
import Message from "@/features/message/components/Message.tsx";
import {useAppSelector} from "@/stores/store.ts";
import {LuArrowDown} from "react-icons/lu";


export default function Chat() {
    const chatId = parseInt(useParams()['chatId'] as string);
    const {userId} = useAppSelector((state) => state.auth);
    const { data:chat, isLoading, error } = useChatById(chatId);
    const sticky = useStickToBottom()
    // const scrollRef = useRef<HTMLDivElement | null>(null)
    const { data, fetchNextPage, error: error_infinite, hasNextPage, isFetchingNextPage, refetch } =
        useInfiniteMessages(chatId);

    const messages = data?.pages.flatMap((p) => p) ?? [];

    const virtualizer = useVirtualizer({
        count: messages.length,
        getScrollElement: () => sticky.scrollRef.current,
        estimateSize: () => 44,
        overscan: 3,
    });

    const contentProps = useMemo(
        (): React.ComponentProps<"div"> => ({
            style: {
                height: `${virtualizer.getTotalSize()}px`,
                width: "full",
                position: "relative",
            },
        }),
        [virtualizer],
    )


    const getItemProps = useCallback(
        (item: VirtualItem): React.ComponentProps<"div"> => ({
            style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                paddingBottom: 4,
                paddingTop: 4,
                height: `${item.size}px`,
                transform: `translateY(${item.start}px)`,
            },
        }),
        [],
    )

    useEffect(() => {
        const [first] = virtualizer.getVirtualItems();
        if (first && first.index === 0 && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage, virtualizer]);

    if (!chatId) {
        return <EmptyChatField />
    }

    if (error) {
        return (
            <Center>
                {error.message}
                {error_infinite?.message}
            </Center>
        )
    }
    if(isLoading||!data) {
        return (
            <Center>
                <Spinner />
                <p>Chat is being loaded</p>
            </Center>
        )
    }

    return (
        <div className="h-full">
            <p>Other users that can read this chat:{chat.users.map(user=>{
                if(user.id==userId) {
                    return "";
                }
                return " "+user.username})
            }</p>
            <ScrollArea.Root maxHeight="80vh">
                <ScrollArea.Viewport ref={sticky.scrollRef}
                    css={{
                        "--scroll-shadow-size": "2rem",
                        maskImage:
                            "linear-gradient(#000,#000,transparent 0,#000 var(--scroll-shadow-size),#000 calc(100% - var(--scroll-shadow-size)),transparent)",
                        "&[data-at-top]": {
                            maskImage:
                                "linear-gradient(180deg,#000 calc(100% - var(--scroll-shadow-size)),transparent)",
                        },
                        "&[data-at-bottom]": {
                            maskImage:
                                "linear-gradient(0deg,#000 calc(100% - var(--scroll-shadow-size)),transparent)",
                        },
                    }}
                >
                    <ScrollArea.Content {...contentProps} ref={sticky.contentRef}>
                        <div>
                            {virtualizer.getVirtualItems().map((vi) => {
                                const msg = messages[messages.length-vi.index-1];
                                return (
                                    <div key={vi.key} {...getItemProps(vi)}>
                                        <Message msg={msg}/>
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollArea.Content>
                </ScrollArea.Viewport>
                {!sticky.isAtBottom && (
                    <Box position="absolute" top="13" right="4">
                        <IconButton
                            color="#272830"
                            size="sm"
                            onClick={() => {
                                sticky.scrollToBottom()
                            }}
                            variant="solid"
                        >
                            <LuArrowDown/>
                        </IconButton>
                    </Box>
                )}
                <ChatSendMessagePlate chat={chat} refetch={refetch} stickyScroll={()=>{sticky.scrollToBottom()}}/>
            </ScrollArea.Root>
        </div>
    );
}