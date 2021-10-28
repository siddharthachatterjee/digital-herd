import React, { useContext, useEffect, useState } from "react";
import AnimalCard from "../components/AnimalCard";
import { Web3Context } from "../context/Web3Context";

import AnimalsCollectibleContract from "../contracts/AnimalsCollectible.json";

import "../styles/explore.css";

export default function Explore() {
    const {contract, address, autoConnect} = useContext(Web3Context);
    const [tokenCount, setTokenCount] = useState(0);
    const [tokens, setTokens] = useState<any[]>([]);

    useEffect(() => {
        autoConnect();
    }, [])
    useEffect(() => {
        if (contract) {
            contract.methods.getUser(AnimalsCollectibleContract.networks["3"]["address"]).call({from:address}).then((res:any) => {
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
                <h1> Explore High Quality NFTs </h1>
                <p>
                    The rarer the species, the more expensive. Stay tuned for when new NFTs will be minted.
                </p>
            </header>
           <div className = "nfts">
                {tokens.map((id, i) => (
                    <AnimalCard id = {+id} key = {i} />
                ))}
           </div>
        </div>
    )
}