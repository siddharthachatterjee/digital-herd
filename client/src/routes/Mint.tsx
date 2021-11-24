import React, { useContext, useEffect, useState, useRef } from "react";
import MintToken from "../components/MintToken";
import AnimalImage from "../components/AnimalImage";

import { Web3Context } from "../context/Web3Context";
import {IPFSContext} from "../context/IPFSContext";
import { art, backdrops } from "../core/vars";



export default function Mint() {
    const {address, connect, contract} = useContext(Web3Context);
    const {ipfs} = useContext(IPFSContext);
    const [tokens, setTokens] = useState<any[]>([]);

    useEffect(() => {   
        connect();
    }, []);

    function onDrawn(canvasRef: any, animal: any, backdrop: string) {
        (async () => {
            const {cid} = await ipfs.add(canvasRef.current.toDataURL()); 
            const obj = JSON.stringify({name:`${animal.species},${backdrop}`,image:`https://ipfs.io/ipfs/${cid}`,species:animal.species});
            setTokens(prev => [...new Set([...prev, obj])])
        })();
    }

    function mintAll() {
        contract.methods.createCollectibles(tokens).send({from: address})
    }



    return address  && ipfs && (
        <>
        <h1> Mint these tokens: </h1>
        {art.map((animal, i) => (
            backdrops[animal.species].map((bd, j) => (
                <AnimalImage onDrawn = {(cnvsRef: any) => {onDrawn(cnvsRef, animal, bd)}}  image = {animal.image} background = {bd}  />
            ))
        ))} 
        <br />
        <h2> Data: </h2>
        {tokens}
        <br />
        <button onClick = {mintAll}> Mint All </button>
        </>
    );
}