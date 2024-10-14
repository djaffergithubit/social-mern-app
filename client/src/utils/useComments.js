import axios from "axios"
import { useEffect, useState } from "react"

export const useComments = (postId, token) => {
    const [comments, setComments] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:4000/comments/get-comments/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            setComments(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    })

    return comments
}