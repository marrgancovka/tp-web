import { useLocation, useNavigate } from 'react-router-dom'
import './Headprofile.css'
import baseavatar from './avatar4.jpg'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ModalWindow from '../Modal/Modal'
import Modal from 'react-modal'

const Headprofile = (props) => {
    const location = useLocation()
    const [count, setCount] = useState({})
    const [user, setUser] = useState({})
    const isMe = (location.state.me === location.state.profile)
    const [is_sub, setIs_sub] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [subs, setSubs] = useState(false)
    const [title, setTitle] = useState('')
    const navigate = useNavigate()
    

    useEffect(()=>{
        try{
            console.log(location.state)
            console.log(props.id, '------------------------')
            const resp_count = fetch(`http://localhost:8000/subscriptions/count/${location.state.profile}`)
                .then((response) => response.json())
                .then((jsonData) => {setCount(jsonData)
                console.log(jsonData)})
            const resp_me = fetch(`http://localhost:8000/profile/me/${location.state.profile}/`)
                    .then((response)=>response.json())
                    .then((jsonData)=>{setUser(jsonData)
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
    // subscribers
    const openModalsubs = () => { 
        setSubs(true);
        setTitle('Ваши подписки')
        setModalIsOpen(true);
      };
    //subscriptions
    const openModal = () => {
        setSubs(false);
        setTitle('Ваши подписчики')
        setModalIsOpen(true);
      };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };
    const toSettings = () => {
        navigate('/settings', {state: location.state})
    }


    return(
        <div>
        <div className='header'>
            <div className="avatar">
                <img src={`http://127.0.0.1:8000${user?.avatar}`} alt='' className='ava_image'/>
                
            </div>
            <div className="profile_username">
                {user?.user_info?.username}
            </div>
            <div className='container_info'>

                <div className='head_info'>
                    <div className='count'>{count.moments_count}</div>
                    <div>Публикации</div>
                </div>

                <div className='head_info'>
                    <div onClick={openModal} className='count subs'>{count.subscribers_count}</div>
                    <div onClick={openModal} className='subs'>Подписчики</div>
                </div>

                <div className='head_info'>                    
                    <div onClick={openModalsubs} className='count subs'>{count.subscriptions_count}</div>
                    <div onClick={openModalsubs} className=' subs'>Подписки</div>
                </div>

            </div>
            {!isMe && !is_sub && <button className='btn_sub' onClick={subHandler}>Подписаться</button>}
            {!isMe && is_sub && <button className='btn_sub notSub' onClick={subHandler}>Отписаться</button>}
            {isMe && <button className='btn_sub notSub' onClick={toSettings}>Настройки</button>}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className='qwerty'>
                <ModalWindow title={title} subs={subs}/>
            </Modal>
        </div>
        </div>
    )
}
export default Headprofile