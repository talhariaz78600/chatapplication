import { useState, useEffect } from "react";
import { Fragment } from 'react'
import imageCompression from 'browser-image-compression';
import {handleImageSelect}from "../../cloudanary/Uploadimage";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Loader } from "../Loader/loader";
export function SingupWebsite() {
  const serverURL = process.env.REACT_APP_SERVER_URL;
  const location = useLocation();
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passwordfalse, setpasswordfalse] = useState(false);
  const intialData = {
    email: "",
    password: "",
    confirmpassword: "",
    firstName: "",
    lastName: "",
    primaryMarket: "",
    date: "",
    month: "",
    year: "",
    profileImage: "",
    mobileNumber: ""

  }
  const [signupData, setsignupData] = useState(intialData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setsignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  async function handelSubmit(e) {
    e.preventDefault();
    console.log(serverURL);
    if (signupData.confirmpassword !== signupData.password) {
      toast.info("Password didn't Match")
      return
    }
    setpasswordfalse(false)
    let imgcompress=""
    let imgUrl=""
   
    // formData.append('username', signupData.firstName + " " + signupData.lastName);
    // formData.append('email', signupData.email);
    // formData.append('password', signupData.password);
    // formData.append('ProfileImageUrl',imgUrl);
    try {
      setLoading(true);
      if(signupData.profileImage){
        imgcompress=await imageCompression(signupData.profileImage)
        imgUrl= await handleImageSelect(imgcompress)
      }
      console.log(imgUrl);
      const response = await axios.post(`${serverURL}/api/auth/sing-up`, {
        username:signupData.firstName + " " + signupData.lastName,
        email:signupData.email,
        password:signupData.password,
        ProfileImageUrl:imgUrl
      });

      if (response) {
        if (response.status === 200) {
          setLoading(false);
          toast.success("User Singnup successfully");
          navigate(`/Login`);
        }
      }
    } catch (error) {
      setLoading(false);
      if (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Failed to Singup");
        }
      }
    }

  }



  useEffect(() => {
    const name = location.pathname.slice(1).split('/')
    document.title = name[name.length - 1]

  }, [location])


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Link to={"/Login"} className="sm:mx-auto my-4 sm:w-full sm:max-w-sm">
          <h1 className="text-center  leading-6 text-cyan-300 hover:text-indigo-500 text-[28px] font-bold">Chat Application</h1>
        </Link>
        <div
          style={{ boxShadow: ` 5px 5px 10px rgba(0, 0, 0, 0.2)` }}
          className="mt-2 sm:mx-auto border  p-4 rounded-lg sm:w-full sm:max-w-sm"
        >
          <div className="my-2">
            <h2 className="text-center font-bold text-2xl">
              Create an account
            </h2>
            <h4 className="text-center text-sm text-gray-500  ">It's quick and easy </h4>
          </div>
          <form
            onSubmit={handelSubmit}
            className="space-y-6"

          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name *
              </label>
              <div className="mt-2 flex items-center gap-2 justify-between">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={signupData.firstName}
                  onChange={handleInputChange}
                  required
                  placeholder="First Name"
                  className="block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={signupData.lastName}
                  onChange={handleInputChange}
                  placeholder="LastName"
                  required
                  className="block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address *
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={signupData.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  required
                  className="block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password *
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password1"
                  name="password"
                  type="password"
                  value={signupData.password}
                  onChange={handleInputChange}
                  autoComplete="current-password"
                  required
                  className={` ${passwordfalse ? `border-red-500` : ""} block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password *
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password2"
                  name="confirmpassword"
                  type="password"
                  value={signupData.confirmpassword}
                  onChange={handleInputChange}
                  autoComplete="current-password"
                  required
                  className={` ${passwordfalse ? `border-red-500` : ""} block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="ProfileImage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Upload profile Image *
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="ProfileImage"
                  name="ProfileImage"
                  type="file"
                  onChange={(e) => {
                    setsignupData(((pre) => ({ ...pre, profileImage: e.target.files[0] })))

                  }}
                  required
                  className="block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-cyan-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm text-gray-500">
            already have an account?{" "}
            <Link to={"/Login"}

              className="font-semibold leading-6 text-cyan-300 hover:text-indigo-500"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      <Loader loading={loading} />
    </>
  );
}
