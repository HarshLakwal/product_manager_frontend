import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { userServerURL } from '../../serverURL';

const initialState = {
  userToken: '',
  user: '',
  loading: false,
  error: '',
};

export const getProfile = createAsyncThunk('userProfile', async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const res = await axios.post(`${userServerURL}/profile`,{}, config);
    return res.data;
  } catch (err) {
    return err;
  }
});

const authSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, { payload }) => {
        if (payload.message) {
          state.error = payload.message;
          state.loading = false;
        } else {
          state.error = '';
          state.loading = false;
          state.user = payload.result;
        }
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = true;
      });
  },
});

export default authSlice.reducer;
