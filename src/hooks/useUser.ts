import { useQuery, useMutation } from "@tanstack/react-query";
import {api} from "@/lib/api.ts";
import type {User} from "@/types/User.ts";
import { useDispatch } from "react-redux";
import {setCredentials} from "@/stores/auth.ts";
import {jwtDecode} from "jwt-decode";

// POST /user/auth/register
export function useRegisterUser() {
    return useMutation({
        mutationFn: async (registerRequest: { username: string; password: string }) => {
            const res = await api.post(`/user/auth/register`, registerRequest);
            return res.data;
        },
    });
}

interface LoginResponse {
    token: string;
}

interface DecodedToken {
    sub: string;    // username
    userId: number; // custom claim
    exp: number;
    iat: number;
}

// POST /user/auth/login
export function useLoginUser() {
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: async (loginRequest: { username: string; password: string }) => {
            const res = await api.post<LoginResponse>("/user/auth/login", loginRequest);
            return res.data.toString();
        },
        onSuccess: (token) => {
            const decoded = jwtDecode<DecodedToken>(token);

            dispatch(
                setCredentials({
                    token,
                    username_stored: decoded.sub,
                    userId: decoded.userId,
                })
            );
        },
    });
}

// GET /user/me
export function useGetMe() {
    return useQuery({
        queryKey: ["me"],
        queryFn: async () => {
            const res = await api.get(`/user/me`);
            return res.data as string[]; // [id, username]
        },
        retry: 1,
    });
}

// PUT /user/me
export function useUpdateMe() {
    return useMutation({
        mutationFn: async (updatedUser: User) => {
            const res = await api.put(`/user/me`, updatedUser);
            return res.data;
        },
    });
}
