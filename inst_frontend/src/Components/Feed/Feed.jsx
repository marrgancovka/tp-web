import { useEffect, useState } from "react";
import './Feed.css'
import like from './actions.png'
import comment from './comment.png'
import { useLocation, useNavigate } from "react-router-dom";
import InfiniteScroll from "../Scroll/Scroll";
// import moment from "./moment9.jpg"

const Feed = (props) => {
    const [page, setPage] = useState(0);
    const count = 5
    const [loading, setLoading] = useState(true);
    
    const [moments, setMoments] = useState([])
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
          if (
            window.innerHeight + document.documentElement.scrollTop !==
            document.documentElement.offsetHeight
          )
            return;
          setLoading(true);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);
    
      useEffect(() => {
        if (!loading) return;
        
        setTimeout(() => {
          try{
            setLoading(true)
            const resp_moments = fetch(`http://localhost:8000/moments/${location.state.me}/?feed=true&offset=${page}&count=${count}`)
                .then((response) => response.json())
                .then((jsonData) => {
                    if (!jsonData.length) return setLoading(true);
                    setMoments(moments.concat(jsonData))
                    console.log(jsonData)
                    setPage(page + count);
                    setLoading(false);}
                    )
                
            }catch(error){
                console.log(error)
        }   
        }, 1000);
      }, [loading]);



    // useEffect(()=>{
    //     try{
    //         const resp_moments = fetch(`http://localhost:8000/moments/${location.state}/?feed=true`)
    //             .then((response) => response.json())
    //             .then((jsonData) => {setMoments(jsonData)
    //             console.log(jsonData)})
    //     }catch(error){
    //         console.log(error)
    //     }   
    // }, [])

    return(
        <div className="main_feed">
            {moments.map((item, index)=>(
                <div className="feed" key={index}>
                    <div className="head ml">
                        <div className="ava"></div>
                        <div onClick={()=>{location.state.profile=item.author; navigate(`/profile/${item.author}`, {state: location.state})}} className="name">{item.author_info.user_info.username}</div>
                    </div>
                    <div className="image">
                        <img src={`${item.image}`} alt={item.image} className="image_image"/>
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
            {/* {loading && <p>Loading...</p>} */}
        </div>
    )
}

export default Feed;