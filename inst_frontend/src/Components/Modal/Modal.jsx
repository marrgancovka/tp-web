import { useEffect, useState } from "react";
import ListProfile from "../ListProfile/ListProfile";
import './Modal.css';
import { useLocation, useNavigate } from "react-router-dom";


const ModalWindow = (props) => {
    const [profiles, setProfiles] = useState([])
    const location = useLocation()
    const navigate = useNavigate()

    useEffect (()=>{
        console.log(props, 'props')
        const resp_count = fetch(`http://localhost:8000/subscriptions/${location.state.profile}/?subs=${props.subs}`)
                .then((response) => response.json())
                .then((jsonData) => {setProfiles(jsonData)
                console.log(jsonData)})
    },[])

    return(
        <div className="data_modal">
           <div className="title_modal">{props.title}</div>
           <div className="items_model">
                {profiles.map((item, index)=>(
                    <ListProfile item = {item} key={index}/>
                ))}
           </div>
        </div>
    )
}

export default ModalWindow