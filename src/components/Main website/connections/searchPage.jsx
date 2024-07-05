import { useState } from "react";
import { SearchPageModel } from "./searchModel";
export function SearchPage(props) {
    const { otherUsers, UserRequests } = props

    const [open, setOpen] = useState(false)
    const [searchinput, setsearchinput] = useState("")
    const [searchedRequest, setsearchedRequest] = useState([])
    const [searchedMembers, setsearchedMembers] = useState([])

    const handelSearchConnection = (e) => {
        e.preventDefault();
        if (searchinput === "") {
            return
        }
       
        if (UserRequests && UserRequests.length > 0) {
            setsearchedRequest(UserRequests.filter((user) => user.username.toLocaleLowerCase().includes(searchinput.toLocaleLowerCase())))
        }
        if (otherUsers && otherUsers.length > 0) {
            setsearchedMembers(otherUsers.filter((user) => user.username.toLocaleLowerCase().includes(searchinput.toLocaleLowerCase())))
        }
        setOpen(true)

    }

    return (<div className="my-2 ">
        <p className="my-1 font-semibold text-medium">
            Search Connections
        </p>
        <form onSubmit={handelSearchConnection}>
            <div className="flex items-center justify-center border-gray-500 border p-2 rounded-md w-4/5 mx-auto bg-white ">

                <button type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>

                </button>
                <input type="search" value={searchinput} onChange={(e) => { setsearchinput(e.target.value) }} placeholder="Search Connections " className="text-cyan-300 text-sm px-1 w-full bg-transparent focus:outline-none focus:ring-0 bg-none rounded-sm " />
            </div>
        </form>
        {open &&
            <SearchPageModel open={open} setOpen={setOpen} searchedRequest={searchedRequest} searchedMembers={searchedMembers} />
        }

    </div>)
}