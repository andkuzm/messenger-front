import Login from "./Login.tsx"

export default function Header() {
    return(
        <div className="flex flex-row items-stretch pb-1 border-b-1">
            <p>header</p>
            <Login/>
        </div>
    )
}