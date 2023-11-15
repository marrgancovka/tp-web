import React from "react";
import Login from "../../Components/Login/Login";
import { useNavigate } from "react-router-dom";

function PageLogin(){
    const navigate = useNavigate()

    const registrationHandler = (event) => {
        event.preventDefault()
        navigate('/register')
    }

    return(
        <div>
        <h1>Страница авторизации</h1>
        <Login/>
        <button onClick={registrationHandler}>Зарагестрироваться!</button>
        </div>
    )
}

export default PageLogin