import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import EmptyChatField from "../features/chat/components/EmptyChatField.tsx";
import Chat from "../features/chat/components/Chat.tsx";
import NotFound from "../components/NotFound.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div className="col-span-2 max-h-screen" ><Outlet/></div>,
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