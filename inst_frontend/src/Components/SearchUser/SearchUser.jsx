import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import './SearchUser.css'
import ListProfile from "../ListProfile/ListProfile"

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
        const response = await axios.get(`http://127.0.0.1:5173/api/profile/?search=${search}`);
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
            <div className="input_container">
                <input type="text" name="search" placeholder="Введите имя пользователя" onChange={searchHandler} className="searchinput" autoComplete="off" />
            </div>
            <div className="searchcontainer"> 
                {users.map((item, index)=>(
                    <ListProfile item ={item} key={index}/>
                ))}
            </div>
            {notFound && <div className="notfound">Ничего не найдено :(</div>}
        </div>
        
    )
}
export default SearchUser