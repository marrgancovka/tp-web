import React from "react";
import Login from "../../Components/Login/Login";
import { useLocation, useNavigate } from "react-router-dom";
import image from "./moments.png"
import './Login.css'

function PageLogin(){
    const navigate = useNavigate()
    const location = useLocation()

    const registrationHandler = (event) => {
        event.preventDefault()
        navigate('/register')
    }

    return(
        <div className="login_group">
            <img src={image} alt="Moments" className="moments_logo"/>
            <Login location = {location.pathname}/>
            <div className="toreg">
                Еще нет аккаунта? <span onClick={registrationHandler} className="linktoreg">Зарегистрироваться!</span>
            </div>
          </div>
    )
}

export default PageLogin