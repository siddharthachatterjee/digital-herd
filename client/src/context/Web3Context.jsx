import React, { useEffect, useState } from "react";
import Web3 from "web3";

function initWeb3() {
    return new Promise((res, rej) => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum)
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(() => res(web3))
                .catch(rej);
        }
        else if (window.web3) {
            const web3 = window.web3;
            res(web3);
        } 
        else {
            const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
            const web3 = new Web3(provider);
            res(web3);
        }
    })
}

export const Web3Context = React.createContext();

export function Web3ContextProvider(props) {
    const [web3, setWeb3] = useState(null);
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    function connect() {
        setLoading(true);
        initWeb3()
            .then(res => {
                setLoading(false);
                if (res.eth === null) {
                    localStorage.removeItem("address");
                    setError({message: "Could not load Ethereum wallet. Make sure you have an Ethereum wallet installed then try again. Download MetaMask at https://metamask.io"})
                }
                res.eth.getAccounts().then(accounts => {
                    setAddress(accounts[0]);
                    localStorage.setItem("address", accounts[0]);
                    window.location.pathname = "/profile";
                })
                
                setWeb3(res);
            })
            .catch(err => {
                localStorage.removeItem("address");
                setLoading(false);
                setError(err);
            })
    }
    return (
        <Web3Context.Provider value = {{connect, web3, address, loading, error}}>
            {props.children}
        </Web3Context.Provider>
    )
}