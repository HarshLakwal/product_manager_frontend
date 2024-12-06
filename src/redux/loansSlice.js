import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Admintoken, adminServerURl, token, userServerURL } from '../../serverURL';

const initialState = {
    message: '',
    error: '',
    isLoading: '',
};
const config = {
    headers: { Authorization: `Bearer ${token}` },
};


export const getUserLoans = createAsyncThunk('loan', async (userId) => {
    try {
        const res = await axios.get(`${adminServerURl}/get-user-loans`, {
            params: { userId: userId },
            headers: { Authorization: `Bearer ${Admintoken}` },
        });
        return res.data;
    } catch (err) {
        return err;
    }
}); // slice for admin



const userLoanSlice = createSlice({
    name: 'getUserLoans',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserLoans.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserLoans.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.isLoading = false;
                    state.message = payload;
                    state.error = '';
                    
                } else {
                    state.error = payload.message;
                }
            })
            .addCase(getUserLoans.rejected, (state) => {
                state.isLoading = true;
            });
    },
});

export default userLoanSlice.reducer
