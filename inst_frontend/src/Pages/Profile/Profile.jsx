import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../../Components/Navbar/Navbar"
import Headprofile from "../../Components/Headprofile/Headprofile"
import Grid from "../../Components/Grid/Grid"

const PageProfile = () => {
    const navigate = useNavigate()
    const [id, setId] = useState('')
    const [username, setUsername] = useState('')

    const logoutHandler = (event) =>{
        sessionStorage.removeItem('token')
        navigate('/login')
    }

    useEffect(()=>{
        try{
            const itemStorage = sessionStorage.getItem('token')
            const token = itemStorage.replace('"', '').replace('"', '')
            const headers = {
                'Authorization': `token ${token}`
            }
            console.log(headers)
            // const response = axios.get('http://localhost:8000/auth/users/me/', {headers: headers,})
            const response = fetch(`http://localhost:8000/auth/users/me/`, { method: 'GET', headers: headers, })
                .then((response) => response.json())
                .then((jsonData) => {setId(jsonData.id)
                setUsername(jsonData.username)})
                .catch((error) => console.error('Error fetching data:', error));
        }catch(error){
            console.log(error)
        }   
    }, [])

    

    return(
        <>
        <Navbar/>
        <Headprofile username={username}/>
        <Grid id={id}/>
        <button onClick={logoutHandler}>Выйти</button>
        </>        
    )
}

export default PageProfile