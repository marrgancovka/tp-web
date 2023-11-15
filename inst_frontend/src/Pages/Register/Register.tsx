import { useNavigate } from "react-router-dom";
import Register from "../../Components/Register/Register";
import React from "react";

function PageReg(){
    const navigate = useNavigate()

    const loginHandler  =(event) => {
        event.preventDefault()
        navigate('/login')
    }

    return (
        <>
        <h1>Страница регистрации</h1>
        <Register/>

        <button onClick={loginHandler}>Войти</button>
        </>
    )
}

export default PageReg