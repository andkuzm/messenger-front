import {useParams} from "react-router-dom";
import EmptyChatField from "./EmptyChatField.tsx";


export default function Chat() {
    const chatId = useParams()['chatId'];
    if (!chatId) {
        return <EmptyChatField />
    }
    return (
        <div>

        </div>
    )
}