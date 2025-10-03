import {useChatsByUser} from "@/hooks/useChat.ts";
import {useAppSelector} from "@/stores/store.ts";
import {Center, Spinner, VStack, Clipboard, Button} from "@chakra-ui/react";
import SideBarPlate from "@/features/side-bar/components/SideBarPlate.tsx";
import CreateOrJoinChatPlate from "@/features/side-bar/components/CreateOrJoinChatPlate.tsx";
import {useEffect, useState} from "react";


export default function SideBar() {
    useEffect(()=>{
        console.log("rendered")
    }, [])
    const {userId } = useAppSelector(state => state.auth);
    const [requestRerender , setRequestRerender] = useState(false);
    const { data: chats, isLoading, error } = useChatsByUser(userId);
    if (isLoading) return (
        <Center className="border-r-2 pr-1 h-full">
            <VStack colorPalette="teal">
                <Spinner color="colorPalette.600" />
                <p>Loading...</p>
            </VStack>
        </Center>
    );
    if (error) return (
        <Center className="border-r-2 pr-1 h-full flex-col gap-5 text-wrap">
            <p>No chats to load</p>
            {userId==null ? <p>log in to see your chats</p> :
                <Clipboard.Root value={" " + error.message}>
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
        <div className="border-r-2 pr-1 h-full">
            <CreateOrJoinChatPlate requestRerender={()=>{setRequestRerender(!requestRerender)}}/>
            {chats?.map((chat) => (
                <SideBarPlate key={chat.id} chat={chat}  />
            ))}
        </div>
    );
}