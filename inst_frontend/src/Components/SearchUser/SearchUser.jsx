import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import './SearchUser.css'

const SearchUser = (props) => {
    const location = useLocation()
    const navigate = useNavigate()

    const [users, setUsers] = useState([])
    const [notFound, setNotFound] = useState(false)

    const searchHandler = async (event) => {
        const search = event.currentTarget.value
        if (!search){
            setNotFound(false)
            setUsers([])
            return
        }
        console.log(search)
        const response = await axios.get(`http://127.0.0.1:8000/profile/?search=${search}`);
        console.log(response.data)
        if (!response.data.length || response.status===404){
            setNotFound(true)
            setUsers([])
        } else{
            setNotFound(false)
            setUsers(response.data)
        }
        
    }


    return(
        <div>
            <input type="text" name="search" placeholder="Введите имя пользователя" onChange={searchHandler}/>
            <div className="searchcontainer"> 
                {users.map((item, index)=>(
                    <div className="profile">
                        <img src={item.avatar} alt="" className="myavatar"/>
                        <div className="username">{item.user_info.username}</div>
                    </div>   
                ))}
            </div>
            {notFound && <p>Ничего не найдено :(</p>}
        </div>
        
    )
}
export default SearchUser