import axios from "axios"
import { useEffect, useState } from "react";
import { socket } from "../socket";
import { toast } from "react-toastify";

export const createNewChat = async (token, isGroupChat, participants, chatName) => {
    await axios.post('http://localhost:4000/chats/add-chat', { isGroupChat, participants, chatName }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then((res) => {
        socket.emit('newChat', res.data)
        toast.info('new Chat added', {
            className: 'text-base'
        })
        console.log(res.data);
    })
    .catch((err) => {
        console.log(err);
        toast.error('Error adding chat', { className: 'text-base' })
    })
}

export const useChats = (token) => {

    const [chats, setChats] = useState([])

    const getAllChats = async () => {
        await axios.get('http://localhost:4000/chats', {
        headers: {
            Authorization: `Bearer ${token}`
        }
        })
        .then((res) => {
            setChats(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(()=>{
        getAllChats()
        socket.on('newChat', (message) => {
            getAllChats()
        })
        socket.on('chatDeleted', (message) => {
            getAllChats()
        })

        return () => {
            socket.off('newChat')
        }
    }, [])

    return chats

}

export const removeChat = async (chatId, token) => {
    console.log('token', token);
    
    await axios.delete(`http://localhost:4000/chats/remove-chat/${chatId}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => {
        socket.emit('chatDeleted', { message: 'chat have been deleted' })
        toast.success('Chat removed successfully', { className: 'text-base' })
    })
    .catch(err => {
        console.log(err)
        toast.error('Error removing chat', { className: 'text' })
    })
}