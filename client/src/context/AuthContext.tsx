import React, { useEffect, useState } from "react";

import {getAuth, onAuthStateChanged, User} from "firebase/auth";

export const AuthContext = React.createContext<User | null>(null);

export function AuthContextProvider(props: {children: any}) {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        onAuthStateChanged(getAuth(), (authUser) => {
            setUser(authUser);
        })
    }, [])
  
    return (
        <AuthContext.Provider value = {user}>
            {props.children}
        </AuthContext.Provider>
    );
}