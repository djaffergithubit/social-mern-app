import { createSlice } from "@reduxjs/toolkit"

const initialState = JSON.parse(localStorage.getItem('socialState')) || {
    token: '',
    user: {},
    mode: 'light',
    messages: [],  
    chatMessages: [],
    userNotifications: []
}

const socialSlice = createSlice({
    initialState,
    name: 'social',
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload
            localStorage.setItem('socialState', JSON.stringify(state))
            return state
        },

        setToken: (state, action) => {
            state.token = action.payload
            localStorage.setItem('socialState', JSON.stringify(state))
            return state
        },

        setUser: (state, action) => {
            state.user = action.payload
            localStorage.setItem('socialState', JSON.stringify(state))
            return state
        }, 
        addMessage: (state, action) => {
            state.messages = [...state.messages, action.payload]
            localStorage.setItem('socialState', JSON.stringify(state))
            return state
        },

        setMessages : (state, action) => {
            state.messages = action.payload
            localStorage.setItem('socialState', JSON.stringify(state))
            return state
        },

        AddToChatMessages: (state, action) => {
            state.chatMessages = [...state.chatMessages, action.payload]
            localStorage.setItem('socialState', JSON.stringify(state))
            return state
        },

        setChatMessages: (state, action) => {
            state.chatMessages = action.payload
            localStorage.setItem('socialState', JSON.stringify(state))
            return state
        },

        setUserNotifications: (state, action) => {
            state.userNotifications = action.payload
            localStorage.setItem('socialState', JSON.stringify(state))
            return state
            // const { userId, notifications } = action.payload
            // const currentState = [...state.userNotifications]
            // const userFind = currentState.find(notif => notif.user === userId)
            
            // if (!userFind) {
            //     const newState = [...currentState, {user: userId, notification: notifications}]
            //     state.userNotifications = newState
            //     localStorage.setItem('socialState', JSON.stringify(state))
            //     return state
            // }else{
            //     userFind.notifications = notifications
            //     state.userNotifications = currentState
            //     localStorage.setItem('socialState', JSON.stringify(state))
            //     return state
            // }
        }
    }
})

export const selectMode = state => state.social.mode
export const selectToken = state => state.social.token
export const selectUser = state => state.social.user
export const selectMessages = state => state.social.messages
export const selectChatMessages = state => state.social.chatMessages
export const selectUserNotifications = state => state.social.userNotifications
export const { 
    setMode, 
    setToken, 
    setUser, 
    addMessage, 
    setMessages, 
    AddToChatMessages, 
    setChatMessages ,
    setUserNotifications
} = socialSlice.actions
export default socialSlice.reducer