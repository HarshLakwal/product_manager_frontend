import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import usersSlice from "./usersSlice.js";
import makePayment from "./paymentSlice.js";
import userLoanSlice from "./loansSlice.js";
import allTermsSlice from "./allTermsSlice.js";
const Store = configureStore({
  reducer: {
    user: authSlice,
    users: usersSlice,
    payment: makePayment,
    userLoans: userLoanSlice,
    allTerms: allTermsSlice
  },
});

export default Store;
 