import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {  useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import {selecteUsers} from '../../Store/authSlice'
import { selecteCurrentUser } from '../../Store/authSlice'
import { useState ,useEffect} from 'react'
export function SearchPageModel(props) {
    const {setOpen, open } = props
    const [myconnection,setMyconnection]=useState()
    const navigate = useNavigate()
    const StoreallUser = useSelector(selecteUsers)
    const StoreCurrentUser = useSelector(selecteCurrentUser)
    useEffect(() => {
        const data=StoreallUser.filter((item)=>item._id!==StoreCurrentUser._id)
        setMyconnection(data)
         // eslint-disable-next-line
    }, []);
    return (<>
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" style={{ zIndex: 14000 }} className="relative " onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
                                <form >
                                    <div className="bg-gray-50 px-4 py-3 flex items-center justify-between  ">
                                        <h2 className='text-center font-bold text-blue-400'>Yours Connections</h2>

                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-black bg-white text-sm font-semibold text-gray-900  hover:bg-gray-50 "
                                            onClick={() => setOpen(false)}
                                        // ref={cancelButtonRef}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                                            </svg>

                                        </button>
                                    </div>
                                    <div className="bg-white px-4  ">
                                        {
                                            myconnection  && myconnection.length > 0 && <div>
                                                <div className=' '>
                                                    {
                                                        myconnection.map((con, index) => {
                                                            return <div 
                                                            key={index} className="flex my-3 items-center justify-center md:justify-between gap-2  bg-gray-300     rounded-lg p-2 shadow-lg cursor-pointer" onClick={()=>{
                                                                navigate(`/chat/Chats/${con._id}`)
                                                                setOpen(false)
                                                            }}>
                                                                <div className="relative flex rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" >

                                                                    <img
                                                                        className="h-10 w-10 rounded-full"
                                                                        src={con.ProfileImageUrl}
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <h3 className="font-bold">{con.username}</h3>
                                                                    <p>
                                                                        {con.primaryMarket}
                                                                    </p>
                                                                </div>

                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        }


                                    </div>


                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root >
    </>)
}
