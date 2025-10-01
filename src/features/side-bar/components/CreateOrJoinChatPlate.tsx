import {useState} from "react";
import { Button, Input, Popover, Portal, Text } from "@chakra-ui/react"
import {useCreateChat, useJoinChat} from "@/hooks/useChat.ts";
import {useAppSelector} from "@/stores/store.ts";

export default function CreateOrJoinChatPlate() {
    const [chatId, setChatId] = useState(-1);
    const [userNames, setUserNames] = useState([""]);
    const joinChat = useJoinChat();
    const createChat = useCreateChat();
    const { userId } = useAppSelector(state => state.auth);
    async function handleJoin() {
        if(chatId!==-1 && userId!==null) {
            const joinResp = await joinChat.mutateAsync({chatId, userId});
            console.log("join attempt response: "+joinResp.data)
        }
    }
    async function handleCreation() {
        if(userNames[0]!="") {
            const createResp = await createChat.mutateAsync({userNames: userNames, options: undefined});
            console.log("create attempt response: "+createResp.data)
        }
    }
    return (
        <div className="flex flex-row gap-10">
            <Popover.Root>
                <Popover.Trigger asChild>
                    <Button size="sm" variant="outline">
                        Join Chat
                    </Button>
                </Popover.Trigger>
                <Portal>
                    <Popover.Positioner>
                        <Popover.Content>
                            <Popover.Arrow />
                            <Popover.Body>
                                <Popover.Title fontWeight="medium">Chat Id Request</Popover.Title>
                                <Text my="4">
                                    Write id of the chat you wish to join.
                                </Text>
                                <Input placeholder="Chat Id" size="sm"
                                       value={chatId}
                                       onChange={(e) => setChatId(parseInt(e.target.value))}/>
                                <Button size="sm" variant="outline" onClick={handleJoin}>Join</Button>
                            </Popover.Body>
                        </Popover.Content>
                    </Popover.Positioner>
                </Portal>
            </Popover.Root>

            <Popover.Root>
                <Popover.Trigger asChild>
                    <Button size="sm" variant="outline">
                        Create Chat
                    </Button>
                </Popover.Trigger>
                <Portal>
                    <Popover.Positioner>
                        <Popover.Content>
                            <Popover.Arrow />
                            <Popover.Body>
                                <Popover.Title fontWeight="medium">Chat creation</Popover.Title>
                                <Text my="4">
                                    write a username of the person you wish to write to
                                </Text>
                                <Input placeholder="username" size="sm"
                                       value={userNames}
                                       onChange={(e) => setUserNames([e.target.value])}/>
                                <Button size="sm" variant="outline" onClick={handleCreation}>Write</Button>
                            </Popover.Body>
                        </Popover.Content>
                    </Popover.Positioner>
                </Portal>
            </Popover.Root>
        </div>
    )
}