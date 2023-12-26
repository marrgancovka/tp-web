import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import './NewMoment.css'

const NewMoment = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [content, setContent] = useState(' ')
    const [photo, setPhoto] = useState()
    const [photoPreview, setPhotoPreview] = useState(null);
    const [error, setError] = useState('')

    const contentHandler = (event) => {
        setContent(event.target.value)
    }
    const photoHandler = (event) => {
        const selectedPhoto = event.target.files[0];
        setPhoto(selectedPhoto);

        setPhotoPreview(URL.createObjectURL(selectedPhoto));

    }
    const submitHandler = async (evemt) =>{
        
        let data = {
            content: content,
            image: photo,
            author: location.state.me
        }
        console.log(photo)
        if (photo==undefined){
            setError('Загрузите фотографию')
            return
        }
        const response = await axios.post("http://127.0.0.1:8000/moments/", data, {headers: {"Content-Type": "multipart/form-data"}});        
        navigate('/feed', {state: location.state})
        
    }
    

    return(
        <div className="newMomentContainer">
            {photoPreview && (
                <img
                    src={photoPreview}
                    alt="Photo Preview"
                    className="newMomentpreview"
                />
            )}
            <div className="other">
            <input 
                type="file" 
                name='photo'
                placeholder="Фотография" 
                onChange={photoHandler}
                className="newMomentImage"
                accept="image/*"
            />
            <textarea 
                type="texta"
                name='content'
                placeholder="Добавьте подпись..."
                onChange={contentHandler}
                className="newMomentInput"
                autoComplete="off"
            />
            {error!='' && <div className="error">{error}</div>}
            <button onClick={submitHandler} className="btnNewMoment">Опубликовать</button>
        

            </div>
            </div>
    )
}
export default NewMoment