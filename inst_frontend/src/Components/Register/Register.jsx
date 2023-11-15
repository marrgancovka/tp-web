import { useState } from "react";
import './Register.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Register(){
    const [email, setEmail]  = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const usernameHandler = (event) => {
        setUsername(event.target.value)
    }
    const passwordHandler = (event) => {
        setPassword(event.target.value)
    }
    const emailHandler = (event) => {
        setEmail(event.target.value)
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            let data = {
                username: username,
                email: email,
                password: password
            }
            console.log(data);
            await axios.post("http://127.0.0.1:8000/auth/users/", data);
            navigate('/login')  
        } catch (error) {
            console.log(error)
        }
        
    }

    return(
        <>
        <form className="registerForm" onSubmit={submitHandler}>
            <input 
                type="email"
                name='email'
                placeholder="Электронный адрес"
                onChange={emailHandler}
            />
            <input 
                type="username"
                name='username'
                placeholder="Имя пользователя"
                onChange={usernameHandler}
            />
            <input 
                type="password" 
                name='password'
                placeholder="Пароль" 
                onChange={passwordHandler}
            />
            <button>Зарегистрироваться</button>
        </form>
        </>
    )
}

export default Register