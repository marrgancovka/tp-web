import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Feed from "../../Components/Feed/Feed";

function PageFeed(){
    const navigate = useNavigate()
    const location = useLocation()

    return(
    <>
        <Navbar/>
        <Feed />
    </>
        
    )
}

export default PageFeed