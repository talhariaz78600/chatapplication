import { Navigate } from "react-router-dom";
import { Chats } from "../Chats/chats";
import { E404M } from "../404Main/M404";
import { FulllayoutChat } from "./ChatLayout";


export const ThemeRoutes = [
  {
    path: "/",
    element: <FulllayoutChat />,
    children: [
      { path: "/", exact: true, element: <Navigate to="/Chats" /> },
      { path: "Chats/:roomId?", exact: true, element: <Chats /> },
      { path: "*", exact: true, element: <E404M /> },
    ],
  },
];


