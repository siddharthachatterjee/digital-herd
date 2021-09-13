import React, { useContext, useEffect, useState } from "react";
import AnimalCard from "../components/AnimalCard";
import { Web3Context } from "../context/Web3Context";

import "../styles/explore.css";

export default function Explore() {
    const {contract, address, autoConnect} = useContext(Web3Context);
    const [tokenCount, setTokenCount] = useState(0);

    useEffect(() => {
        autoConnect();
    }, [])
    useEffect(() => {
        if (contract) {
            contract.methods.tokenCount().call({from: address})
                .then((res: number) => setTokenCount(res))
        }
    }, [contract])
    return (
        <div id = "explore" className = "background-container">
            <header>
                <h1> Explore Thousands of NFTs </h1>
                <p>
                    The rarer the species, the more expensive. Stay tuned for when new NFTs will be minted.
                </p>
            </header>
           <div className = "nfts">
                {Array(tokenCount).fill(null).map((_, i) => (
                    <AnimalCard id = {i} key = {i} />
                ))}
           </div>
        </div>
    )
}