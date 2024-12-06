import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { adminServerURl } from '../../serverURL';

const initialState = {
  message: '',
  users: '',
  loading: '',
};

export const getAllUsers = createAsyncThunk('Users', async () => {
  try {
    const res = await fetch(`${adminServerURl}/get-users`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  } catch (err) {
    return err;
  }
});

export const getUser = createAsyncThunk('User', async (userId) => {
  try {
    const res = await fetch(`${adminServerURl}/get-user`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userId),
    });
    return await res.json();
  } catch (err) {
    return err;
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Users: (state, action) => {
    //     state.users = localStorage.getItem('users');
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        if (payload.message) {
          state.loading = false;
          state.users = payload.result;
          state.message = payload.message;
          state.error = '';
        } else {
          state.error = payload.message;
        }
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.loading = true;
      });
  },
});

export const { Users } = userSlice.actions;
export default userSlice.reducer;
