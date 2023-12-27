import { useEffect, useState } from "react"
import './Grid.css'
import { useLocation } from "react-router-dom"
// import moment 

const Grid = (props) => {
    const [moments, setMoments] = useState([])
    const location = useLocation()
    const profileId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)


    useEffect(()=>{
        console.log(props.id, '------------------------grid')
        
        try{
                const response = fetch(`http://localhost:5173/api/moments/${location.state.profile}`)
                .then((response) => response.json())
                .then((jsonData) => {setMoments(jsonData)
                console.log(jsonData)
                console.log(`http://localhost:5173/api/moments/${location.state.profile}`)})
                .catch((error) => console.error('Error fetching data:', error));
            
            
        }catch(error){
            console.log(error)
        } 
    }, [])

    return(
        <div className="gridMoments">
        {
        moments.map((item, index)=>(
            
                <div key={index} className="containerImageMoment">
                    <img src={`${item.image}`} alt="" className="imageMoment"/>
                </div>
            
        ))}
        </div>
    )
}
export default Grid