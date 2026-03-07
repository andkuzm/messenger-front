import type {Chat} from "@/types/Chat.ts";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "@/stores/store.ts";
import {Badge, Button} from "@chakra-ui/react";
import {useGetNotifications} from "@/hooks/useNotification.ts";

type SideBarPlateProps = {
    chat: Chat;
};


export default function SideBarPlate({chat}: SideBarPlateProps){
    const {username_stored} = useAppSelector(state => state.auth);
    const navigate = useNavigate();
    const {data: unreadCount} = useGetNotifications(chat.id);
    return (
        <div className="flex justify-center place-items-center">
            <Button variant="outline" size="sm" className=" w-[99%] rounded" onClick={()=>{navigate(`/${chat.id}`)}}>
                {chat.title ? chat.title : chat.users[0].username!=username_stored ? chat.users[0].username : chat.users[1].username}, chat id: {chat.id}
                {unreadCount != null && unreadCount > 0 && (
                    <Badge colorPalette="red" variant="solid" borderRadius="full" ml="2">
                        {unreadCount}
                    </Badge>
                )}
            </Button>
        </div>
    )
}