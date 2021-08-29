import React, { useContext, useState } from "react";
import { Web3Context } from "../context/Web3Context";

import "../styles/sign-up.css";

export default function SignUp() {
    const {connect, address, loading, error} = useContext(Web3Context);
    const stepTitles = ["Connect a Wallet", "Enter Details", "Done"];
    const [curStep, setCurStep] = useState(0);
    const steps = [
        <div>

            {!address ? (
                <div>
                    {loading? "Connecting..." : "You need to connect to an Ethereum wallet."}
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
                    Address: {address}
                </div>
            )}
        </div>
    ];
    return (
        <div id = "sign-up" className = "background-container">
            <main>
                <div className = "step-titles">
                    {stepTitles.map((title, i) => (
                        <div className = "step-title" key = {i}>
                            <div className = "number" style = {{background: i == curStep? "white" : "auto", color: i == curStep? "black" : "auto"}}> {(i >= curStep) ? i + 1 : "Check"} </div>
                            <div>{title} </div>
                        </div>
                    ))}
                </div>
                {steps[curStep]}
            </main>
        </div>
    );
}