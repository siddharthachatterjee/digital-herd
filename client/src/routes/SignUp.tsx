import React, { useContext, useEffect, useState } from "react";
import InputBox from "../components/InputBox";
import { Web3Context } from "../context/Web3Context";

import {getAuth, createUserWithEmailAndPassword,updateProfile,sendEmailVerification,} from "firebase/auth";

import "../styles/sign-up.css";

export default function SignUp() {
    const {connect, address, loading, error} = useContext(Web3Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const stepTitles = ["Connect Wallet", "Enter Details", "Verify"];
    const [curStep, setCurStep] = useState(0);
    useEffect(() => {
        if (address && curStep == 0) {
            setCurStep(prev => prev + 1);
        }
    }, [address]) 
    const steps = [
        <div>

            {!address ? (
                <div>
                    {loading? "Connecting..." : 
                    "You need to connect to an Ethereum wallet."}
                    <br />
                    {error && !loading &&  (
                        <div style = {{color: "red"}}>
                            ERROR: {error.message}
                        </div>
                    )}
                    <br />

                    <button disabled = {loading} onClick = {connect} className = "call-to-action primary"> Connect to a wallet </button>
                </div>
            ) : (
                <div>
                    Connected Successfully!
                    <br />
                    Address: {address}
                </div>
            )}
        </div>,
        <div>
            Enter Email: 
            <InputBox className = "dark" state = {email} setState = {setEmail} />
            <br />
            <br />
            Enter Password:
            <InputBox className = "dark" state = {password} setState = {setPassword} type = "password" />
            <br />
            <button className = "call-to-action primary" onClick = {() => {
                 createUserWithEmailAndPassword(getAuth(), email, password)
                 .then(({user}) => {
                    // setLoggingIn(false);
                     updateProfile(user, {
                         displayName: email.split("@")[0]
                     }).then(() => {
                         
                         sendEmailVerification(user);
                       //  setUser(firebase.auth().currentUser);
                       //  window.location = window.location.search.split("=")[1] || "/"
                     })
                 })
            }}>
                Continue
            </button>
        </div>
    ];
    return (
        <div id = "sign-up" className = "background-container">
            <main>
                <div className = "step-titles">
                    {stepTitles.map((title, i) => (
                        <div className = "step-title" key = {i}>
                            <div className = "number" style = {{background: i == curStep? "white" : (i >= curStep? "initial" : "green"), color: i == curStep? "black" : "white"}}> 
                            {(i >= curStep) ? i + 1 : 
                            <i style = {{fontSize: 20, color: "white"}} className="ri-check-fill"></i>} 
                            </div>
                            <div>{title} </div>
                        </div>
                    ))}
                </div>
                {steps[curStep]}
            </main>
        </div>
    );
}