import { apolloClient } from "@/lib/graphql/apollo";
import { LOGIN } from "@/lib/graphql/mutations/Login";
import { REGISTER } from "@/lib/graphql/mutations/Register";
import type { LoginInput, RegisterInput, UserType } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type RegisterMutationData = {
    register: {
        token: string
        refreshToken: string
        user: UserType
    }
};

type LoginMutationData = {
    login: {
        token: string
        refreshToken: string
        user: UserType
    }
};

interface AuthState {
    token: string | null;
    user: UserType | null;
    isAuthenticated: boolean;
    signup: (data: RegisterInput) => Promise<boolean>;
    login: (data: LoginInput) => Promise<boolean>;
    logout: () => void;
    replaceName: (newName: string) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
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
                        const { user, token } = data.login;

                        set({
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email
                            },
                            token,
                            isAuthenticated: true
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
                        const { token, user } = data.register;

                        set({
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email
                            },
                            token,
                            isAuthenticated: true
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
                    isAuthenticated: false
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
    ));