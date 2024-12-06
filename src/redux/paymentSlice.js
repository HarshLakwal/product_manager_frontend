import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { token, userServerURL } from '../../serverURL';

const initialState = {
    message: '',
    error: '',
    isLoading: '',
};
const config = {
    headers: { Authorization: `Bearer ${token}` },
};
export const makePayment = createAsyncThunk('Payment', async (data) => {
    try {
        const res = await axios.post(`${userServerURL}/repayment`, data, config);
        return res.data;
    } catch (err) {
        return err;
    }
});

const paymentSlice = createSlice({
    name: 'makePayment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(makePayment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(makePayment.fulfilled, (state, { payload }) => {
                console.log(payload)
                if (payload.status) {
                    state.isLoading = false;
                    state.message = payload.message;
                    state.error = '';
                    toast.success(payload.message)
                } else {
                    state.error = payload.message;
                    toast.error(payload.response.data.message)
                }
            })
            .addCase(makePayment.rejected, (state) => {
                state.isLoading = true;
            });
    },
});

export default paymentSlice.reducer;
