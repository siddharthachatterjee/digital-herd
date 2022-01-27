import React, { useContext, useEffect, useState, useRef } from "react";
import MintToken from "./MintToken";
import AnimalImage from "../display/AnimalImage";

import { Web3Context } from "../../../context/Web3Context";
import {IPFSContext} from "../../../context/IPFSContext";
import { allAccessoryArrays, Animal, animals, art, backdrops, ETH, shuffleArray } from "../../../core";

//console.log(allAccessoryArrays(0))

export default function Mint() {
    const {address, connect, contract} = useContext(Web3Context);
    const {ipfs} = useContext(IPFSContext);
    const [tokens, setTokens] = useState<any[]>([]);
    const [checkedAnimal, setCheckedAnimal] = useState<{[K:number]: boolean}>({});
    const [number, setNumber] = useState("1000");
    const [a, setA] = useState<any>(null);
    useEffect(() => {   
        connect();
        (() => {
            for (let i = 0; i < animals.length; i++) {
                for (let j = 0; j < animals[i].faces.length; j++) {
            
                    let src = animals[i].faces[j];
                    animals[i].images[src] = new Image();
                    animals[i].images[src].src = src;
                }
                for (let j = 0; j < animals[i].backdrops.length; j++) {
                    
                
                    let src = animals[i].backdrops[j];
                    animals[i].images[src] = new Image();
                    animals[i].images[src].src = src;
                }
                for (let j = 0; j < animals[i].accessories.length; j++) {
            
                    for  (let k = 0; k < animals[i].accessories[j].length; k++) {
                        let src = animals[i].accessories[j][k];
                        animals[i].images[src] = new Image();
                        animals[i].images[src].src = src;
                    }
                }
            }
        })()
       // console.log(new File(["foo"], "foo.txt", {type: "text/plain"}))
    }, []);

    function onDrawn(canvasRef: any, animal: any, backdrop: string) {
        const buffer = Buffer.from(canvasRef.current.toDataURL().split(",")[1], "base64");
      //  setA(buffer.toJSON());
        (async () => {
            const result = await ipfs.add({path: "/tmp/", content: buffer}, {pin: true}); 
            // if (tokens.length == 0)
            //     console.log(result);
            //  console.log(result);
           const {cid} = result;
            const url = "https://ipfs.io/ipfs/" + cid.toString();
            const chunks:any = [];
            ///console.log(hash);
            const stream = ipfs.cat(cid.toString());
                            //console.log(uri);
    
                            for await (const chunk of stream) {
                                chunks.push(...chunk);
                            }
            //setA("data:image/png;base64," + Buffer.from(chunks).toString("base64"));
        //    console.log(JSON.stringify(chunks) == JSON.stringify(buffer));
            const obj = JSON.stringify({name:`${animal.species},${backdrop}`,artist:"Alyse Gamson", image:url,species:animal.species});
            setTokens(prev => [...new Set([...prev, obj])])
        })();
    }

    function mintAll() {
        let shuffled = tokens;
        shuffleArray(shuffled);
        let len = Math.min(shuffled.length, +number);
        let perTxn = 20;
        for (let i = 0; i < len/perTxn; i++) {
        contract.methods.createCollectibles(shuffled.slice(i * perTxn, Math.min((i + 1) * perTxn, len))).send({from: address})
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
        {tokens.length && a && <img src = {a}  />}
        {a}
        <br/>
        Number: 
        <input type = "number" value = {number} onChange = {e => setNumber(e.target.value)} />
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