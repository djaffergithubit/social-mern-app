import { useEffect } from "react"
import axios from "axios"
import { selectChatMessages, selectMessages, selectToken, setMessages } from "../state/socialSlice"
import { useSelector, useDispatch } from "react-redux"

export const getMessages = (currentChat) => {

    const chatMessages = useSelector(selectChatMessages)
    const token = useSelector(selectToken)
    const dispatch = useDispatch()

    const getFunc = async () => {
        await axios.get(`http://localhost:4000/messages`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            dispatch(setMessages(res.data))
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(()=>{
        getFunc()
    }, [currentChat])
}


export const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('content', file);

    try {
        const response = await axios.post('http://localhost:4000/upload-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data.fileUrl;  // The uploaded image URL
    } catch (error) {
        console.error('Error uploading file:', error);
        return null;
    }
};