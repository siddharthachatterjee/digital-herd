import React, { useContext, useEffect, useState, useRef } from "react";
import MintToken from "./MintToken";
import AnimalImage from "../display/AnimalImage";

import { Web3Context } from "../../../context/Web3Context";
import {IPFSContext} from "../../../context/IPFSContext";
import { allAccessoryArrays, Animal, animals, art, backdrops, shuffleArray } from "../../../core";

//console.log(allAccessoryArrays(0))

export default function Mint() {
    const {address, connect, contract} = useContext(Web3Context);
    const {ipfs} = useContext(IPFSContext);
    const [tokens, setTokens] = useState<any[]>([]);
    const [checkedAnimal, setCheckedAnimal] = useState<{[K:number]: boolean}>({});
    const [number, setNumber] = useState(1000);
  //  const [a, setA] = useState<any>(null);
    useEffect(() => {   
        connect();
       // console.log(new File(["foo"], "foo.txt", {type: "text/plain"}))
    }, []);

    function onDrawn(canvasRef: any, animal: any, backdrop: string) {
        const buffer = Buffer.from(canvasRef.current.toDataURL().split(",")[1], "base64");
      //  setA(buffer.toJSON());
        (async () => {
            const obj = JSON.stringify({name:`${animal.species},${backdrop}`,artist: "Alyse Gemson", image:canvasRef.current.toDataURL(),species:animal.species});
            const {cid} = await ipfs.add(obj, {pin: true}); 
            const url = "https://ipfs.io/ipfs/" + cid.toString();
            setTokens(prev => [...new Set([...prev, url])])
        })();
    }

    function mintAll() {
        let shuffled = tokens;
        shuffleArray(shuffled);
        let len = Math.min(shuffled.length, number);
        for (let i = 0; i < len/10; i++) {
        contract.methods.createCollectibles(shuffled.slice(i * 10, Math.min((i + 1) * 10, len))).send({from: address})
        }
    }



    return address  && ipfs && (
        <>
        
        <h1> Mint these tokens: </h1>
        {animals.map((animal: Animal, i: number) => (
            <div key = {i}>
                <input type = "checkbox" onChange = {e => { setCheckedAnimal(prev => ({...prev, [i]: e.target.checked})) }} />
                {animal.species}
            </div>
        ))}
        {animals.map((animal: Animal, i: number) => checkedAnimal[i] && (
            animal.backdrops.map((bd: any, j) =>  {
                let accessories = allAccessoryArrays(i);
                return (
                    animal.faces.map((face, k) => (
                        accessories.map((accessory, l) => (
                            <AnimalImage i = {i} accessories = {accessory} onDrawn = {(cnvsRef: any) => {onDrawn(cnvsRef, animal, bd)}}  image = {face} background = {bd}  />
                        ))
                    ))
                )
            })
                ))} 
        <br />
        
        <h2> Data: </h2>
        {/* {a && <img src = {"data:image/png;base64," + Buffer.from(a).toString("base64")} />} */}
        {tokens.length}
        <br />
        <button onClick = {mintAll}> Mint All </button>
        <button onClick = {() => setTokens([])}> Reset </button>
        </>
    );
}