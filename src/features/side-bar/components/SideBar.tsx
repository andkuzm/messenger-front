import {useChatsByUser} from "../../../hooks/useChats.ts";

export default function SideBar(){
    const { data: chats, isLoading, error } = useChatsByUser(1);
    if (isLoading) return <p>Loading chats...</p>;
    if (error) return <p>Failed to load chats</p>;
    return(
        <div className="border-r-2 pr-1 h-full">
            <p>{chats}</p>
        </div>
    )
}