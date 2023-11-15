import { useEffect, useState } from "react";
import './Feed.css'
import like from './actions.png'
import comment from './comment.png'
import moment from "./moment9.jpg"

const Feed = (props) => {
    const [moments, setMoments] = useState([])

    useEffect(()=>{
        try{
            const resp_moments = fetch(`http://localhost:8000/moments`)
                .then((response) => response.json())
                .then((jsonData) => {setMoments(jsonData)
                console.log(jsonData)})
        }catch(error){
            console.log(error)
        }   
    }, [])

    return(
        <div className="main_feed">
            {moments.map((item)=>(
                <div className="feed">
                    <div className="head ml">
                        <div className="ava"></div>
                        <div className="name">margarita</div>
                    </div>
                    <div className="image">
                        <img src={moment} alt="" className="image_image"/>
                    </div>
                    <div className="feedback ml">
                        <img src={like} alt="" className="feedback_icons"/>
                        <img src={comment} alt="" className="feedback_icons"/>
                    </div>
                    <div className="description ml">
                        <div className="name_desc">margarita</div>
                        <div className="content ml">{item.content}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Feed;