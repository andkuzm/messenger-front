import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

type AuthState = {
    token: string | null;
    username_stored: string | null;
    userId: number|null;
};

const initialState: AuthState = {
    token: null,
    username_stored: null,
    userId: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials(state, action: PayloadAction<AuthState>) {
            state.token = action.payload.token;
            state.username_stored = action.payload.username_stored;
            state.userId = action.payload.userId;
        },
        logout(state) {
            state.token = null;
            state.username_stored = null;
            state.userId = null;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;