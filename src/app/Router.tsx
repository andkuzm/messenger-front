import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import EmptyChatField from "../features/chat/components/EmptyChatField.tsx";
import Chat from "../features/chat/components/Chat.tsx";
import NotFound from "../components/NotFound.tsx";
import Header from "@/features/authorization/components/Header.tsx";
import SideBar from "@/features/side-bar/components/SideBar.tsx";
import Footer from "@/components/Footer.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div className="grid grid-rows-12 h-screen w-11/12 pl-5 gap-1">
                    <Header/>
                    <div className="row-span-10 grid grid-cols-3 h-full gap-5">
                        <SideBar/>
                        <div className="col-span-2 max-h-[90vh]">
                            <Outlet/>
                        </div>
                    </div>
                    <Footer/>
                </div>,
        children: [
            { index: true, element: <EmptyChatField /> },
            { path: ":chatId", element: <Chat /> },
            { path: "*", element: <NotFound /> },     // catch-all
        ],
    },
]);

export function AppRouter() {
    return <RouterProvider router={router} />;
}