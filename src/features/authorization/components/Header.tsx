import Authentication from "./authentication.tsx"
import {useAppSelector} from "@/stores/store.ts";

export default function Header() {

    const { username_stored } = useAppSelector(state => state.auth);
    return(
        <div className="flex flex-row pb-1 border-b-1 gap-10 place-items-center justify-between pr-10">
            <p>Messenger{username_stored ? ", logged in as: "+username_stored : ""}</p>
            <Authentication/>
        </div>
    )
}