import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selecteCurrentUser, selecteUsers } from "../../Store/authSlice";
import { Link } from "react-router-dom";
import io from 'socket.io-client';
import axios from "axios";
import { toast } from "react-toastify";

export function SingleChat(props) {
    const { roomID } = props;
    const serverURL = process.env.REACT_APP_SERVER_URL;
    const storeCurrentUser = useSelector(selecteCurrentUser);
    const allusers = useSelector(selecteUsers);
    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState([]);
    const { showSidebar } = props;
    const location = useLocation();
    const [pageTitle, setPageTitle] = useState("");
    const [otherUserData, setotherUserData] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const data = allusers.find((item) => item._id === roomID);
        setotherUserData(data);
        console.log(data);
    }, [roomID, allusers]);

    useEffect(() => {
        const socket = io(serverURL, {
            query: {
                userId: storeCurrentUser ? storeCurrentUser._id : ""
            }
        });

        socket.emit('join', storeCurrentUser ? storeCurrentUser._id : "");

        socket.on('newMessage', (newMessage) => {
            console.log(newMessage);
            console.log(newMessage.senderId,"second",otherUserData._id)
            if(newMessage.senderId===otherUserData._id){ 
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            }else{
                const data=allusers.find((item)=>item._id===newMessage.senderId)
                toast.success(`${data.username} sent you a message`)
            }
        });

        socket.on('getOnlineUsers', (users) => {
            console.log(users);
        });

        return () => {
            socket.disconnect();
        };
    }, [storeCurrentUser,otherUserData, serverURL]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${serverURL}/api/message/getmessages/${roomID}`, {
                    params: {
                        senderId: storeCurrentUser._id
                    }
                });
                console.log(response.data);
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [roomID, storeCurrentUser._id, serverURL]);

    useEffect(() => {
        setPageTitle(location.pathname.slice(1));
    }, [location.pathname]);

    useEffect(() => {
        document.title = pageTitle;
    }, [pageTitle]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (messageInput === "") {
            return console.log("please enter message");
        }
        try {
            const response = await axios.post(`${serverURL}/api/message/sendmessage/${roomID}`, {
                senderid: storeCurrentUser._id,
                message: messageInput
            });
            console.log(response.data);
            setMessageInput("");
            setMessages([...messages, response.data]);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="chat-container relative w-full mx-auto">
                {otherUserData && (
                    <div style={{ boxShadow: `2px 2px 5px rgba(0, 0, 0, 0.2)` }} className="bg-white fixed p-4 w-full">
                        <div className="flex items-center justify-between">
                            <Link to={`/page/users/${otherUserData._id}`} className="flex items-center justify-start gap-2">
                                <img src={otherUserData.ProfileImageUrl} alt="img" className="w-11 h-11 rounded-3xl" />
                                <div>
                                    <h2 className="font-bold text-xl">
                                        {otherUserData.username}
                                    </h2>
                                </div>
                            </Link>
                        </div>
                    </div>
                )}
                <div className="chatBox py-20">
                    {messages && messages.length > 0 &&
                        messages.map((mg, index) => {
                            const date = new Date("2024-07-05T13:11:52.863+00:00");
                            return (
                                <div key={index} className={`flex items-center ${mg.senderId === storeCurrentUser._id ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`w-2/4 flex items-center`}>
                                        {storeCurrentUser.ProfileImageUrl && (
                                            <img
                                                src={
                                                    mg.senderId === storeCurrentUser._id
                                                        ? storeCurrentUser.ProfileImageUrl
                                                        : otherUserData?.ProfileImageUrl
                                                }
                                                alt="Profile"
                                                className={`w-10 h-10 rounded-3xl ${mg.senderId === storeCurrentUser._id ? 'order-2' : ''}`}
                                            />
                                        )}
                                        <div className={`w-full my-2 p-2 mx-2 rounded-md ${mg.senderId === storeCurrentUser._id ? 'bg-cyan-200 text-end' : 'bg-green-100 text-start'}`}>
                                            <p>{mg.message}</p>
                                            <p className={`text-xs italic font-semibold ${mg.senderId === storeCurrentUser._id ? 'text-left' : 'text-end'}`}>
                                                {date && date.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                    <div ref={messagesEndRef} />
                    <div style={{ boxShadow: `0px -2px 3px rgba(0, 0, 0, 0.2)` }} className="bg-white w-full fixed bottom-0 z-50 py-2 px-4">
                        <form onSubmit={sendMessage} className={`grid grid-cols-3 ${showSidebar ? 'grid-cols-3' : 'grid-cols-9'} gap-2`}>
                            <div className={`${showSidebar ? 'col-span-2' : 'col-span-6'} w-[100%]`}>
                                <input
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    type="text"
                                    placeholder="Say Something....."
                                    className="bg-gray-200 focus:outline-none focus:ring-0 p-2 rounded-md w-full"
                                />
                            </div>
                            <div className="col-span-1 flex items-center justify-center">
                                <div className="w-full">
                                    <button type="submit">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
