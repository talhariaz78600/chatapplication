


import { SingleChat } from "./singlechat";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
export function Chats({ showSidebar }) {
    const {onlineusers}=useOutletContext()
    const { roomId } = useParams()
    return (<div>

        {roomId ?
            <div className="chatbody">
                <SingleChat roomID={roomId} onlineusers={onlineusers} showSidebar={showSidebar} />
            </div>
            :
            <div className="w-full h-full  flex items-center justify-center">
                <h2 className="font-bold text-xl mt-24">Select a chat</h2>
            </div>
        }
    </div>)
};

