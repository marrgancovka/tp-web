import { useLocation } from 'react-router-dom'
import './Headprofile.css'
import baseavatar from './avatar4.jpg'
import { useEffect, useState } from 'react'

const Headprofile = () => {
    const location = useLocation()
    const [count, setCount] = useState({})
    const [user, setUser] = useState({})
    const isMe = (location.state.me === location.state.profile)
    const profileId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)


    useEffect(()=>{
        try{
            console.log(location.state)
            const resp_count = fetch(`http://localhost:8000/subscriptions/count/${profileId}`)
                .then((response) => response.json())
                .then((jsonData) => {setCount(jsonData)
                console.log(jsonData)})
            const resp_me = fetch(`http://localhost:8000/profile/me/${profileId}/`)
                    .then((response)=>response.json())
                    .then((jsonData)=>{setUser(jsonData[0])
                        console.log(jsonData)
                        console.log(user)
                    })
        }catch(error){
            console.log(error)
        }   
    }, [])


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
            {!isMe && <button>Подписаться</button>}
        
        </div>
    )
}
export default Headprofile