import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Navbar from "../../Components/Navbar/Navbar"
import Headprofile from "../../Components/Headprofile/Headprofile"
import Grid from "../../Components/Grid/Grid"

const PageProfile = () => {
    const navigate = useNavigate() 
    const location = useLocation()
    const [id, setId] = useState('')
    
    useEffect(()=>{
        setId(location.state.profile)
        console.log(location.state.profile, '++++++++++++')
    },[])

    return(
        <>
        <Navbar/>
        <Headprofile id = {id}/>
        <Grid id= {id}/>
        </>        
    )
}

export default PageProfile