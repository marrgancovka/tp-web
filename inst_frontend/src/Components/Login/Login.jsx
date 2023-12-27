import React, { useState } from "react";
import './Login.css'
import axios from 'axios';
import {useNavigate, useRoutes} from 'react-router-dom'

function Login(props){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const [passError, setPassError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [badData, setBadData] = useState('')

   const usernameHandler = (event) => {
        setUsername(event.target.value)
   }
   const passwordHandler = (event) => {
        setPassword(event.target.value)
   }
   const submitHandler = async (event) => {
    event.preventDefault();
    let data = {
        username: username,
        password: password
    }
    setBadData('')
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (password == ''){
        setPassError('Обязательое поле!')
    }
    else {
        setPassError('')
    }
    const usernamePattern = /^[a-zA-Z0-9][a-zA-Z0-9._]{0,29}$/;
    console.log(username)
    if (username == ''){
        setUsernameError('Обязательое поле!')
        return
    }
    else{
        setUsernameError('')
    }
    if (passError!='' || usernameError!=''){
        return
    }

    try {
        const response = await axios.post("http://127.0.0.1:5173/api/auth/token/login", data);
        const token = response.data['auth_token']
        console.log('API Response:', token);
        sessionStorage.setItem('token', JSON.stringify(token));
        const headers = {
            'Authorization': `token ${token}`
        }
        const response1 = await axios.get("http://127.0.0.1:5173/api/auth/users/me/", {headers: headers});
        console.log(response1.data)
        const id = response1.data['id']
        console.log(id)
        const response2 = await axios.get(`http://localhost:5173/api/profile/me/${id}/?user=true`)
        console.log(response2.data)
        const id_profile = response2.data['id']
        navigate('/feed', {state: {me: id_profile}})

    } catch (error) {
        console.log(error);
        setBadData("Неверное имя пользователя или пароль")
    }
   }

    return(
        <div className="form">
        <form className="loginForm" onSubmit={submitHandler}>
            <input 
                type="username"
                name='username'
                placeholder="Имя пользователя"
                onChange={usernameHandler}
                className="inputForm"
                autoComplete="off"
            />
            {(usernameError!='') && <span className="error">{usernameError}</span>}

            <input 
                type="password" 
                name='password'
                placeholder="Пароль" 
                onChange={passwordHandler}
                className="inputForm"
                autoComplete="off"
            />
            {(passError!='') && <span className="error">{passError}</span>}
            {(badData!='') && <span className="error">{badData}</span>}

            <button className="btn_login" onClick={submitHandler}>Войти</button>
        </form>
        
        </div>
    )
}

export default Login;