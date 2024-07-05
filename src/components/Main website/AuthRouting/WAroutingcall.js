import {useRoutes} from "react-router-dom";
import { ThemeRoutes } from "./WARouting";
export const RoutingWebAuth = () => {
    
  const routing = useRoutes(ThemeRoutes);

  return <div className="dark">{routing}</div>;
};

