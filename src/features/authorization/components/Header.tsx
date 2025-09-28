import Authentication from "./authentication.tsx"

export default function Header() {
    return(
        <div className="flex flex-row pb-1 border-b-1 gap-10 place-items-center justify-between pr-10">
            <p>Messenger</p>
            <Authentication/>
        </div>
    )
}