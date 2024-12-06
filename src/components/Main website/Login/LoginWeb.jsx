import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { Loader } from "../Loader/loader";
import { login } from '../../Store/authSlice';
import CryptoJS from 'crypto-js';
const serverURL = process.env.REACT_APP_SERVER_URL
const secretEnKey = process.env.REACT_APP_SECRET_ENC_KEY
export function LoginWebsite() {
  const location = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [showpassword, setshowpassword] = useState(false);
  const [loginData, setloginData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setloginData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    const name = location.pathname.slice(1).split('/')
    document.title = name[name.length - 1]

  }, [location])

  const encryptUserData = (data, secretKey) => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey);
    return encryptedData.toString();
  }

  async function handelSubmit(e) {

    e.preventDefault();

    try {
      setLoading(true)
      const response = await axios.post(`${serverURL}/api/auth/login`, loginData);

      if (response) {
        setLoading(false)
        if (response.status === 200) {
          toast.success('Successfully Sign In')
          const user = encryptUserData(response.data.user, secretEnKey);
          localStorage.setItem('REAl_ESTATE_USER_DATA', JSON.stringify({ user, expiration: response.data.user.sessionExpiration }));
          dispatch(login(response.data.user));
          navigate("/chat/Chats")

        }
      }
    } catch (error) {
      setLoading(false);
      if (error) {
        if (error.response) {

          toast.error(error.response.data.message);
        } else {
          toast.error("Failed to Login");
        }
      }
    }
  }


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const verification = searchParams.get('verification');
    if (verification === 'success') {
      toast.success('Email verification successfull');
    } else if (verification === 'error') {
      toast.error('Email verification Failed');
    }
  }, [location.search, navigate]);


  return (<>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto my-4 sm:w-full sm:max-w-sm">
        <h1 className="text-center  leading-6 text-cyan-300 hover:text-indigo-500 text-[28px] font-bold">Chat Application</h1>
      </div>
      <div style={{ boxShadow: ` 5px 5px 10px rgba(0, 0, 0, 0.2)` }} className="mt-2 sm:mx-auto border  p-4 rounded-lg sm:w-full sm:max-w-sm">
        <form onSubmit={handelSubmit} className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={loginData.email}
                onChange={handleInputChange}
                required
                className="block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type={showpassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={loginData.password}
                onChange={handleInputChange}
                required
                className="block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div onClick={() => { setshowpassword(!showpassword) }} className="absolute right-3 top-2 cursor-pointer  ">
                {showpassword ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
                }
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          create an account?{' '}
          <Link to={"/SingUp"} className="font-semibold leading-6 text-cyan-300 hover:text-indigo-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
    <Loader loading={loading} />
  </>);

}


