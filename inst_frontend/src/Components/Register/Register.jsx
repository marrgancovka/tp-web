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

    const submitRegisterHandler = async (event) => {
        event.preventDefault();
        try {
            let data = {
                username: username,
                email: email,
                password: password
            }
            console.log(data);
            const response = await axios.post("http://127.0.0.1:8000/auth/users/", data);
            let data_reg = {
                "id_user": response.data['id']
            }
            await axios.post(`http://127.0.0.1:8000/profile/register/`, data_reg)
            navigate('/login')  
        } catch (error) {
            console.log(error)
        }
        
    }

    return(
        <>
        <form className="registerForm" onSubmit={submitRegisterHandler}>
            <input 
                type="email"
                name='email'
                placeholder="Электронный адрес"
                onChange={emailHandler}
                className="input_reg"
                autoComplete="off"
            />
            <input 
                type="username"
                name='username'
                placeholder="Имя пользователя"
                onChange={usernameHandler}
                className="input_reg"
                autoComplete="off"
            />
            <input 
                type="password" 
                name='password'
                placeholder="Пароль" 
                onChange={passwordHandler}
                className="input_reg"
                autoComplete="off"
            />
            <button onClick={submitRegisterHandler} className="btn_reg">Зарегистрироваться</button>
        </form>
        </>
    )
}

export default Register