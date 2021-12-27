import React, { useContext, useEffect, useState, useRef } from "react";
import MintToken from "../components/MintToken";
import AnimalImage from "../components/AnimalImage";

import { Web3Context } from "../context/Web3Context";
import {IPFSContext} from "../context/IPFSContext";
import { allAccessoryArrays, animals, art, backdrops, shuffleArray } from "../core";

//console.log(allAccessoryArrays(0))

export default function Mint() {
    const {address, connect, contract} = useContext(Web3Context);
    const {ipfs} = useContext(IPFSContext);
    const [tokens, setTokens] = useState<any[]>([]);
    const [checkedAnimal, setCheckedAnimal] = useState<{[K:number]: boolean}>({});
  //  const [a, setA] = useState<any>(null);
    useEffect(() => {   
        connect();
       // console.log(new File(["foo"], "foo.txt", {type: "text/plain"}))
    }, []);

    function onDrawn(canvasRef: any, animal: any, backdrop: string) {
        const buffer = Buffer.from(canvasRef.current.toDataURL().split(",")[1], "base64");
      //  setA(buffer.toJSON());
        (async () => {
            const obj = JSON.stringify({name:`${animal.species},${backdrop}`,image:canvasRef.current.toDataURL(),species:animal.species});
            const {cid} = await ipfs.add(obj, {pin: true}); 
            const url = "https://ipfs.io/ipfs/" + cid.toString();
            setTokens(prev => [...new Set([...prev, url])])
        })();
    }

    function mintAll() {
        let shuffled = tokens;
        shuffleArray(shuffled);
        for (let i = 0; i < shuffled.length/10; i++) {
        contract.methods.createCollectibles(shuffled.slice(i * 10, Math.min((i + 1) * 10, shuffled.length - 1))).send({from: address})
        }
    }



    return address  && ipfs && (
        <>
        
        <h1> Mint these tokens: </h1>
        {animals.map((animal, i) => (
            animal.backdrops.map((bd, j) => (
                animal.faces.map((face, k) => (
                    allAccessoryArrays(i).map((accessory, l) => (
                        <AnimalImage accessories = {accessory} onDrawn = {(cnvsRef: any) => {onDrawn(cnvsRef, animal, bd)}}  image = {face} background = {bd}  />
                    ))
                ))
            ))
                ))} 
        <br />
        
        <h2> Data: </h2>
        {/* {a && <img src = {"data:image/png;base64," + Buffer.from(a).toString("base64")} />} */}
        {tokens.length}
        <br />
        <button onClick = {mintAll}> Mint All </button>
        </>
    );
}