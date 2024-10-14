import axios from "axios";
import { setUserNotifications } from "../state/socialSlice";

export const getAllNotifications = async (token, dispatch, user) => {
    await axios.get('http://localhost:4000/notifications', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then((res) => {
        dispatch(setUserNotifications((res.data).filter(notification => notification.notificationSender !== user._id && notification.chat.participants.includes(user._id))))
    })
    .catch((err) => {
        console.log(err);
    })
}