import { createBrowserRouter } from "react-router-dom";
import Chat from "../Components/Page/Chat/Chat";
import Home from "../Components/Home/Home";

const router = createBrowserRouter(
    [
        {
            path: '/',
            element:<Home></Home>,
            children: [
                {
                    path: '/chat',
                    element:<Chat></Chat>
                }
            ]
        }
    ]
);


export default router;