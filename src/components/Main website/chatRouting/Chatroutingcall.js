import {useRoutes} from "react-router-dom";
import { ThemeRoutes } from "./ChatRouting";
export const RoutingWebChat = () => {
  const routing = useRoutes(ThemeRoutes)
  return <div className="dark">{routing}</div>;
};

