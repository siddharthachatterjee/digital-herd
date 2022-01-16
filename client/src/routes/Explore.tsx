import React, { useContext, useEffect, useState } from "react";
import AnimalCard from "../components/AnimalCard";
import { Web3Context } from "../context/Web3Context";


import { Web3ContextValues } from "../core";

import "../styles/explore.css";

export default function Explore() {
    const {contract, address, autoConnect, networkId, contractAddress}: Web3ContextValues = useContext(Web3Context);
    const [tokenCount, setTokenCount] = useState(0);
    const [tokens, setTokens] = useState<any[]>([]);
    const [show, setShow] = useState<number>(50);
    const [counter, setCounter] = useState(0);
    

    function load() {
        return counter >= 10;
    }
    useEffect(() => {
        
        autoConnect();
        let cnt = 0;
        let countdown = setInterval(() => {
            setCounter(prev => prev + 1);
            cnt++;
            if (cnt === 10) {
                clearInterval(countdown);
            }
        }, 100)
    }, [])
    useEffect(() => {
        if (contract && contractAddress) {
            contract.methods.getUser(contractAddress).call({from:address}).then((res:any) => {
                setTokens(res.tokens);
                console.log(res);
            })
            contract.methods.tokenCount().call({from: address})
                .then((res: number) => setTokenCount(res))
        }
    }, [contract])
    return (
        <div id = "explore" className = "background-container">
            <header>
                <h1> Marketplace </h1>
                {/* <p>
                    The rarer the species, the more expensive. Stay tuned for when new NFTs will be minted.
                </p> */}
            </header>
            {!load() &&
            <div className= "loading">
                <div>
                    <h2> Loading... </h2>
                    <br />
                    <div className="loading-bar"> 
                        <div className="progress" style = {{width: (counter + 1) * 50}}/> 
                    </div>
                </div>
            </div>}
           <div className = "nfts" style = {{display: load()? "flex" : "none"}}>
                {tokens.slice(0, Math.min(show, tokens.length)).map((id, i) => (
                    <AnimalCard id = {+id} key = {i} />
                ))}
           </div>
           {show < tokens.length && <div style = {{display: "flex", width: "100%", justifyContent: "center"}}>
                <button className= "call-to-action primary" onClick = {() => setShow(prev => prev + 50)}> Load More </button>
           </div>}
        </div>
    )
}