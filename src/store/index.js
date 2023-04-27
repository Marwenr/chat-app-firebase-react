import { configureStore } from '@reduxjs/toolkit'
import auth from "./authSlice"
import chats from "./chatsSlice"

export default configureStore({ reducer: { auth, chats } })