import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"

const NewMoment = (props) => {
    const location = useLocation()
    const [content, setContent] = useState()
    const [photo, setPhoto] = useState()

    // useEffect(()=>{
        
    //     try{
    //         console.log(props.id)
    //             const response = fetch(`http://localhost:8000/moments/${location.state}`)
    //             .then((response) => response.json())
    //             .then((jsonData) => {setMoments(jsonData)
    //             console.log(jsonData)
    //             console.log(`http://localhost:8000/moments/${location.state}`)})
    //             .catch((error) => console.error('Error fetching data:', error));
            
            
    //     }catch(error){
    //         console.log(error)
    //     } 
    // }, [])

    const contentHandler = (event) => {
        setContent(event.target.value)
    }
    const photoHandler = (event) => {
        setPhoto(event.target.files[0])
    }
    const submitHandler = async (evemt) =>{
        let data = {
            content: content,
            image: photo,
            author: location.state.me
        }
        console.log(data);
        console.log(location.state)
        const response = await axios.post("http://127.0.0.1:8000/moments/", data, {headers: {"Content-Type": "multipart/form-data"}});
        console.log(response.data)
    }
    

    return(
        <div>
            <input 
                type="text"
                name='content'
                placeholder="Добавьте подпись..."
                onChange={contentHandler}
                className="inputForm"
            />
            <input 
                type="file" 
                name='photo'
                placeholder="Фотография" 
                onChange={photoHandler}
                className="inputForm"
            />
            <button onClick={submitHandler} className="btn_login">Опубликовать</button>
        </div>
    )
}
export default NewMoment