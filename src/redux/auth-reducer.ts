import { User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
    user: null | User;
};

const initialState: AuthState = {
    user: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: User }>) => {
            state.user = action.payload.user;
        },

        logout: (state) => {
            state.user = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
