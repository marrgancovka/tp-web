import './Headprofile.css'
const Headprofile = (props) => {


    return(
        <div className='header'>
            <div className="avatar"></div>
            <div className="username">{props.username}</div>
        </div>
    )
}
export default Headprofile