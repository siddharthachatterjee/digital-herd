import React, {useContext, useEffect, useRef, useState} from "react";
import { IPFSContext } from "../../../context/IPFSContext";
//import ipfs from "../context/IPFSContext";
import { Web3Context } from "../../../context/Web3Context";

import { art, backdrops } from "../../../core";
import AnimalImage from "../display/AnimalImage";

export default function MintToken(props: {animal: any, backdrop: string, i?: number}) {
    const {address, connect, web3, networkId, contract} = useContext(Web3Context);
    const {ipfs} = useContext(IPFSContext);
    const {animal, backdrop} = props;

    const canvasRef = useRef<any>(null);
  //  const animal = art[Math.floor(Math.random() * art.length)] 
    //const backdrop = backdrops[Math.floor(Math.random() * backdrops.length)];
    const [image, setImage] = useState("");
    const [minted, setMinted] = useState(false);
    
    function onDrawn() {
        if (canvasRef && canvasRef.current) {
           // console.log(contract);
          // if (address) {
                setImage(canvasRef.current.toDataURL());
                 //console.log("");
               // console.log(canvasRef.current!.toDataURL()!);
               setMinted(true);
            // ipfs.add(canvasRef.current.toDataURL())
            //     .then(({cid}: {cid:string}) => {
            //         contract.methods.tokenCount().call({from: address})
            //             .then((res: number) => {
            //                 const object = `{"name":"${animal.species},${backdrop}","image":"https://ipfs.io/ipfs/${cid}","species":"${animal.species}"}`;
            //                 console.log(object)
            //                 contract.methods.createCollectible(object).send({from: address});
            //             })
            //     })
           
        }
    }
    return contract && ipfs && (
        <>
        <div style = {{display: "normal"/**"block" */}}>
            {/* <img src = {image} /> */}
            {/*{<AnimalImage onDrawn = {onDrawn} canvasRef = {canvasRef} image = {animal.image} background = {backdrop}  />}  */}
        </div>
        </>
    );
}