import './Navbar.css'
import logo from './moments.png'
import home from './home.png'
import actions from './actions.png'
import search from './search.png'
import profile from './profile.png'
import newmoment from './new.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [key, setKey] = useState(0)
    

    const toHome = ()=>{
        navigate('/feed', {state: location.state})
    }
    const toActions = ()=>{
        navigate('/actions', {state: location.state})
    }
    const toSearch = ()=>{
        navigate('/search', {state: location.state})
    }
    const toProfile = ()=>{
        location.state.profile = location.state.me
        navigate(`/profile/`, {state: location.state})
    }
    const toNewMoment = ()=>{
        navigate('/new_moment', {state: location.state})
    }

    return(
        <div className='myNavbar'>
            <div className='containerImg'>
                <img onClick={toHome} src={logo} alt="Instagram" className='logo'/>
            </div>
            <div className='containerIcons'>
                <img onClick={toNewMoment} src={newmoment} alt="" className='icons'/>
                <img onClick={toHome} src={home} alt="" className='icons'/>
                <img onClick={toActions} src={actions} alt="" className='icons'/>
                <img onClick={toSearch} src={search} alt="" className='icons'/>
                <img key={key} onClick={toProfile} src={profile} alt="" className='icons'/>
            </div>
        </div>
    )
}

export default Navbar;