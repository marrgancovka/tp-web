import { useNavigate } from "react-router-dom";
import Register from "../../Components/Register/Register";
import React from "react";
import image from "./moments.png"
import './Register.css'

function PageReg(){
    const navigate = useNavigate()

    const loginHandler  =(event) => {
        event.preventDefault()
        navigate('/login')
    }

    return (
        <div className="login_group">
        <img src={image} alt="Moments" className="moments_logo"/>
        <Register/>
        <div className="toreg">
            Уже есть аккаунт? <span onClick={loginHandler} className="linktoreg">Войти!</span>
        </div>
      </div>
    )
}

export default PageReg