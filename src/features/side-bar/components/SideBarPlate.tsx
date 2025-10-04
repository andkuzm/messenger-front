import type {Chat} from "@/types/Chat.ts";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "@/stores/store.ts";
import {Button} from "@chakra-ui/react";

type SideBarPlateProps = {
    chat: Chat;
};


export default function SideBarPlate({chat}: SideBarPlateProps){
    const {username_stored} = useAppSelector(state => state.auth);
    const navigate = useNavigate();
    return (
        <div className="flex justify-center place-items-center">
            <Button variant="outline" size="sm" className=" w-[99%] rounded" onClick={()=>{navigate(`/${chat.id}`)}}>
                {chat.title ? chat.title : chat.users[0].username!=username_stored ? chat.users[0].username : chat.users[1].username}, chat id: {chat.id}
            </Button>
        </div>
    )
}