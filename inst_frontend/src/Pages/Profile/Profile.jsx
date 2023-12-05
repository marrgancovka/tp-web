import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Navbar from "../../Components/Navbar/Navbar"
import Headprofile from "../../Components/Headprofile/Headprofile"
import Grid from "../../Components/Grid/Grid"

const PageProfile = () => {
    const navigate = useNavigate() 

    return(
        <>
        <Navbar/>
        <Headprofile/>
        <Grid />
        </>        
    )
}

export default PageProfile