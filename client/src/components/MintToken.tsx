import React, {useContext, useEffect, useRef, useState} from "react";
import ipfs from "../context/IPFSContext";
import { Web3Context } from "../context/Web3Context";
import { art, backdrops } from "../core/vars";
import AnimalImage from "./AnimalImage";

export default function MintToken() {
    const {address, connect, web3, networkId, contract} = useContext(Web3Context);

    const canvasRef = useRef<any>(null);
    const animal = art[Math.floor(Math.random() * art.length)] 
    const backdrop = backdrops[Math.floor(Math.random() * backdrops.length)];
    const [image, setImage] = useState("");
    
    function onDrawn() {
        if (canvasRef && canvasRef.current) {
           // console.log(contract);
           if (address) {
                 setImage(canvasRef.current.toDataURL());
               // console.log(canvasRef.current!.toDataURL()!);
            //    ipfs.add(canvasRef.current.toDataURL())
            //     .then(({cid}) => {
            //         contract.methods.tokenCount().call({from: address})
            //             .then((res: number) => {
            //                 const object = `{"name":"#${res}","image":"${cid}","species":"${animal.image}"}`;
            //                 console.log(object)
            //                 contract.methods.createCollectible(object).send({from: address});
            //             })
            //     })
            }
           // contract.methods.createCollectible('{"name":"Rhino #0","image":canvasRef.current.toDataURL(),"species":animal.image}').send({from: address});
        }
    }
    return contract && (
        <>
        <img src = {image} />
        <AnimalImage onDrawn = {onDrawn} canvasRef = {canvasRef} image = {animal.image} background = {backdrop}  />
        </>
    );
}