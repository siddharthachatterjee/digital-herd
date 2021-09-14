import React, { useContext }  from "react";
import { Web3Context } from "../context/Web3Context";
import Modal from "./Modal";


export default function SignIn() {
    const {connectMetamask, connectWalletLink, loading, error, address} = useContext(Web3Context);
    return !address && (
        <div style = {{textAlign: "center", color: "white"}}>
            <Modal>
                <h1> Connect to Continue</h1>
                <h3 />
                {loading &&"Connecting..." }
                <br />
                {error && !loading &&  (
                    <div style = {{color: "red"}}>
                        ERROR: {error.message}
                    </div>
                )}
                <br />
                
                <button disabled = {loading} onClick = {() => connectWalletLink()} className = "call-to-action secondary">
                    Connect to Coinbase Wallet
                    <img src = "/walletlink.jpg" width = {20} style = {{margin: "0 10px"}} /> 
                </button>
                <button disabled = {loading} onClick = {() => connectMetamask()} className = "call-to-action secondary"> 
                    Connect to MetaMask 
                    <img src = "/metamask.svg" style = {{margin: "0 10px"}} /> 
                </button>
            </Modal>
        </div>
    )
}