import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export const createUser = createAsyncThunk(
  "auth/createUser",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const storageRef = ref(storage, data.username);
      const snapshot = await uploadBytesResumable(storageRef, data.file);

      const userDocRef = doc(db, "users", res.user.uid);
      const userDocData = {
        uid: res.user.uid,
        displayName: data.username,
        email: data.email,
        photoURL: await getDownloadURL(snapshot.ref),
      };
      await setDoc(userDocRef, userDocData);

      await updateProfile(res.user, {
        displayName: data.username,
        photoURL: userDocData.photoURL,
      });

      await setDoc(doc(db, "userChats", res.user.uid), {})

      return userDocData;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const userData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
      return userData;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const signOut = createAsyncThunk("auth/signOut", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    signOut(auth);

    return {};
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: {}, isLoading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(signIn.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(signOut.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(signOut.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
