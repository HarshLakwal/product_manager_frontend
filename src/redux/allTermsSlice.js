import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Admintoken, adminServerURl, token, userServerURL } from '../../serverURL';

const initialState = {
    message: '',
    error: '',
    isLoading: '',
};
export const allTerms = createAsyncThunk('loan', async (termId) => {
    try {
        const res = await axios.get(`${userServerURL}/get-my-loan`, {
            params: { termId: termId },
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data)
        return res.data;
    } catch (err) {
        return err;
    }
}); // slice for user

const allTermsSlice = createSlice({
    name: 'getLoan',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(allTerms.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(allTerms.fulfilled, (state, { payload }) => {
                console.log("sdfghjk", payload)
                if (payload.status) {
                    state.isLoading = false;
                    state.message = payload?.term.loans[0];  // Adjusted this line
                    state.error = '';

                } else {
                    state.error = payload.message;
                }
            })
            .addCase(allTerms.rejected, (state) => {
                state.isLoading = true;
            });
    },
});


export default allTermsSlice.reducer