import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Feed from "../../Components/Feed/Feed";

function PageFeed(){
    const navigate = useNavigate()

    return(
    <>
        <Navbar/>
        <Feed />
    </>
        
    )
}

export default PageFeed