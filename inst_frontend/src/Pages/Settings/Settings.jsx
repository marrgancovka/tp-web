import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Navbar from "../../Components/Navbar/Navbar"
import './Settings.css'

const PageSettings = () => {
    const navigate = useNavigate() 
    const location = useLocation()
    const [id, setId] = useState('')
    const [avatar, setAvatar] = useState('')
    const [userinfo, setUserinfo] = useState()
    const [save, setSave] = useState(false)
    const [preview, setPreview] = useState()
    const [isPreview, setIsPreview] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [badData, setBadData] = useState('')


    const get_data = async () => {
        const response = await axios.get(`http://localhost:5173/api/profile/me/${location.state.me}/`)
        setAvatar(response.data.avatar.substring(15, response.data.avatar.lenght))
        setPreview(response.data.avatar.substring(14, response.data.avatar.lenght))
        setUserinfo(response.data.user_info)
        console.log(response.data.avatar.substring(14, response.data.avatar.lenght))
    }

    const usernameHandler = (event) => {
        setUserinfo({
            ...userinfo,
            username: event.target.value
        })
    }
    const avatarHandler = (event) => {
        console.log(event.target.files[0])
        setAvatar( event.target.files[0])
        setPreview(URL.createObjectURL(event.target.files[0]))
        setIsPreview(true)
    }
    const emailHandler = (event) => {
        setUserinfo({
            ...userinfo,
            email: event.target.value
        })
    }
    const firstHandler = (event) => {
        setUserinfo({
            ...userinfo,
            first_name: event.target.value
        })
    }
    const lastHandler = (event) => {
        setUserinfo({
            ...userinfo,
            last_name: event.target.value
        })
    }
    const saveHandler = async () => {
        setBadData('')
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (userinfo.email == ""){
            setEmailError('Нельзя оставить пустой электронный адрес')
        }
        else if (!emailPattern.test(userinfo.email)){
            setEmailError('Некорректный электронный адрес!')
        }
        else if (emailPattern.test(userinfo.email)){
            setEmailError('')
        }
        const usernamePattern = /^[a-zA-Z0-9][a-zA-Z0-9._]{0,29}$/;
        if (userinfo.username == ''){
            setUsernameError('Нельзя оставить пустым имя пользователя')
        }
        else if (!usernamePattern.test(userinfo.username)){
            setUsernameError('Некорректное имя пользователя!')
        }
        else if (usernamePattern.test(userinfo.username)){
            setUsernameError('')
        }
        if (usernameError!='' || emailError!=''){
            return
        }
        try {
            const data = {
                avatar: avatar,
                user_info: userinfo
            }
            await axios.put(`http://localhost:5173/api/profile/${location.state.me}/`, data, {headers: {"Content-Type": "multipart/form-data"}})
            setSave(true)
        } catch (error) {
            setSave(false)
            console.log("Ошибка при сохранении: ", error)
            setBadData('Такое имя пользователя или электронный адрес уже существуют')
        }

    }
    const logoutHandler = (event) =>{
        sessionStorage.removeItem('token')
        navigate('/login')
    }


    
    useEffect(()=>{
        setId(location.state.profile)
        get_data()
    },[])

    return(
        <>
        <Navbar/>
        <div className="settings_page">
            <div className="img_container mg-30">
            <div className="avatar_settings">
                {!isPreview && <img src={"http://127.0.0.1:5173/media/avatars/" + avatar} alt="" className="img_settings"/>}
                {isPreview && <img src={preview} alt="" className="img_settings"/>}
            </div>
            <div class="file-input-container">
                <input type="file" className="file-input" accept="image/*" onChange={avatarHandler}/>
                <label for="fileInput" className="upload-button">Загрузить новое фото</label>
            </div>
            </div>
            <input type ="username" placeholder="Имя пользователя" value={userinfo?.username} className="name_settings" onChange={usernameHandler}/>
            {(usernameError!='') && <span className="errors">{usernameError}</span>}
            <input type ="text" placeholder="Имя" value={userinfo?.first_name} className="name_settings" onChange={firstHandler}/>
            <input type ="text" placeholder="Фамилия" value={userinfo?.last_name} className="name_settings" onChange={lastHandler}/>
            <input type ="email" placeholder="Электронынй адрес" value={userinfo?.email} className="name_settings mg-30" onChange={emailHandler}/>
            {(emailError!='') && <span className="errors save_ok mg-30">{emailError}</span>}
            <button className="btn_settings mg-30" onClick={saveHandler}>Сохранить</button>
            {save && <div className="save_ok mg-30">Изменения сохранены</div>}
            {(badData!='') && <span className="error">{badData}</span>}
                <button className="btn_exit" onClick={logoutHandler}>Выход</button>
                {/* <button className="btn_delete">Удалить аккаунт</button> */}
        </div>
        </>        
    )
}

export default PageSettings