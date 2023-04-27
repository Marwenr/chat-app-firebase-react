import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const fetchAllUsers = createAsyncThunk("chats/fetchAllUsers", async (term, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const colRef = collection(db, "users")
    const snapshots = await getDocs(colRef)
    const allData = snapshots.docs.map(doc => doc.data())
    return allData
  } catch (err) {
    return rejectWithValue(err.message);
  }
})

const chatsSlice = createSlice({
  name: "chats",
  initialState: { allData: [], userChatInfo: {}, isLoading: false, error: null },
  reducers: {
    changeUser(state, action) {
      state.userChatInfo = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allData = action.payload
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
})

export const { changeUser } = chatsSlice.actions
export default chatsSlice.reducer