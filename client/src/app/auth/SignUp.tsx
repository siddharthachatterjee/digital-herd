import React, { useContext, useEffect, useState } from "react";
import InputBox from "../../components/InputBox";
import { Web3Context } from "../../context/Web3Context";

//import {getAuth, onAuthStateChanged, createUserWithEmailAndPassword,updateProfile,sendEmailVerification,} from "firebase/auth";
import {getDatabase, ref,set} from "firebase/database";

import "./sign-up.css";
import { useHistory, useLocation } from "react-router";


export default function SignUp() {
    const {address, loading, error, connectWalletLink, connectMetamask} = useContext(Web3Context);
 
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const stepTitles = ["Connect Wallet", "Enter Details", "Done!"];
    const [curStep, setCurStep] = useState(0);

    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (address && curStep === 0) {
            setCurStep(prev => prev + 1);
        }
    }, [address]);
    
    useEffect(() => {
        [...Array.from(document.getElementsByClassName("step-content"))].forEach((elem) => {
            elem.animate([
                { transform:'translateX(70px)', opacity: 0},
                { transform:"translateX(0px)", opacity: 1 }
            ], {
                duration: 500
            });
        })
    }, [curStep])

    async function signUp() {
        const db = getDatabase();
        set(ref(db, 'users/' + address), {
            username,
            email,
        });
        //await contract.methods.signUp(username).send({from: address});
        setCurStep(prev => prev + 1);
        // setFirebaseLoading(true);
        // createUserWithEmailAndPassword(getAuth(), email, password)
        // .then(({user}) => {
        //     setFirebaseLoading(false);
        //    // setLoggingIn(false);
        //     updateProfile(user, {
        //         displayName: username || "Unnamed User",
        //     }).then(() => {

        //         sendEmailVerification(user);
        //         setCurStep(prev => prev+ 1)
               
        //       //  setUser(firebase.auth().currentUser);
        //       //  window.location = window.location.search.split("=")[1] || "/"
        //     })
        // })
        // .catch(err => {
        //     setFirebaseError(err);
        //     setFirebaseLoading(false);
        // })
    }

  
    const steps = [
        <div>

            {!address ? (
                <div>
                    <h3> Connect a Wallet </h3>
                
                    
                    {loading &&"Connecting..." }
                    <br />
                    {error && !loading &&  (
                        <div style = {{color: "red"}}>
                            ERROR: {error.message}
                        </div>
                    )}
                    <br />

                    <button disabled = {loading} onClick = {() => connectWalletLink()} className = "call-to-action primary">
                        Connect to Coinbase Wallet
                        {/* <img className = "hidden" src = "/walletlink.jpg" width = {20} style = {{margin: "0 10px"}} />  */}
                    </button>
                    <button disabled = {loading} onClick = {() => connectMetamask()} className = "call-to-action secondary"> 
                        Connect to MetaMask 
                        {/* <img src = "/metamask.svg" style = {{margin: "0 10px"}} />  */}
                    </button>
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
            Profile name:
            <InputBox className = "dark" state = {username} updateState = {setUsername} />
            <br />
            <br />
            Email(optional): 
            <InputBox className = "dark" state = {email} updateState = {setEmail} />
            {/* <br />
            <br />
            Password:
            <InputBox className = "dark" state = {password} updateState = {setPassword} type = "password" />
            <br /> */}
            <button className = "call-to-action primary" disabled = {username.length === 0} onClick = {signUp}>
                Continue
            </button>
            
        </div>,
        <div>
            <h3> Welcome! </h3>
            <p>
                Thank you for signing up. Now build your zoo!
            </p>
            <button className = "call-to-action primary" onClick = {() => {
                window.location.replace(location.search.split("=")[1] || "/");
                //window.location.search = "";
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
                        <div className = {`step-title ${curStep === i? "current" : i < curStep? "completed" :  ""}`} key = {i}>
                            <div className = "number"> 
                            {(i >= curStep) ? <i className={`ri-number-${i+1}`}></i> : 
                            <i style = {{fontSize: 20, color: "var(--theme-complementary-contrast)"}} className="ri-check-fill"></i>} 
                            </div>
                            <div className = "title">{title} </div>
                        </div>
                    ))}
                </div>
                <div className = "step-content">
                    {steps[curStep]}
                </div>
            </main>
        </div>
    );
}