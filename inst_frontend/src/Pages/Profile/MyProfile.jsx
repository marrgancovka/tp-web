import axios from "axios"
import { useEffect, useState } from "react"
import React from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Navbar from "../../Components/Navbar/Navbar"
import Headprofile from "../../Components/Headprofile/Headprofile"
import Grid from "../../Components/Grid/Grid"
import ModalWindow from "../../Components/Modal/Modal"
import Modal from 'react-modal'

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