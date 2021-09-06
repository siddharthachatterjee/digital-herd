import React, { useEffect, useState } from "react";
import Web3 from "web3";

import AnimalsCollectibleContract from "../contracts/AnimalsCollectible.json";

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
            rej({message: "Could not load Ethereum wallet. Make sure you have an Ethereum wallet installed then try again. Download MetaMask at https://metamask.io"});
        }
    })
}

export const Web3Context = React.createContext();

export function Web3ContextProvider(props) {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [networkId, setNetworkId] = useState(null);
    const [contract, setContract] = useState(null);
    function connect() {
        return new Promise((resolve, rej) => {
            setLoading(true);
            initWeb3()
                .then(res => {
                    setLoading(false);
                    if (res.eth === null) {
                        setError({message: "Could not load Ethereum wallet. Make sure you have an Ethereum wallet installed then try again. Download MetaMask at https://metamask.io"})
                        localStorage.removeItem("address");
                        return;
                    }
                    res.eth.getAccounts().then(accounts => {
                       // console.log(window.ethereum.accounts);
                        setAddress(accounts[0]);
                        res.eth.defaultAccount = accounts[0];
                    
                        localStorage.setItem("address", accounts[0]);
                       // window.location.pathname = "/profile";
                       res.eth.net.getId().then(id => {
                           setNetworkId(id);
                         //  networkId_ = res;
                           const network = AnimalsCollectibleContract.networks[id];
                           const instance = new res.eth.Contract(AnimalsCollectibleContract.abi, network && network.address);
                           instance.defaultAccount = address;
                           setContract(instance);
                           (async() => {
   
                               const account_ = await instance.methods.getUser(accounts[0]).call({from: accounts[0]});
                               setAccount(account_);
                           })();
                       })
                    })
                   // let networkId_ = "";
                    setWeb3(res);
        
                    resolve();
                })
                .catch(err => {
                    setLoading(false);
                    setError(err);
                    localStorage.removeItem("address");
                })
        })
    }
    useEffect(() => {
        if (web3 !== null) {
          
        }
    }, [web3])
    return (
        <Web3Context.Provider value = {{connect, account, contract, web3, address, loading, error, networkId}}>
            {props.children}
        </Web3Context.Provider>
    )
}