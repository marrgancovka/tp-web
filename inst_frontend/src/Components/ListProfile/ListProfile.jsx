import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"


const ListProfile = (props) => {
    const location = useLocation()
    const navigate = useNavigate()


    const authorHeandler = () => {
        location.state.profile = props.item.id
        navigate(`/profile/${props.item.author}`, {state: location.state})
    }

    

    return(
        <div className="profile">
            <img src={props.item.avatar} alt="" className="myavatar" onClick={authorHeandler}/>
            <div className="username" onClick={authorHeandler}>{props.item.user_info.username}</div>
        </div>   
    )
}
export default ListProfile