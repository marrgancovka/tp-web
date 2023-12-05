import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
// import like from './actions.png'
import comment from './comment.svg'
import like from './like.svg'
import like_red from './like_red.svg'

const Moment = (props) => {
    const location = useLocation()
    const navigate = useNavigate()

    const [count_likes, set_count_likes] = useState(props.item.likes_count)
    const [is_like, set_is_like] = useState(props.item.is_liked)


    // useEffect(()=>{
        
    //     try{
    //         console.log(props.id)
    //             const response = fetch(`http://localhost:8000/moments/${location.state}`)
    //             .then((response) => response.json())
    //             .then((jsonData) => {setMoments(jsonData)
    //             console.log(jsonData)
    //             console.log(`http://localhost:8000/moments/${location.state}`)})
    //             .catch((error) => console.error('Error fetching data:', error));
            
            
    //     }catch(error){
    //         console.log(error)
    //     } 
    // }, [])
    const authorHeandler = () => {
        location.state.profile = props.item.author
        navigate(`/profile/${props.item.author}`, {state: location.state})
    }

    const likeHandler = async (event) => {
        event.target.style.fill = "red"
        console.log(event.target)
        let data = {
            "author_id": location.state.me,
            "moment_id": props.item.id
        }
        const response = await axios.post("http://127.0.0.1:8000/moments/like/", data);
        if (response.data['is_delete']){
            set_count_likes(count_likes-1)
            set_is_like(false)
        } else{
            set_count_likes(count_likes+1)
            set_is_like(true)
        }
    }
    

    return(
        <div className="feed">
                    <div className="head ml">
                        <div className="ava"></div>
                        <div onClick={authorHeandler} className="name"> {props.item.author_info.user_info.username}</div>
                    </div>
                    <div className="image">
                        <img src={`${props.item.image}`} alt={props.item.image} className="image_image"/>
                    </div>
                    {Boolean(count_likes) && <div>Понравилось {count_likes} пользователям</div>}
                    <div className="feedback ml">
                        <img src={(is_like && like_red) || (like)} alt="" className="feedback_icons" onClick={likeHandler} />                        
                        <img src={comment} alt="" className="feedback_icons"/>
                    </div>
                    <div className="description ml">
                        <div className="name_desc">{props.item.author_info.user_info.username}</div>
                        <div className="content ml">{props.item.content}</div>
                    </div>
                </div>
    )
}
export default Moment