import './Navbar.css'
import logo from './moments.png'
import home from './home.png'
import actions from './actions.png'
import search from './search.png'
import profile from './profile.png'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const toHome = ()=>{
        navigate('/feed')
    }
    const toActions = ()=>{
        navigate('/actions')
    }
    const toSearch = ()=>{
        navigate('/search')
    }
    const toProfile = ()=>{
        navigate('/profile')
    }

    return(
        <div className='myNavbar'>
            <div className='containerImg'>
                <img onClick={toHome} src={logo} alt="Instagram" className='logo'/>
            </div>
            <div className='containerIcons'>
                <img onClick={toHome} src={home} alt="" className='icons'/>
                <img onClick={toActions} src={actions} alt="" className='icons'/>
                <img onClick={toSearch} src={search} alt="" className='icons'/>
                <img onClick={toProfile} src={profile} alt="" className='icons'/>
            </div>
        </div>
    )
}

export default Navbar;