import React from "react";
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, } from '@heroicons/react/24/outline'
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../Store/authSlice";
import { selecteCurrentUser } from "../../Store/authSlice";
import { useSelector } from "react-redux";
export function ChatHeader(props) {
    const StoreCurrentUser = useSelector(selecteCurrentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    return (<>

        <Disclosure as="nav" style={{ boxShadow: ` 5px 5px 10px rgba(0, 0, 0, 0.2)` }} className="bg-white p-0 ">
            {({ open }) => (
                <>
                    <div className=" w-full px-2 ">
                        <div className="relative flex h-14 items-center justify-between">


                            <div onClick={() => {
                                props.setshowSidebar(!props.showSidebar)
                            }} className="absolute inset-y-0 left-0 flex items-center ">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex bg-gray-200 items-center shadow-md hover:shadow-none    justify-center rounded-md p-2 text-gray-400 hover:bg-cyan-700 hover:text-white focus:outline-none focus:ring-0 ">

                                    {props.showSidebar ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center ml-12 sm:items-stretch justify-start">

                                <Link to={'/chat/Chats'} className="flex flex-shrink-0 mx-1 items-center">
                                    <h1 className="text-center  leading-6 text-cyan-300 hover:text-indigo-500 text-[22px] font-bold">Chat Application</h1>
                                </Link>
                            </div>
                            <div className="absolute  inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                <Menu as="div" className="relative ml-3">
                                    <div title="Profile">
                                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img

                                                className="h-10 w-10 rounded-full"
                                                src={StoreCurrentUser.ProfileImageUrl ? StoreCurrentUser.ProfileImageUrl : ""}
                                                alt=""
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        to={"/chat/Chats"}
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Home
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        to={"/chat/Chats"}
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Your Profile
                                                    </Link>
                                                )}
                                            </Menu.Item>

                                            <Menu.Item>
                                                {({ active }) => (
                                                    <div
                                                        onClick={() => {
                                                            dispatch(logout())
                                                            localStorage.removeItem('REAl_ESTATE_USER_DATA');
                                                            navigate("/Login")
                                                        }}
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Sign out
                                                    </div>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>



                        </div>
                    </div>
                </>
            )}
        </Disclosure >

    </>
    )
}