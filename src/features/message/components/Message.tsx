import type {Message} from "@/types/Message.ts"
import {useAppSelector} from "@/stores/store.ts";

export default function Message({msg}:{msg:Message}){
    const {userId} = useAppSelector(state => state.auth)
    return(
        <div className="w-full border-b-1">
            <strong>{msg.sender.username}{msg.sender.id==userId?" (you)":""}:</strong>
            <p className="text-wrap:w">{msg.message}</p>
        </div>
    )
}