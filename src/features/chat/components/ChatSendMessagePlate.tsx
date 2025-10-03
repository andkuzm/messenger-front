import {Button, Input} from "@chakra-ui/react";
import {useState} from "react";
import {useSendMessage} from "@/hooks/useMessage.ts";
import type {Message} from "@/types/Message.ts";
import {useAppSelector} from "@/stores/store.ts";
import type {User} from "@/types/User.ts";
import {useChatById} from "@/hooks/useChat.ts";

export default function ChatSendMessagePlate({chatId}:{chatId:number}) {
    const [message, setMessage] = useState("");
    const sendMessage = useSendMessage();
    const {userId, username_stored} = useAppSelector(state => state.auth);
    const chatById = useChatById(chatId);
    const chat = chatById.data;

    async function handleSubmit() {
        const sender:User = {id: userId?userId:-1, username: username_stored?username_stored:"unable to receive username from token"};
        const msg:Message = {sender: sender, receiver: chat.users[1], chat:chat, message: message};
        const sendMessageResp = await sendMessage.mutateAsync(msg)
        console.log("sendMessageResp", sendMessageResp)
    }
    return(
        <div className="h-1/10 border-t pb-2 flex-row flex gap-5 pt-1">
            <Input
                variant="outline"
                size="lg"
                placeholder="start writing a message"
                onChange={(e)=>{setMessage(e.target.value)}}></Input>
            <Button disabled={message.trim()==""} onClick={handleSubmit}>Send</Button>
        </div>
    )
 }