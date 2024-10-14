import { configureStore } from "@reduxjs/toolkit";
import socialReducer from "../state/socialSlice";

export const Store = configureStore({
    reducer: {
        social: socialReducer
    }
})