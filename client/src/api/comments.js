import axios from "axios"
import { socket } from "../socket"

export const addComment = async (newComment, postId, token) => {    
    await axios.post('http://localhost:4000/comments/add-comment', {content: newComment, postId: postId}, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      socket.emit('newComment', res.data)
      console.log(res.data);
    })
    .catch(err => {
        console.log(err);
    })
}