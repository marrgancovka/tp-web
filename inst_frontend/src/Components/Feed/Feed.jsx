import { useEffect, useState } from "react";
import './Feed.css'

import { useLocation, useNavigate } from "react-router-dom";
// import moment from "./moment9.jpg"
import axios from "axios";
import Moment from "../Moment/Moment";

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

    const getData = () => {
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
    }
    
      useEffect(() => {
        if (!loading) return;
        if (!moments.length){
          getData()
          return
        }
        setTimeout(() => {
             getData()
        }, 500);
      }, [loading]);

    return(
        <div className="main_feed">
            {moments.map((item, index)=>(
                <Moment item={item} index = {index} tags={item.tags}/>
            ))}
        </div>
    )
}

export default Feed;