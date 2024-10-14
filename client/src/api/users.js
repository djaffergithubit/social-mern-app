import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setToken, setUser } from "../state/socialSlice"
import { useNavigate } from "react-router-dom"

export const getUsers = () => {

    const [users, setUsers] = useState([])

    const getUsers = async () =>{
        await axios.get(`http://localhost:4000/users`)
        .then(res => {
            setUsers(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(()=>{
        getUsers()
    }, [])

      return users
}

export const updateUserProfile = async (formData, token) => {


    await axios.post('http://localhost:4000/users/user/edit-profile', formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  export const getCurrentUser = async (token) => {

    const dispatch = useDispatch()

    useEffect(()=>{
        if (token.length > 0) {
            axios.get('http://localhost:4000/users/current-user', {
            headers: {
                Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                dispatch(setUser(res.data.user))
                return res.status.message
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [token])
  }

export const handleLogout = () => {
    const Navigate = useNavigate()
    axios.get('http://localhost:4000/users/logout')
    .then(res => {
        dispatch(setToken(''))
    })
    .catch(err => {
        console.log(err)
    })
}