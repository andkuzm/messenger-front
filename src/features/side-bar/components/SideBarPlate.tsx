import type {Chat} from "@/types/Chat.ts";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "@/stores/store.ts";

type SideBarPlateProps = {
    chat: Chat;
};


export default function SideBarPlate({chat}: SideBarPlateProps){
    const {username_stored} = useAppSelector(state => state.auth);
    const navigate = useNavigate();
    return (
        <div className="h-1/12 bg-black flex justify-center place-items-center">
            <button className="h-[99%] w-[99%] bg-black" onClick={()=>{navigate(`/${chat.id}`)}}>
                <p>{chat.title ? chat.title : chat.users[0].username!=username_stored ? chat.users[0].username : chat.users[1].username}, chat id: {chat.id}</p>
            </button>
        </div>
    )
}