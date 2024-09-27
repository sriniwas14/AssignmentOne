import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../utils/AxiosInstance";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    resetPassword: (email: string, password: string) => Promise<void>;
    signup: (
        firstName: string,
        lastName: string,
        email: string,
        organization: string,
        password: string
    ) => Promise<void>;
    logout: () => void;
    userData?: UserData;
    updateProfilePic: (file: File) => Promise<void>;
    updateProfile: (data: {
        firstName?: string;
        lastName?: string;
        email?: string;
    }) => Promise<void>;
}

type UserData = {
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserData>();

    useEffect(() => {
        const token = localStorage.getItem("token");

        setIsAuthenticated(!!token);
        if (token) {
            fetchUserData();
        }
    }, []);

    const fetchUserData = async () => {
        const response = await axios.get("/user/settings");

        if (!response.data.success) throw "Something went wrong!";

        setUserData(response.data.data);
    };

    const login = async (email: string, password: string) => {
        const response = await axios.post("/auth/signin", { email, password });

        if (!response.data.success) throw response.data.message;

        localStorage.setItem("token", response.data.token);
        setIsAuthenticated(true);
        await fetchUserData();
    };

    const resetPassword = async (email: string, password: string) => {
        const response = await axios.post("/auth/reset-password", {
            email,
            password,
        });

        if (!response.data.success) throw response.data.message;
    };

    const updateProfilePic = async (file: File) => {
        const formData = new FormData();
        formData.append("profilePicture", file);

        const response = await axios.post("/user/profile-picture", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (!response.data.success) throw response.data.message;

        await fetchUserData();

        return response.data;
    };

    const signup = async (
        firstName: string,
        lastName: string,
        email: string,
        organization: string,
        password: string
    ) => {
        const response = await axios.post("/auth/signup", {
            email,
            password,
            firstName,
            lastName,
            organization,
        });

        if (!response.data.success) throw response.data.message;

        localStorage.setItem("token", response.data.token);
        setIsAuthenticated(true);
        await fetchUserData();
    };

    const updateProfile = async (data: {
        firstName?: string;
        lastName?: string;
        email?: string;
    }) => {
        const response = await axios.post("/user/settings", {
            ...data,
        });

        if (!response.data.success) throw response.data.message;

        await fetchUserData();
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                signup,
                logout,
                resetPassword,
                userData,
                updateProfilePic,
                updateProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
