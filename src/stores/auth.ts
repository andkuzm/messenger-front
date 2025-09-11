import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

type AuthState = {
    token: string | null;
    username: string | null;
    user_id: bigint|null;
};

const initialState: AuthState = {
    token: null,
    username: null,
    user_id: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials(state, action: PayloadAction<AuthState>) {
            state.token = action.payload.token;
            state.username = action.payload.username;
            state.user_id = action.payload.user_id;
        },
        logout(state) {
            state.token = null;
            state.username = null;
            state.user_id = null;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;