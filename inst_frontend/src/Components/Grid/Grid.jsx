import { useEffect, useState } from "react"
import './Grid.css'
// import moment 

const Grid = (props) => {
    const [moments, setMoments] = useState([])
    useEffect(()=>{
        try{
            const response = fetch(`http://localhost:8000/moments/${props.id}`)
                .then((response) => response.json())
                .then((jsonData) => {setMoments(jsonData)
                console.log(jsonData)})
                .catch((error) => console.error('Error fetching data:', error));
        }catch(error){
            console.log(error)
        } 
    }, [])

    return(
        <div className="gridMoments">
        {moments.map((item)=>(
            
                <div className="imageMoment">
                    {/* // <img src={} alt="" /> */}
                    {item.content}
                </div>
            
        ))}
        </div>
    )
}
export default Grid