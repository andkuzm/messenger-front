import type {Chat} from "@/types/Chat.ts";

type SideBarPlateProps = {
    chat: Chat;
};


export default function SideBarPlate({chat}: SideBarPlateProps){
    return (
        <div className="h-1/12 bg-black flex justify-center place-items-center">
            <button className="h-[99%] w-[99%] bg-black">
                <p>{chat.title ? chat.title : chat.users[0].username}</p>
            </button>
        </div>
    )
}