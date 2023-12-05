import { useLocation } from 'react-router-dom'
import './Headprofile.css'
import baseavatar from './avatar4.jpg'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Headprofile = (props) => {
    const location = useLocation()
    const [count, setCount] = useState({})
    const [user, setUser] = useState({})
    const isMe = (location.state.me === location.state.profile)
    const [is_sub, setIs_sub] = useState(false)
    // const profileId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
    

    useEffect(()=>{
        try{
            console.log(location.state)
            const resp_count = fetch(`http://localhost:8000/subscriptions/count/${location.state.profile}`)
                .then((response) => response.json())
                .then((jsonData) => {setCount(jsonData)
                console.log(jsonData)})
            const resp_me = fetch(`http://localhost:8000/profile/me/${location.state.profile}/`)
                    .then((response)=>response.json())
                    .then((jsonData)=>{setUser(jsonData[0])
                        console.log(jsonData)
                        console.log(user)
                    })
            const resp_sub = fetch(`http://localhost:8000/subscriptions/${location.state.me}/${location.state.profile}/`)
                    .then((response)=>response.json())
                    .then((jsonData)=>{setIs_sub(jsonData['is_sub']); console.log(jsonData['is_sub'])})
        }catch(error){
            console.log(error)
        }   
    }, [])

    const subHandler = async () =>{
        let data = {
            author_id: location.state.profile,
            subscriber_id: location.state.me
        }
        const response = await axios.post("http://127.0.0.1:8000/subscriptions/", data);
        setIs_sub(!is_sub)
        if (is_sub){
        setCount({moments_count: count.moments_count, subscribers_count: count.subscribers_count-1, subscriptions_count: count.subscriptions_count})
        }
        else{
        setCount({moments_count: count.moments_count, subscribers_count: count.subscribers_count+1, subscriptions_count: count.subscriptions_count})
        }
    }


    return(
        <div className='header'>
            <div className="avatar">
                <img src={baseavatar} alt="" className='ava_image'/>
            </div>
            <div className="username">
                {user?.user_info?.username}
            </div>
            <div className='container_info'>

                <div className='head_info'>
                    <div className='count'>{count.moments_count}</div>
                    <div>Публикации</div>
                </div>

                <div className='head_info'>
                    <div className='count'>{count.subscribers_count}</div>
                    <div>Подписчики</div>
                </div>

                <div className='head_info'>                    
                    <div className='count'>{count.subscriptions_count}</div>
                    <div>Подписки</div>
                </div>

            </div>
            {!isMe && !is_sub && <button className='btn_sub' onClick={subHandler}>Подписаться</button>}
            {!isMe && is_sub && <button className='btn_sub notSub' onClick={subHandler}>Отписаться</button>}
        
        </div>
    )
}
export default Headprofile