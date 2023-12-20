import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"



const ListProfile = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [is_sub, setIs_sub] = useState(false)


    const authorHeandler = () => {
        location.state.profile = props.item.id
        console.log(location.state)
        navigate(`/profile/${props.item.id}`, {state: location.state})
    }

    const subHandler = async () =>{
        let data = {
            author_id: location.state.profile,
            subscriber_id: location.state.me
        }
        const response = await axios.post("http://127.0.0.1:8000/subscriptions/", data);
        setIs_sub(!is_sub)
    }

    useEffect(()=>{
        const resp_sub = fetch(`http://localhost:8000/subscriptions/${location.state.me}/${props.item.id}/`)
                    .then((response)=>response.json())
                    .then((jsonData)=>{setIs_sub(jsonData['is_sub']); console.log(jsonData['is_sub'])})
    })
    

    return(
        <div className="profile">
            <img src={props.item.avatar} alt="" className="myavatar" onClick={authorHeandler}/>
            <div className="username" onClick={authorHeandler}>{props.item.user_info.username}</div>
            {(props.item.id!==location.state.me) && !is_sub && <button className='btn_sub btn_sub_list' onClick={subHandler}>Подписаться</button>}
            {(props.item.id!==location.state.me) && is_sub && <button className='btn_sub notSub btn_sub_list' onClick={subHandler}>Отписаться</button>}
        </div>   
    )
}
export default ListProfile