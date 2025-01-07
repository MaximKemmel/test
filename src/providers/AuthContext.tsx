import React from "react";

interface AuthContextProps {
    auth: boolean
}

const AuthContext = React.createContext<AuthContextProps | null>(null);

const AuthProvider = AuthContext.Provider

const useAuthContext = () => {
    const data = React.useContext(AuthContext)

    if (!data) {
        throw new Error(`Невозможно использовать useAuthContext вне AuthProvider`)
    }

    return data;
}

export {AuthProvider, useAuthContext}
