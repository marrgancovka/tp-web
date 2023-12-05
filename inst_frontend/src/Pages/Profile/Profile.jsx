import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Navbar from "../../Components/Navbar/Navbar"
import Headprofile from "../../Components/Headprofile/Headprofile"
import Grid from "../../Components/Grid/Grid"

const PageProfile = (props) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [loc, setLoc] = useState()

    const logoutHandler = (event) =>{
        sessionStorage.removeItem('token')
        navigate('/login')
    }
    
    // useEffect(()=>{
    //     setLoc(props.key)
    //     setLoc(location.key)
    // },[location.key])
    // useEffect(()=>{
    //     try{
    //         console.log("вывелся профайл")
    //         const itemStorage = sessionStorage.getItem('token')
    //         const token = itemStorage.replace('"', '').replace('"', '')
    //         const headers = {
    //             'Authorization': `token ${token}`
    //         }
    //         console.log(headers)
    //         const response = fetch(`http://localhost:8000/auth/users/me/`, { method: 'GET', headers: headers, })
    //             .then((response) => response.json())
    //             .then((jsonData) => {setId(jsonData.id)
    //             setUsername(jsonData.username)
    //             console.log(jsonData)})
    //             .catch((error) => console.error('Error fetching data:', error));
            
    //     }catch(error){
    //         console.log(error)
    //     }   
    // }, [])

    

    return(
        <>
        <Navbar/>
        <Headprofile />
        <Grid />
        <button onClick={logoutHandler}>Выйти</button>
        {/* <h1>{location.search}</h1> */}
        {/* <h2>{location.pathname.substring(location.pathname.lastIndexOf('/') + 1)}</h2> */}
        </>        
    )
}

export default PageProfile