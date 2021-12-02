import React, { useContext, useEffect, useState } from "react";

import firebase from "../firebase";
import {getAuth, onAuthStateChanged, User} from "firebase/auth";
import {get, child, getDatabase, ref} from "firebase/database";
import { Web3Context } from "./Web3Context";

export const AuthContext = React.createContext<any>(null);

export function AuthContextProvider(props: {children: any}) {
    const [user, setUser] = useState<any>(null);
    const {address} = useContext(Web3Context);
    useEffect(() => {
        if (address && firebase) {
            const dbRef = ref(getDatabase());
            get(child(dbRef, `users/${address}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        setUser(snapshot.val());
                    } else {
                        console.log("No data available");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [address])
  
    return (
        <AuthContext.Provider value = {user}>
            {props.children}
        </AuthContext.Provider>
    );
}