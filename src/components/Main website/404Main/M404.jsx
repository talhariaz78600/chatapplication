import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function E404M(){
    const location = useLocation();
    useEffect(() => {
        document.title = location.pathname.slice(1)
    // eslint-disable-next-line
    }, [])
    return(<>
    <div style={{width:"100vw" , height:"100vh" , display:"flex", justifyContent:"center"}}>

    <img  width={"fit-content"} height={"100%"}  src="/images/404.jpg" alt="img" />
    </div>
    </>)
}