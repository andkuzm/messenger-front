import {useChatsByUser} from "@/hooks/useChat.ts";
import {useAppSelector} from "@/stores/store.ts";
import {Center, Spinner, VStack, Clipboard, Button, ScrollArea} from "@chakra-ui/react";
import SideBarPlate from "@/features/side-bar/components/SideBarPlate.tsx";
import CreateOrJoinChatPlate from "@/features/side-bar/components/CreateOrJoinChatPlate.tsx";


export default function SideBar() {
    const {userId } = useAppSelector(state => state.auth);
    const { data: chats, isLoading, error, refetch } = useChatsByUser(userId);
    if (isLoading) return (
        <Center className="border-r-2 pr-1 h-full">
            <VStack colorPalette="teal">
                <Spinner color="colorPalette.600" />
                <p>Loading...</p>
            </VStack>
        </Center>
    );
    if (error||userId==null) return (
        <Center className="border-r-2 pr-1 h-full flex-col gap-5 text-wrap">
            <p>No chats to load</p>
            {userId==null ? <p>log in to see your chats</p> :
                <Clipboard.Root value={" " + error?.message}>
                    <Clipboard.Trigger asChild>
                        <Button variant="surface" size="sm">
                            <Clipboard.Indicator/>
                            <Clipboard.CopyText/>
                        </Button>
                    </Clipboard.Trigger>
                    <Clipboard.ValueText/>
                </Clipboard.Root>
            }
        </Center>
    );
    return (
        <div className="border-r-2 pr-5 h-11/12 flex flex-col gap-3 max-h-99vh">
            <CreateOrJoinChatPlate requestChatRefetch={refetch}/>
            <ScrollArea.Root height="80vh">
                <ScrollArea.Viewport
                    css={{
                        "--scroll-shadow-size": "1rem",
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
                    <ScrollArea.Content spaceY="4" textStyle="sm">
                        {chats?.map((chat) => (
                            <SideBarPlate key={chat.id} chat={chat}  />
                        ))}
                    </ScrollArea.Content>
                </ScrollArea.Viewport>
                <ScrollArea.Corner />
            </ScrollArea.Root>
        </div>
    );
}