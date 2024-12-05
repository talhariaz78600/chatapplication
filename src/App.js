import React, { useEffect, useState } from "react";
import { RoutingWebAuth } from "./components/Main website/AuthRouting/WAroutingcall";
import { RoutingWebChat } from "./components/Main website/chatRouting/Chatroutingcall";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import CryptoJS from 'crypto-js';
import { useSelector, useDispatch } from "react-redux";
import { selecteCurrentUser, login, addnewUser, addonlineUsers, } from "./components/Store/authSlice";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { allusers } from "./components/Store/authSlice";
import { Loader } from "./components/Main website/Loader/loader";
import { io } from "socket.io-client";
function App() {

  const secretEnKey = process.env.REACT_APP_SECRET_ENC_KEY;
  const serverURL = process.env.REACT_APP_SERVER_URL
  const storeCurrentUser = useSelector(selecteCurrentUser)
  const [loading, setloading] = useState(false)
  // const [onlineusers,setOnlineUser]=useState()
  console.log(storeCurrentUser);
  const dispatch = useDispatch()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])
  const decryptUserData = (data) => {
    const decryptedBytes = CryptoJS.AES.decrypt(data, secretEnKey);
    const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;

  }
  useEffect(() => {

    if (!storeCurrentUser) {

      const storedData = localStorage.getItem('REAl_ESTATE_USER_DATA');
      if (storedData) {
        const { user, expiration } = JSON.parse(storedData);
        if (expiration > Date.now()) {
          const userData = decryptUserData(user);
          dispatch(login(userData))
          if (window.location.pathname === "/login") {
            window.location.href = "/page";
          }
        } else {
          localStorage.removeItem('REAl_ESTATE_USER_DATA');
          if (window.location.pathname !== "/login") {
            window.location.href = "/login";
          }
        }
      }
    }
    // eslint-disable-next-line
  }, [storeCurrentUser, dispatch])


  useEffect(() => {
    const fetchUsers = async () => {

      try {
        const response = await axios.get(
          `${serverURL}/api/users/get_all_users`
        );
        if (response && response.status === 200) {
          setloading(false);
          console.log(response.data.users);
          dispatch(allusers(response.data.users));
        }
      } catch (error) {
        setloading(false);
        console.log(error);
      }
    };

    fetchUsers();
    // eslint-disable-next-line
  }, []);


  useEffect(() => {
    const socket = io(serverURL, {
      query: {
        userId: storeCurrentUser ? storeCurrentUser._id : ""
      }
    });

    socket.emit('join', storeCurrentUser ? storeCurrentUser._id : "");
    socket.on('newUser', (newUser) => {
      if (storeCurrentUser) {
        dispatch(addnewUser(newUser))
        toast.success(`${newUser?.username} has been joined to your team`)
      }
    });

    socket.on('getOnlineUsers', (users) => {
      if(users.length>0){
        dispatch(addonlineUsers(users))
      }
      // setOnlineUser(users)
      console.log(users);
    });

    return () => {
      socket.disconnect();
    };
  }, [storeCurrentUser]);

  return (
    <>
      <Router >
        <Routes>
          <Route exact path="/*" element={<RoutingWebAuth />} />
          {storeCurrentUser && <Route exact path="/chat/*" element={<RoutingWebChat />} />}
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />
      <Loader loading={loading} />
    </>
  );
}

export default App;
