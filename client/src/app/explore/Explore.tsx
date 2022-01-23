import React, { useContext, useEffect, useState } from "react";
import AnimalCard from "../nft-business/display/AnimalCard";
import { Web3Context } from "../../context/Web3Context";


import { NFTS_TO_LOAD, NFT_DISPLAY, Web3ContextValues } from "../../core";

import "./explore.css";

export default function Explore() {
    const {contract, address, autoConnect, networkId, contractAddress}: Web3ContextValues = useContext(Web3Context);
    const [tokenCount, setTokenCount] = useState(0);
    const [tokens, setTokens] = useState<any[]>([]);
    const [show, setShow] = useState<number>(NFT_DISPLAY);
    const [counter, setCounter] = useState(0);
    const [loaded, setLoaded] = useState(0);
    const [dropped, setDropped] = useState(0);
    const loadTime = 5
    

    function load() {
        return loaded >= (NFTS_TO_LOAD) || loaded >= tokens.length;
    }
    useEffect(() => {
        
        autoConnect();
        setTimeout(() => {
            setCounter(prev => prev + 1);
        }, 250)
    }, [])
    useEffect(() => {
        if (contract && contractAddress) {
            contract.methods.getUser(contractAddress).call({from:address}).then((res:any) => {
                setTokens(res.tokens);
            })
            contract.methods.tokenCount().call({from: address})
                .then((res: number) => setTokenCount(res));
            contract.methods.state().call({from: address}).then((res: any) => {
                console.log(res);
                setDropped(res);
            })
        }
    }, [contract])
    return (
        <div id = "explore" className = "background-container" style = {{display: counter? "block" : "none" }}>
            <header>
                <h1> Marketplace </h1>
                {/* <p>
                    The rarer the species, the more expensive. Stay tuned for when new NFTs will be minted.
                </p> */}
            </header>
            {!load() &&
            <div className= "loading">
                <div>
                    <h2> Loading...({Math.floor(Math.max(100 * loaded/NFTS_TO_LOAD, 0))}%) </h2>
                    <br />
                    <div className="loading-bar" style = {{width: 350}}> 
                        <div className="progress" style = {{width: (loaded) * (350/NFTS_TO_LOAD)}}/> 
                    </div>
                    {/* <h2>
                    If this page is not loading, try checking to see if you are securely connected(https) or try switching browsers
                    </h2> */}
                </div>
            </div>}
           <div className = "nfts" style = {{display: load()? "flex" : "none"}}>
                {tokens.slice(0, Math.min(show, tokens.length)).map((id, i) => (
                    <AnimalCard dropped = {dropped} onLoad = {() => setLoaded(prev => prev + 1)} id = {+id} key = {i} />
                ))}
           </div>
           {show < tokens.length && <div style = {{display: "flex", width: "100%", justifyContent: "center"}}>
                <button className= "call-to-action primary" onClick = {() => setShow(prev => prev + NFT_DISPLAY)}> Load More </button>
           </div>}
        </div>
    )
}