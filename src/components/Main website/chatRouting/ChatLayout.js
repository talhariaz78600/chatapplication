import { Outlet } from "react-router-dom";
import { ChatHeader } from "../Chats/ChatHeader";
import style from "../Chats/layout.module.css"
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "../Loader/loader";
import { SearchPageModel } from "../connections/searchModel";
import { selecteUsers } from '../../Store/authSlice'
import { selecteCurrentUser } from '../../Store/authSlice'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selecteOnlineUser } from "../../Store/authSlice";
// import { useState ,useEffect} from 'react'
export const FulllayoutChat = () => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const [showSidebar, setshowSidebar] = useState(true);
    const [loading, setloading] = useState(false)
    const [myconnection, setMyconnection] = useState()
    const { roomId } = useParams()
    const [roomID, setRoomID] = useState(null);
    const StoreallUser = useSelector(selecteUsers)
    const StoreCurrentUser = useSelector(selecteCurrentUser)
    const onlineusers = useSelector(selecteOnlineUser)
    useEffect(() => {
        const data = StoreallUser.filter((item) => item._id !== StoreCurrentUser._id)
        setMyconnection(data)
        // eslint-disable-next-line
    }, [StoreallUser]);
    useEffect(() => {
        setRoomID(roomId)
    }, [roomId])
    useEffect(() => {
        const name = location.pathname.slice(1).split('/')
        document.title = name[name.length - 1]
    }, [location])

    return (
        <main>
            <main>

                <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: "3000" }}>
                    <ChatHeader showSidebar={showSidebar} setshowSidebar={setshowSidebar} />
                </div>

                <div style={{ height: "100vh", overflowY: "auto", paddingTop: '3.7rem' }} className="grid grid-cols-12  ">

                    {/* chat SideBar */}
                    <div
                        style={{
                            boxShadow: `5px 5px 10px rgba(0, 0, 0, 0.2)`,
                            height: "100%",
                            overflowY: "auto"
                        }}
                        className={` ${showSidebar ? 'block' : 'hidden'} pb-20 fixed md:relative top-14 md:top-0 bg-gray-50 left-0 z-40 w-64 md:w-full md:col-span-3 h-screen`}
                    >
                        <div className="w-full">
                            <div className="h-full w-full px-3 pb-4 overflow-y-auto">
                                <ul className="space-y-2 font-medium my-3">
                                    {myconnection && myconnection.map((chatobj, index) => (
                                        <div key={index}>
                                            <li
                                                className={`flex ${chatobj.chatId === roomID ? "bg-cyan-100" : ""} items-center justify-between my-2 hover:bg-gray-200 hover:shadow-none shadow-md rounded-md px-2 py-3 cursor-pointer`}
                                                onClick={() => {
                                                    navigate(`/chat/Chats/${chatobj._id}`)
                                                    setshowSidebar(false)
                                                }}
                                            >
                                                <div
                                                    onClick={async () => setRoomID(chatobj.chatId)}
                                                    className="font-bold flex cursor-pointer items-center justify-start gap-2"
                                                >
                                                    <div className="relative">
                                                        {/* Profile Image */}
                                                        <img
                                                            src={chatobj.ProfileImageUrl}
                                                            alt="img"
                                                            className="w-8 h-8 rounded-3xl"
                                                        />
                                                        {/* Online Status Dot */}
                                                        {onlineusers?.includes(chatobj._id) && (
                                                            <div
                                                                className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"
                                                                title="Online"
                                                            />
                                                        )}
                                                    </div>
                                                    <span>
                                                        {chatobj.username}
                                                    </span>
                                                </div>
                                            </li>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div style={{ height: "100%", overflowY: "auto" }} className={`col-span-12      ${style.heightScroll}   ${showSidebar ? ' md:col-span-9' : 'col-span-12'}   `}>

                        <div className="chatbody" >
                            <Outlet context={{ onlineusers }} />
                        </div>

                    </div>
                </div>
            </main >

            <Loader loading={loading} setloading={setloading} />
            {open &&
                <SearchPageModel open={open} setOpen={setOpen} />
            }

        </main>
    );
};

