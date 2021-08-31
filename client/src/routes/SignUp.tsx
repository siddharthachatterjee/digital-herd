import React, { useContext, useEffect, useState } from "react";
import InputBox from "../components/InputBox";
import { Web3Context } from "../context/Web3Context";

import {getAuth, onAuthStateChanged, createUserWithEmailAndPassword,updateProfile,sendEmailVerification,} from "firebase/auth";

import "../styles/sign-up.css";


export default function SignUp() {
    const {connect, address, loading, error} = useContext(Web3Context);
    const [firebaseError, setFirebaseError] = useState<any>("");
    const [firebaseLoading, setFirebaseLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const stepTitles = ["Connect Wallet", "Enter Details", "Done!"];
    const [curStep, setCurStep] = useState(0);
    useEffect(() => {
        if (address && curStep === 0) {
            setCurStep(prev => prev + 1);
        }
    }, [address]);

  
    const steps = [
        <div>

            {!address ? (
                <div>
                    <h3> Connect a Wallet </h3>
                    <p>
                        To use our features, you must connect to an Ethereum wallet. If you don't have one, you can download 
                        <a href = "https://metamask.io"> MetaMask </a>. 
                    </p>
                    <p>
                    If you have MetaMask installed, simply click "Connect to MetaMask" and confirm the notification.
                    </p>
                    {loading &&"Connecting..." }
                    <br />
                    {error && !loading &&  (
                        <div style = {{color: "red"}}>
                            ERROR: {error.message}
                        </div>
                    )}
                    <br />

                    <button disabled = {loading} onClick = {connect} className = "call-to-action"> Connect to MetaMask  </button>
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
            Username 
            <InputBox className = "dark" state = {username} updateState = {setUsername} />
            <br />
            <br />
            Email: 
            <InputBox className = "dark" state = {email} updateState = {setEmail} />
            <br />
            <br />
            Password:
            <InputBox className = "dark" state = {password} updateState = {setPassword} type = "password" />
            <br />
            <button className = "call-to-action primary" onClick = {() => {
                setFirebaseLoading(true);
                 createUserWithEmailAndPassword(getAuth(), email, password)
                 .then(({user}) => {
                     setFirebaseLoading(false);
                    // setLoggingIn(false);
                     updateProfile(user, {
                         displayName: username
                     }).then(() => {

                         sendEmailVerification(user);
                         setCurStep(prev => prev+ 1)
                        
                       //  setUser(firebase.auth().currentUser);
                       //  window.location = window.location.search.split("=")[1] || "/"
                     })
                 })
                 .catch(err => {
                     setFirebaseError(err);
                     setFirebaseLoading(false);
                 })
            }}>
                Continue
            </button>
            {firebaseLoading&& "Authenticating..."}
            {firebaseError && <div style = {{color: "red"}}>
                ERROR: {firebaseError.message!.substr(9)}
            </div>}
        </div>,
        <div>
            <h3> Welcome! </h3>
            <p>
                Thank you for signing up. Now build your zoo!
            </p>
            <button className = "call-to-action primary" onClick = {() => window.location.pathname = "/profile"}>
                Continue to Profile
            </button>
        </div>
    ];
    return (
        <div id = "sign-up" className = "background-container">
            <main>
                <div className = "step-titles">
                    {stepTitles.map((title, i) => (
                        <div className = {`step-title ${curStep === i? "current" : ""}`} key = {i}>
                            <div className = "number" style = {{background: i == curStep? "white" : (i >= curStep? "initial" : "green"), color: i == curStep? "black" : "white"}}> 
                            {(i >= curStep) ? <i className={`ri-number-${i+1}`}></i> : 
                            <i style = {{fontSize: 20, color: "white"}} className="ri-check-fill"></i>} 
                            </div>
                            <div className = "title">{title} </div>
                        </div>
                    ))}
                </div>
                {steps[curStep]}
            </main>
        </div>
    );
}