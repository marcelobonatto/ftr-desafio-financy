import { apolloClient } from "@/lib/graphql/apollo";
import { LOGIN } from "@/lib/graphql/mutations/Login";
import { REGISTER } from "@/lib/graphql/mutations/Register";
import type { LoginInput, RegisterInput, UserDataType } from "@/types";
import { isTokenExpired } from "@/utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type RegisterMutationData = {
    register: {
        token: string
        refreshToken: string
        user: UserDataType
    }
};

type LoginMutationData = {
    login: {
        token: string
        refreshToken: string
        user: UserDataType
    }
};

interface AuthState {
    token: string | null;
    refreshToken: string | null;
    user: UserDataType | null;

    signup: (data: RegisterInput) => Promise<boolean>;
    login: (data: LoginInput) => Promise<boolean>;
    logout: () => void;
    replaceName: (newName: string) => void;

    isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: () => {
                const storage = localStorage.getItem("auth-storage");
                if (!storage) return false;

                const parsed = JSON.parse(storage);
                const token = parsed?.state?.token;
                if (!token) return false;

                return !isTokenExpired(token);
            },
            login: async (loginData: LoginInput) => {
                try {
                    const { data } = await apolloClient.mutate<LoginMutationData, { data: LoginInput }>({
                        mutation: LOGIN,
                        variables: {
                            data: {
                                email: loginData.email,
                                password: loginData.password
                            }
                        }
                    });

                    if (data?.login && data.login.token) {
                        const { user, token, refreshToken } = data.login;

                        set({
                            user,
                            token,
                            refreshToken
                        })

                        return true;
                    }

                    return false;
                } catch (error) {
                    console.error("Erro ao fazer o login:", error);
                    throw error;
                }
            },
            signup: async (registerData: RegisterInput) => {
                try {
                    const { data } = await apolloClient.mutate<RegisterMutationData, { data: RegisterInput }>({
                        mutation: REGISTER,
                        variables: {
                            data: {
                                name: registerData.name,
                                email: registerData.email,
                                password: registerData.password
                            }
                        }
                    });

                    if (data?.register) {
                        const { token, user, refreshToken } = data.register;

                        set({
                            user,
                            token,
                            refreshToken
                        });

                        return true;
                    }

                    return false;
                } catch (error) {
                    console.error("Erro ao fazer o cadastro:", error);
                    throw error;
                }
            },
            logout: () => {
                set({
                    user: null,
                    token: null,
                    refreshToken: null
                });

                apolloClient.clearStore();
            },
            replaceName: (newName: string) => {
                set((state) => {
                    if (state.user) {
                        return {
                            user: {
                                ...state.user,
                                name: newName
                            }
                        }
                    }
                    return state;
                })
            }
        }),
        {
            name: 'auth-storage'
        }
    )
);