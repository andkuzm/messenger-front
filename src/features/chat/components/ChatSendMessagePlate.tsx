import {Button, Input} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useSendMessage} from "@/hooks/useMessage.ts";
import type {Message} from "@/types/Message.ts";
import {useAppSelector} from "@/stores/store.ts";
import type {User} from "@/types/User.ts";
import type {Chat} from "@/types/Chat.ts";

export default function ChatSendMessagePlate({chat, refetch, stickyScroll}:{chat:Chat, refetch:()=>void, stickyScroll:()=>void}) {
    const [message, setMessage] = useState("");
    const sendMessage = useSendMessage();
    const {userId, username_stored} = useAppSelector(state => state.auth);

    async function handleSubmit() {
        const sender:User = {id: userId?userId:-1, username: username_stored?username_stored:"unable to receive username from token"};
        const msg:Message = {sender: sender, receiver: chat.users[0].id!=userId?chat.users[0]:chat.users[1], chatId:chat.id, message: message};
        await sendMessage.mutateAsync(msg).then(
            ()=>{refetch(); setMessage("");},
        )
    }

    useEffect(()=>{
        stickyScroll();
    }, [sendMessage, stickyScroll])
    return(
        <div className="h-1/10 border-t pb-2 flex-row flex gap-5 pt-1">
            <Input
                id="message_input_field"
                variant="outline"
                size="lg"
                placeholder="start writing a message"
                value={message}
                onChange={(e)=>{setMessage(e.target.value)}}></Input>
            <Button disabled={message.trim()==""} onClick={handleSubmit} color="#272830">Send</Button>
        </div>
    )
 }