import { useState } from "react";
import './Register.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Register(){
    const [email, setEmail]  = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const [emailError, setEmailError] = useState('')
    const [passError, setPassError] = useState('')
    const [usernameError, setUsernameError] = useState('')


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
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (email == ""){
                setEmailError('Обязательое поле!')
            }
            else if (!emailPattern.test(email)){
                setEmailError('Некорректный электронный адрес!')
            }
            else if (emailPattern.test(email)){
                setEmailError('')
            }
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
            if (password == ''){
                setPassError('Обязательое поле!')
            }
            else if (!passwordPattern.test(password)){
                setPassError('Пароль должен содержать строчные, заглавные символы и цифры, длина не менее 8 символов')
            }
            else if (passwordPattern.test(password)){
                setPassError('')
            }
            const usernamePattern = /^[a-zA-Z0-9][a-zA-Z0-9._]{0,29}$/;
            if (username == ''){
                setUsernameError('Обязательое поле!')
            }
            else if (!usernamePattern.test(username)){
                setUsernameError('Некорректное имя пользователя!')
            }
            else if (usernamePattern.test(username)){
                setUsernameError('')
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
            {(emailError!='') && <span className="errors">{emailError}</span>}
            <input 
                type="username"
                name='username'
                placeholder="Имя пользователя"
                onChange={usernameHandler}
                className="input_reg"
                autoComplete="off"
            />
            {(usernameError!='') && <span className="errors">{usernameError}</span>}

            <input 
                type="password" 
                name='password'
                placeholder="Пароль" 
                onChange={passwordHandler}
                className="input_reg"
                autoComplete="off"
            />
            {(passError!='') && <span className="errors">{passError}</span>}

            <button onClick={submitRegisterHandler} className="btn_reg">Зарегистрироваться</button>
        </form>
        </>
    )
}

export default Register