import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

type AuthState = {
    token: string | null;
    username_stored: string | null;
    user_id: number|null;
};

const initialState: AuthState = {
    token: null,
    username_stored: null,
    user_id: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials(state, action: PayloadAction<AuthState>) {
            state.token = action.payload.token;
            state.username_stored = action.payload.username_stored;
            state.user_id = action.payload.user_id;
        },
        logout(state) {
            state.token = null;
            state.username_stored = null;
            state.user_id = null;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;