import empty from "../../../assets/empty.svg"

export default function EmptyChatField() {
    return (
        <div className="h-full flex justify-center place-items-center p-0.5">
            <div className="flex flex-col">
                <img src={empty}  alt={"Chat not chosen"} className="h-20 md:h-30 lg:h-35 xl:h-36"/>
                <p className="wrap-break-word text-center">No chat is currently chosen</p>
            </div>
        </div>
    )
}