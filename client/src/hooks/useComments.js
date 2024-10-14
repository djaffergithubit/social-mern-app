import axios from "axios"
import { useEffect, useState } from "react"

export const useComments = (token) => {

    const [comments, setComments] = useState([])

    const getComments = async () => {        
        await axios.get(`http://localhost:4000/comments`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            setComments(response.data)   
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(()=>{
        getComments()
    }, [])

    return [comments, setComments]
}