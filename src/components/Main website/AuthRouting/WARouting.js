import { Navigate } from "react-router-dom";
import { LoginWebsite } from "../Login/LoginWeb";
import { SingupWebsite } from "../Login/singupWeb";
import { E404M } from "../404Main/M404";
import { FulllayoutMain } from "./WALayout"


export const ThemeRoutes = [

  {
    path: "/",
    element: <FulllayoutMain />,
    children: [
      { path: "/", exact:true, element: <Navigate to="Login" /> },
      { path: "singup", exact:true, element: <SingupWebsite /> },
      { path: "login",exact:true,  element: <LoginWebsite /> },
      { path: "*", exact:true, element: <E404M /> },
    ],
  },
];

