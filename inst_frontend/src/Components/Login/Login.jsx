import React, { useState } from "react";
import './Login.css'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function Login(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

   const usernameHandler = (event) => {
        setUsername(event.target.value)
   }
   const passwordHandler = (event) => {
        setPassword(event.target.value)
   }
   const submitHandler = async (event) => {
    event.preventDefault();
    try {
        let data = {
            username: username,
            password: password
        }
        console.log(data);
        const response = await axios.post("http://127.0.0.1:8000/auth/token/login", data);
        const token = response.data['auth_token']
        console.log('API Response:', token);
        sessionStorage.setItem('token', JSON.stringify(token));
        const headers = {
            'Authorization': `token ${token}`
        }
        const response1 = await axios.get("http://127.0.0.1:8000/auth/users/me", {headers: headers});
        const id = response1.data['id']
        const response2 = await axios.get(`http://localhost:8000/profile/me/${id}?user=true`)
        const id_profile = response2.data[0]['id']
        navigate('/feed', {state: {me: id_profile}})

    } catch (error) {
        console.log(error);
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
            />
            <input 
                type="password" 
                name='password'
                placeholder="Пароль" 
                onChange={passwordHandler}
                className="inputForm"
            />
            <button className="btn_login">Войти</button>
        </form>
        
        </div>
    )
}

export default Login;