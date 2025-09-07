import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import EmptyChatField from "../features/chat/components/EmptyChatField.tsx";
import Chat from "../features/chat/components/Chat.tsx";
import NotFound from "../components/NotFound.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
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