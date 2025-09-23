import type {Chat} from "@/types/Chat.ts";

type SideBarPlateProps = {
    chat: Chat;
};


export default function SideBarPlate({chat}: SideBarPlateProps){
    console.log(chat);
    return (
        <div>
            <p className={""}>sideplate</p>
        </div>
    )
}