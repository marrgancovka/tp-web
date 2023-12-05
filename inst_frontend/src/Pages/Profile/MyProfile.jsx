import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Navbar from "../../Components/Navbar/Navbar"
import Headprofile from "../../Components/Headprofile/Headprofile"
import Grid from "../../Components/Grid/Grid"

const PageMyProfile = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const logoutHandler = (event) =>{
        sessionStorage.removeItem('token')
        navigate('/login')
    }
   

    return(
        <>
        <Navbar/>
        <Headprofile/>
        <Grid />
        <button onClick={logoutHandler}>Выйти</button>
        </>        
    )
}

export default PageMyProfile