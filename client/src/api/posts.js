import axios from "axios"
import { useEffect, useState } from "react"
import { socket } from "../socket"
import { toast } from "react-toastify"

export const usePosts = (token) => {

    const [posts, setPosts] = useState([])

    const getAllPosts = async () => {
        await axios.get('http://localhost:4000/posts', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          setPosts(res.data)
        })
        .catch(err => {
          toast.error('Network Error', {
            className: 'text-base'
          })
        })
      }
    
    useEffect(() => {
        getAllPosts()
        socket.on('liked disliked post', (message) => {
          getAllPosts()
        })

        socket.on('post removed', (message) => {
          getAllPosts()
        })

        socket.on('newPost', (message) => {
          getAllPosts()
        })

        return () => {
          socket.off('newPost')
          socket.off('liked disliked post')
          socket.off('post removed')
        }
    }
    , [])

      return posts
}


export const createNewPost = async (token, formData) => {

    await axios.post('http://localhost:4000/posts/create-post', formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => {
        socket.emit('newPost', { message: 'new post have been created' }) 
        toast.success('Post created successfully', { className: 'text-base' })    
    })
    .catch(err => {
        toast.error('Post creation failed', { className: 'text-base' })
    })
}

export const deletePost = async (token, postId) => {
  await axios.delete(`http://localhost:4000/posts/delete-post`,{
    headers:{
      Authorization: `Bearer ${token}`
    },
  data: {
    postId: postId
  }
}
  )
  .then(res => {
    socket.emit('post removed', 'post removed successfully')
    toast.success('Post removed successfully', { className: 'text-base' })
  })
  .catch(err => {
    toast.error('Post removal failed', { className: 'text-base' })
  })
}

export const toggleLikePost = async (token, postId) => {
  await axios.post('http://localhost:4000/posts/like-dislike-post', {postId: postId}, {
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => {
    socket.emit('liked disliked post', { message: 'toggle post' })
  })
  .catch(err => {
    toast.warning('Something went wrong!!', {
      className: 'text-base'
    })
  })
}